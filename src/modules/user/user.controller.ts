import { UserResponseDto } from './dto/response/user-response.dto';
import { IRequest } from './../../common/base/base.interface';
import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    InternalServerErrorException,
    Query,
    ParseIntPipe,
    UseInterceptors,
    UploadedFile,
    Request,
    UnauthorizedException,
} from '@nestjs/common';
import { I18nRequestScopeService } from 'nestjs-i18n';

import { UserService } from './services/user.service';
import {
    CreateUserDto,
    CreateUserSchema,
} from './dto/requests/create-user.dto';
import {
    UpdateUserDto,
    UpdateUserSchema,
} from './dto/requests/update-user.dto';
import { JwtGuard } from '../../common/guards/jwt.guard';
import { DEFAULT_LIMIT_FOR_PAGINATION } from '../../common/constants';
import { UserList } from './dto/response/api-response.dto';
import { DatabaseService } from '../../common/services/database.service';
import { User } from './entity/user.entity';
import {
    UserListQueryStringDto,
    UserListQueryStringSchema,
} from './dto/requests/list-user.dto';
import { JoiValidationPipe } from '../../common/pipes/joi.validation.pipe';
import {
    UserStatusDto,
    UserStatusSchema,
} from './dto/requests/common-user.dto';
import { AllowUpdateStatus, excel, UserRole } from './user.constant';
import {
    ErrorResponse,
    SuccessResponse,
} from '../../common/helpers/api.response';
import { FileInterceptor } from '@nestjs/platform-express';
import {
    AuthorizationGuard,
    Permissions,
} from 'src/common/guards/authorization.guard';
import { ACTIONS, RESOURCES } from 'src/common/permissionConstants';
import { RemoveEmptyQueryPipe } from 'src/common/pipes/removeEmptyQueryPipe';
import { HttpStatus } from '../common/common.constant';
import { Role } from '../role/entity/role.entity';

@Controller('user')
@UseGuards(JwtGuard, AuthorizationGuard)
export class UserController {
    constructor(
        private readonly usersService: UserService,
        private readonly i18n: I18nRequestScopeService,
        private readonly databaseService: DatabaseService,
    ) {}

    @Get(':id')
    async getUser(@Param('id', ParseIntPipe) id: number) {
        try {
            const user = await this.usersService.getUserById(id);
            if (!user) {
                const message = await this.i18n.translate(
                    'user.common.error.user.notFound',
                );
                return new ErrorResponse(
                    HttpStatus.ITEM_NOT_FOUND,
                    message,
                    [],
                );
            }
            return new SuccessResponse(user);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Get()
    async getUsers(
        @Query(
            new JoiValidationPipe(UserListQueryStringSchema),
            new RemoveEmptyQueryPipe(),
        )
        query: UserListQueryStringDto,
    ) {
        try {
            const data: UserList = await this.usersService.getUsers(query);
            return new SuccessResponse(data);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Post()
    async create(
        @Request() req: IRequest,
        @Body(new JoiValidationPipe(CreateUserSchema)) data: CreateUserDto,
    ) {
        try {
            const promises = [
                this.databaseService.checkItemExist(User, 'email', data.email),
                this.databaseService.checkItemExist(Role, 'id', data.roleId),
            ];

            const [userExist, roleExist] = await Promise.all(promises);

            if (userExist) {
                const message = await this.i18n.translate(
                    'user.common.error.email.exist',
                );
                return new ErrorResponse(HttpStatus.BAD_REQUEST, message, [
                    {
                        key: 'email',
                        errorCode: HttpStatus.ITEM_ALREADY_EXIST,
                        message: message,
                    },
                ]);
            }
            let newUser: UserResponseDto;
            if (!roleExist) {
                const message = await this.i18n.translate(
                    'role.common.error.role.notFound',
                );
                return new ErrorResponse(HttpStatus.BAD_REQUEST, message, [
                    {
                        key: 'roleId',
                        errorCode: HttpStatus.ITEM_NOT_FOUND,
                        message: message,
                    },
                ]);
            } else {
                const role = await Role.findOne(data.roleId);
                if (req.loginUser.role.code == UserRole.ADMIN) {
                    newUser = await this.usersService.createUser(data, 0);
                } else if (
                    req.loginUser.role.code == UserRole.TENANT &&
                    role.code == UserRole.USER
                ) {
                    newUser = await this.usersService.createUser(
                        data,
                        req.loginUser.id,
                    );
                } else {
                    throw new UnauthorizedException();
                }
            }

            return new SuccessResponse(newUser);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Patch(':id')
    async updateUser(
        @Request() req,
        @Param('id') id: number,
        @Body(new JoiValidationPipe(UpdateUserSchema)) data: UpdateUserDto,
    ) {
        try {
            const currentUser = await this.usersService.getUserById(id);

            if (!currentUser) {
                const message = await this.i18n.translate(
                    'user.common.error.user.notFound',
                );
                return new ErrorResponse(
                    HttpStatus.ITEM_NOT_FOUND,
                    message,
                    [],
                );
            }
            const promises = [
                this.databaseService.checkItemExist(Role, 'id', data.roleId),
            ];
            const [role] = await Promise.all(promises);

            if (!role) {
                const message = await this.i18n.translate(
                    'role.common.error.role.notFound',
                );
                return new ErrorResponse(HttpStatus.BAD_REQUEST, message, [
                    {
                        key: 'roleId',
                        errorCode: HttpStatus.ITEM_NOT_FOUND,
                        message: message,
                    },
                ]);
            }

            const savedUser = await this.usersService.updateUser(id, data);

            return new SuccessResponse(savedUser);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }

    @Delete(':id')
    async delete(
        @Request() req: IRequest,
        @Param('id', ParseIntPipe) id: number,
    ) {
        try {
            const user = await this.usersService.getUserById(id);
            if (!user) {
                const message = await this.i18n.translate(
                    'user.common.error.user.notFound',
                );
                return new ErrorResponse(
                    HttpStatus.ITEM_NOT_FOUND,
                    message,
                    [],
                );
            }

            const [message] = await Promise.all([
                this.i18n.translate('user.delete.success'),
                this.usersService.deleteUser(id, req?.loginUser?.id),
            ]);

            return new SuccessResponse({ id }, message);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
