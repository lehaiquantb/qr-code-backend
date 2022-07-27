import { BaseService } from '~common';
import {
    Inject,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Request } from 'express';
import * as bcrypt from 'bcrypt';
import { EntityManager, In, Like, Brackets } from 'typeorm';

import { UserEntity } from 'src/modules/user/entity/user.entity';
import { CreateUserDto } from '../dto/requests/create-user.dto';
import { UserStatus } from '../user.constant';
import { UserListQueryStringDto } from '../dto/requests/list-user.dto';
import { UserList } from '../dto/response/api-response.dto';
import { UserResponseDto } from '../dto/response/user-response.dto';
import { UpdateUserDto } from '../dto/requests/update-user.dto';
import { UserStatusDto } from '../dto/requests/common-user.dto';
import { UserRepository } from '~user/user.repository';

const userDetailAttributes: (keyof UserEntity)[] = [
    'id',
    'email',
    'fullName',
    'phoneNumber',
    'birthday',
    'gender',
    'status',
    'createdAt',
    'createdBy',
    'updatedAt',
    'updatedBy',
];
@Injectable()
export class UserService extends BaseService<UserEntity, UserRepository> {
    constructor(
        @Inject(REQUEST) private readonly request: Request,
        @InjectEntityManager()
        private readonly dbManager: EntityManager,
        private readonly userRepository: UserRepository,
    ) {
        super(userRepository);
    }

    generateQueryBuilder(queryBuilder, { keyword, genders, statuses }) {
        if (keyword) {
            const likeKeyword = `%${keyword}%`;
            queryBuilder.andWhere(
                new Brackets((qb) => {
                    qb.where([
                        {
                            fullName: Like(likeKeyword),
                        },
                        {
                            email: Like(likeKeyword),
                        },
                    ]);
                }),
            );
        }

        if (statuses && statuses.length > 0) {
            queryBuilder.andWhere({
                status: In(statuses),
            });
        }
        if (genders && genders.length > 0) {
            queryBuilder.andWhere({
                gender: In(genders),
            });
        }
    }

    async getUsers(query: UserListQueryStringDto): Promise<UserList> {
        try {
            const qb = this.repository
                .builder('user')
                .search(['fullName', 'email'], query.keyword)
                .orderByColumn(query.orderBy, query.orderDirection)
                .whereIn('gender', query.genders)
                .whereIn('status', query.statuses)
                .pagination(query.page, query.limit);

            const [items, totalItems] = await qb.getManyAndCount();

            return new UserList(items, {
                total: totalItems,
                limit: query.limit,
            });
        } catch (error) {
            throw error;
        }
    }

    async getUserById(id: number): Promise<UserEntity | undefined> {
        try {
            const user = await this.findById(id);
            return user;
        } catch (error) {
            throw error;
        }
    }

    async createUser(user: CreateUserDto): Promise<UserResponseDto> {
        try {
            const newUser = {
                ...user,
                status: UserStatus.ACTIVE,
                email: user.email.toLocaleLowerCase(),
            };
            if (user?.password) {
                newUser.password = bcrypt.hashSync(
                    newUser.password,
                    bcrypt.genSaltSync(10),
                );
            }
            const insertedUser = await this.dbManager
                .getRepository(UserEntity)
                .insert(newUser);
            const userId = insertedUser?.identifiers[0]?.id;
            if (userId) {
                const userDetail = await this.getUserById(userId);
                return userDetail;
            }
            throw new InternalServerErrorException();
        } catch (error) {
            throw error;
        }
    }

    async updateUser(
        id: number,
        user: UpdateUserDto,
    ): Promise<UserResponseDto> {
        try {
            const currentUser = {
                ...user,
            };

            await this.dbManager.update(UserEntity, id, currentUser);

            const savedUser = await this.getUserById(id);

            return savedUser;
        } catch (error) {
            throw error;
        }
    }

    async deleteUser(id: number, deletedBy: number): Promise<void> {
        try {
            const timeNow = new Date();
            await Promise.all([
                this.dbManager.update(
                    UserEntity,
                    { id },
                    {
                        deletedAt: timeNow,
                        deletedBy,
                    },
                ),
            ]);
        } catch (error) {
            throw error;
        }
    }

    async updateUserStatus(
        id: number,
        data: UserStatusDto,
    ): Promise<UserResponseDto> {
        try {
            await this.dbManager.update(UserEntity, id, {
                status: data.status,
            });

            const savedUser = await this.getUserById(id);

            return savedUser;
        } catch (error) {
            throw error;
        }
    }
}
