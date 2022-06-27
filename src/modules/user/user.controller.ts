import { UserRepository } from './user.repository';
import { UserResponseDto } from './dto/response/user-response.dto';
import { IRequest } from '~common';
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
    Request,
    UnauthorizedException,
} from '@nestjs/common';

import { UserService } from './services/user.service';
import { CreateUserDto } from './dto/requests/create-user.dto';
import {
    UpdateUserDto,
    UpdateUserSchema,
} from './dto/requests/update-user.dto';
import { JwtGuard } from '../../common/guards/jwt.guard';
import { UserList } from './dto/response/api-response.dto';
import { DatabaseService } from '../../common/services/database.service';
import { UserEntity } from './entity/user.entity';
import {
    UserListQueryStringDto,
    UserListQueryStringSchema,
} from './dto/requests/list-user.dto';
import { JoiValidationPipe } from '../../common/pipes/joi.validation.pipe';

import { UserRole } from './user.constant';
import {
    ErrorResponse,
    SuccessResponse,
} from '../../common/helpers/api.response';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { RemoveEmptyQueryPipe } from 'src/common/pipes/removeEmptyQueryPipe';
import { HttpStatus } from '~common';
import { RoleEntity } from '../role/entity/role.entity';
import { BaseController } from '~common';

@Controller('user')
@UseGuards(JwtGuard, AuthorizationGuard)
export class UserController extends BaseController {
    constructor(
        private readonly usersService: UserService,
        private readonly databaseService: DatabaseService,
        private readonly userRepository: UserRepository,
    ) {
        super();
    }

    @Get('/test')
    async test() {
        const user = await UserEntity.queryBuilder();
        return new SuccessResponse(user);
    }

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
    async create(@Request() req: IRequest, @Body() data: CreateUserDto) {
        try {
            const promises = [
                this.databaseService.checkItemExist(
                    UserEntity,
                    'email',
                    data.email,
                ),
                this.databaseService.checkItemExist(
                    RoleEntity,
                    'id',
                    data.roleId,
                ),
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
                const role = await RoleEntity.findOne(data.roleId);
                if (req.loginUser.role.code == UserRole.ADMIN) {
                    newUser = await this.usersService.createUser(data);
                } else if (
                    req.loginUser.role.code == UserRole.TENANT
                    // &&
                    // role.code == UserRole.USER
                ) {
                    newUser = await this.usersService.createUser(data);
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
                this.databaseService.checkItemExist(
                    RoleEntity,
                    'id',
                    data.roleId,
                ),
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

            await this.usersService.deleteUser(id, req?.loginUser?.id);

            const message = this.i18n.translate('user.delete.success');

            return new SuccessResponse({ id }, message);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
