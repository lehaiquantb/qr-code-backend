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
    InternalServerErrorException,
    Query,
    ParseIntPipe,
    Request,
} from '@nestjs/common';

import { UserService } from './services/user.service';
import { CreateUserDto } from './dto/requests/create-user.dto';
import {
    UpdateUserDto,
    UpdateUserSchema,
} from './dto/requests/update-user.dto';
import { UserList } from './dto/response/api-response.dto';
import { DatabaseService } from '../../common/modules/database/database.service';
import {
    UserListQueryStringDto,
    UserListQueryStringSchema,
} from './dto/requests/list-user.dto';
import { JoiValidationPipe } from '../../common/pipes/joi.validation.pipe';

import {
    ErrorResponse,
    SuccessResponse,
} from '../../common/helpers/api.response';
import { RemoveEmptyQueryPipe } from 'src/common/pipes/removeEmptyQueryPipe';
import { HttpStatus } from '~common';
import { RoleEntity } from '../role/entity/role.entity';
import { BaseController } from '~common';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
export class UserController extends BaseController {
    constructor(
        private readonly usersService: UserService,
        private readonly databaseService: DatabaseService,
        private readonly userRepository: UserRepository,
    ) {
        super();
    }

    @Get('/test')
    // @Auth([`${PERMISSION_ACTION.CREATE}_${PERMISSION_RESOURCE.USER}`])
    async test() {
        const u = await this.userRepository
            .builder('user')
            .filterByEmail('Pierce_Paucek@hotmail.com')
            .getOne();
        return u;
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
            const userExist = await this.userRepository.isExist({
                email: data.email,
            });
            if (userExist) {
                return new ErrorResponse(
                    HttpStatus.BAD_REQUEST,
                    'user.common.error.email.exist',
                );
            }
            let newUser: UserResponseDto;
            const res = await this.userRepository.insert({
                birthday: data.birthday,
            });

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

            await this.usersService.deleteUser(id, req?.authUser?.id);

            const message = this.i18n.translate('user.delete.success');

            return new SuccessResponse({ id }, message);
        } catch (error) {
            throw new InternalServerErrorException(error);
        }
    }
}
