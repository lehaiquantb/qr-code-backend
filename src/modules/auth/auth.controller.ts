import { UserRepository } from './../user/user.repository';
import { Auth, AuthUser, BaseController, IAuthUser, IRequest } from '~common';
import {
    Body,
    Controller,
    Get,
    InternalServerErrorException,
    Post,
    Req,
    Request,
    UseGuards,
    UsePipes,
    Patch,
} from '@nestjs/common';
import { LoginDto } from './dto/requests/login.dto';

import { AuthService } from './services/auth.service';
import { JwtGuard } from '../../common/guards/jwt.guard';
import { UserStatus } from '../user/user.constant';

import { JoiValidationPipe } from '../../common/pipes/joi.validation.pipe';
import { updateProfileSchema } from './dto/requests/update-profile.dto';
import { UpdateProfileDto } from './dto/requests/update-profile.dto';
import { extractToken } from '../../common/helpers/common.function';
import {
    ErrorResponse,
    SuccessResponse,
} from '../../common/helpers/api.response';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { HttpStatus } from '~common';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('auth')
@Controller({
    path: 'auth',
})
export class AuthController extends BaseController {
    constructor(
        private readonly authService: AuthService,
        private readonly userRepository: UserRepository,
    ) {
        super();
    }

    @Post('login')
    async login(@Body() data: LoginDto) {
        try {
            const user = await this.userRepository.getUserWithAuthInfoByEmail(
                data.email,
            );
            // check if user exists?

            if (!user) {
                return new ErrorResponse(
                    HttpStatus.BAD_REQUEST,
                    'auth.errors.user.notFound',
                );
            }
            // check if user is active?
            if (user.status !== UserStatus.ACTIVE) {
                const message = await this.i18n.translate(
                    'auth.errors.user.inActive',
                );
                return new ErrorResponse(HttpStatus.BAD_REQUEST, message, []);
            }
            // check password is correct?
            if (user.password) {
                const isCorrectPassword = await user.validatePassword(
                    data.password,
                );
                if (!isCorrectPassword) {
                    return new ErrorResponse(
                        HttpStatus.BAD_REQUEST,
                        'auth.errors.user.invalidPwd',
                    );
                }
            }

            // every thing ok, return success data
            const {
                user: profile,
                accessToken,
                refreshToken,
            } = await this.authService.login(user);
            return new SuccessResponse({ profile, accessToken, refreshToken });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Post('refresh-token')
    @UseGuards(JwtGuard, AuthorizationGuard)
    async refreshToken(@Req() req) {
        try {
            const loginUser = req.loginUser;
            const isHashTokenExist = this.authService.checkHashToken(
                extractToken(req.headers.authorization),
            );
            if (!isHashTokenExist) {
                const message = await this.i18n.translate(
                    'auth.errors.auth.hashToken.notExist',
                );
                return new ErrorResponse(HttpStatus.BAD_REQUEST, message, []);
            }
            const {
                user: profile,
                accessToken,
                refreshToken,
            } = await this.authService.refreshToken(loginUser);

            return new SuccessResponse({ profile, accessToken, refreshToken });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Get('profile')
    @Auth(['read_user'])
    async profile(@Request() req: IRequest, @AuthUser() user: IAuthUser) {
        try {
            const profile = await this.authService.profile(req.authUser?.id);
            if (!profile) {
                return new ErrorResponse(
                    HttpStatus.BAD_REQUEST,
                    'auth.errors.user.notFound',
                );
            }
            return new SuccessResponse(profile);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Patch('profile')
    @UsePipes(new JoiValidationPipe(updateProfileSchema))
    @UseGuards(JwtGuard, AuthorizationGuard)
    async updateProfile(
        @Request() req: IRequest,
        @Body() body: UpdateProfileDto,
    ) {
        try {
            const profile = await this.authService.profile(req.authUser?.id);
            if (!profile) {
                const message = await this.i18n.translate(
                    'auth.errors.user.notFound',
                );
                return new ErrorResponse(HttpStatus.BAD_REQUEST, message, []);
            }
            const result = await this.authService.updateProfile(
                body,
                req.authUser?.id,
            );
            return new SuccessResponse(
                result as unknown as Record<string, unknown>,
            );
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Post('logout')
    @UseGuards(JwtGuard)
    async logout(@Request() req) {
        try {
            const result = await this.authService.logout(req.loginUser);
            return new SuccessResponse(result);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
