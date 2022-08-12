import { RegisteredUserDto } from './dto/requests/registered.dto';
import { UserRepository } from './../user/user.repository';
import {
    Auth,
    AuthUser,
    BaseController,
    genPassword,
    IAuthUser,
    IRequest,
} from '~common';
import {
    Body,
    Controller,
    Get,
    InternalServerErrorException,
    Post,
    Req,
    Request,
    UseGuards,
    Patch,
} from '@nestjs/common';
import { LoginDto } from './dto/requests/login.dto';

import { AuthService } from './services/auth.service';
import { JwtGuard } from '../../common/guards/jwt.guard';
import { UserStatus } from '../user/user.constant';

import { UpdateProfileDto } from './dto/requests/update-profile.dto';
import { extractToken } from '../../common/helpers/common.function';
import {
    ErrorResponse,
    SuccessResponse,
} from '../../common/helpers/api.response';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { HttpStatus } from '~common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '~user/services/user.service';
import { UserResponseDto } from '~user/dto/response/user-response.dto';
@ApiTags('auth')
@Controller({
    path: 'auth',
})
export class AuthController extends BaseController {
    constructor(
        private readonly authService: AuthService,
        private readonly userRepository: UserRepository,
        readonly userService: UserService,
    ) {
        super();
    }

    @Post('register')
    async register(@Body() data: RegisteredUserDto) {
        try {
            const user = await this.userService.repository.isExist({
                email: data.email,
            });
            // check if user exists?
            if (user) {
                return new ErrorResponse(
                    HttpStatus.ITEM_ALREADY_EXIST,
                    'auth.errors.user.emailIsExist',
                );
            }

            const newUser = await this.userService.repository.insertAndGet({
                email: data.email,
                fullName: data.fullName,
                password: genPassword(data.password),
                phoneNumber: data.phoneNumber,
                birthday: data.birthday,
                gender: data.gender,
                status: UserStatus.ACTIVE,
            });

            return new SuccessResponse(new UserResponseDto(newUser));
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
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
                    HttpStatus.ITEM_NOT_FOUND,
                    'auth.errors.user.notFound',
                );
            }
            // check if user is active?
            if (user.status !== UserStatus.ACTIVE) {
                return new ErrorResponse(
                    HttpStatus.BAD_REQUEST,
                    'auth.errors.user.inActive',
                    [],
                );
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
            } else {
                return new ErrorResponse(
                    HttpStatus.BAD_REQUEST,
                    'auth.errors.user.invalidPwd',
                );
            }

            // every thing ok, return success data
            const {
                user: profile,
                accessToken,
                refreshToken,
            } = await this.authService.login(user);

            delete profile?.password;
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
    @Auth()
    async profile(@Request() req: IRequest, @AuthUser() user?: IAuthUser) {
        try {
            const profile =
                await this.userRepository.getUserWithAuthInfoByEmail(
                    user?.email,
                );
            if (!profile) {
                return new ErrorResponse(
                    HttpStatus.ITEM_NOT_FOUND,
                    'auth.errors.user.notFound',
                );
            }

            delete profile?.password;

            return new SuccessResponse(profile);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Patch('profile')
    @Auth()
    async updateProfile(
        @Request() req: IRequest,
        @Body() body: UpdateProfileDto,
        @AuthUser() authUser: IAuthUser,
    ) {
        try {
            const profile = await this.authService.profile(authUser?.id);
            if (!profile) {
                return new ErrorResponse(
                    HttpStatus.ITEM_NOT_FOUND,
                    'auth.errors.user.notFound',
                    [],
                );
            }
            const result = await this.authService.updateProfile(
                body,
                authUser?.id,
            );

            if (result.affected > 0) {
                const profile =
                    await this.userRepository.getUserWithAuthInfoByEmail(
                        authUser?.email,
                    );
                delete profile?.password;

                return new SuccessResponse(profile);
            } else {
                return new ErrorResponse(
                    HttpStatus.BAD_REQUEST,
                    'auth.errors.auth.updateProfileFail',
                    [],
                );
            }
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Post('logout')
    @Auth()
    async logout(@Request() req, @AuthUser() authUser: IAuthUser) {
        try {
            const result = await this.authService.logout(authUser?.id);
            return new SuccessResponse(result);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
