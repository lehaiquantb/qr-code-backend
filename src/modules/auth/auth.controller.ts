import { IRequest } from '~common';
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
import { LoginDto, LoginSchema } from './dto/requests/login.dto';

import { AuthService, usersAttributes } from './services/auth.service';
import { JwtGuard } from '../../common/guards/jwt.guard';
import { I18nRequestScopeService } from 'nestjs-i18n';
import { UserStatus } from '../user/user.constant';

import { JoiValidationPipe } from '../../common/pipes/joi.validation.pipe';
import { updateProfileSchema } from './dto/requests/update-profile.dto';
import { UpdateProfileDto } from './dto/requests/update-profile.dto';
import { DatabaseService } from '../../common/services/database.service';
import { extractToken } from '../../common/helpers/common.function';
import {
    ErrorResponse,
    SuccessResponse,
} from '../../common/helpers/api.response';
import {
    AuthorizationGuard,
    Permissions,
} from 'src/common/guards/authorization.guard';
import { ACTIONS, RESOURCES } from 'src/common/permissionConstants';
import { HttpStatus } from '~common';
@Controller({
    path: 'auth',
})
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly i18n: I18nRequestScopeService,
        private readonly databaseService: DatabaseService,
    ) {}

    @Post('login')
    @UsePipes(new JoiValidationPipe(LoginSchema))
    async login(@Body() data: LoginDto) {
        try {
            const user = await this.authService.findUserByEmail(data.email, [
                ...usersAttributes,
                'password',
            ]);
            // check if user exists?
            if (!user) {
                const message = await this.i18n.translate(
                    'auth.errors.user.notFound',
                );
                return new ErrorResponse(HttpStatus.BAD_REQUEST, message, []);
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
                    const message = await this.i18n.translate(
                        'auth.errors.user.invalidPwd',
                    );
                    return new ErrorResponse(
                        HttpStatus.BAD_REQUEST,
                        message,
                        [],
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
    @Permissions([`${RESOURCES.USER}_${ACTIONS.LOGIN}`])
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
    @UseGuards(JwtGuard, AuthorizationGuard)
    async profile(@Request() req: IRequest) {
        try {
            const profile = await this.authService.profile(req.loginUser?.id);
            if (!profile) {
                const message = await this.i18n.translate(
                    'auth.errors.user.notFound',
                );
                return new ErrorResponse(HttpStatus.BAD_REQUEST, message, []);
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
            const profile = await this.authService.profile(req.loginUser?.id);
            if (!profile) {
                const message = await this.i18n.translate(
                    'auth.errors.user.notFound',
                );
                return new ErrorResponse(HttpStatus.BAD_REQUEST, message, []);
            }
            const result = await this.authService.updateProfile(
                body,
                req.loginUser?.id,
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
