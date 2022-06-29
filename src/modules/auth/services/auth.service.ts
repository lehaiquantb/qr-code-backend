import { JwtPayload } from 'jsonwebtoken';
import { UserRepository } from './../../user/user.repository';
import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { generateHashToken } from '../../../common/helpers/common.function';
import { UpdateProfileDto } from '../dto/requests/update-profile.dto';
import { DatabaseService } from 'src/common/services/database.service';
import ConfigKey from '../../../../src/common/config/config-key';
import { UserEntity } from 'src/modules/user/entity/user.entity';
import { UserTokenEntity } from '../entity/user-token.entity';
import { BaseService } from '~base/service.base';
import { LoginUser } from '~common';
import { usersAttributes } from '~auth/auth.constant';
import { userDetailAttributes } from '~user/user.constant';

@Injectable()
export class AuthService extends BaseService {
    constructor(
        @InjectEntityManager()
        private readonly dbManager: EntityManager,
        private readonly jwtService: JwtService,
        private readonly databaseService: DatabaseService,
        private readonly userRepository: UserRepository,
    ) {
        super();
    }
    /**
     *
     * @param user
     * @return accessToken & accessTokenExpiredIn
     */
    private generateAccessToken(user: UserEntity) {
        const accessTokenExpiredIn = this.configService.get(
            ConfigKey.TOKEN_EXPIRED_IN,
        );
        const secretAccessTokenKey = this.configService.get(
            ConfigKey.JWT_SECRET_ACCESS_TOKEN_KEY,
        );
        const accessTokenOptions = {
            secret: secretAccessTokenKey,
            expiresIn: accessTokenExpiredIn,
        } as JwtSignOptions;

        const payloadAccessToken = {
            id: user.id,
            email: user.email,
            resourceWithPermissions: user.resourceWithPermissions,
            roles: user.roles,
            expiresIn: accessTokenExpiredIn,
        } as LoginUser & JwtPayload;

        const accessToken = this.jwtService.sign(
            payloadAccessToken,
            accessTokenOptions,
        );
        return {
            token: accessToken,
            expiresIn: accessTokenExpiredIn,
        };
    }
    /**
     *
     * @param user
     * @param hashToken
     * @return refreshToken && refreshTokenExpiredIn
     */
    private generateRefreshToken(user: UserEntity, hashToken: string) {
        const refreshTokenExpiredIn = this.configService.get(
            ConfigKey.REFRESH_TOKEN_EXPIRED_IN,
        );
        const secretRefreshTokenKey = this.configService.get(
            ConfigKey.JWT_SECRET_REFRESH_TOKEN_KEY,
        );
        const accessTokenOptions = {
            secret: secretRefreshTokenKey,
            expiresIn: refreshTokenExpiredIn,
        };

        const payloadRefreshToken = {
            id: user.id,
            email: user.email,
            resourceWithPermissions: user.resourceWithPermissions,
            roles: user.roles,
            expiresIn: refreshTokenExpiredIn,
            hashToken,
        };
        const refreshToken = this.jwtService.sign(
            payloadRefreshToken,
            accessTokenOptions,
        );
        return {
            token: refreshToken,
            expiresIn: refreshTokenExpiredIn,
        };
    }

    /**
     *
     * @param user User
     * @returns {user, accessToken, refreshToken}
     */

    public async login(user: UserEntity) {
        try {
            const accessToken = this.generateAccessToken(user);
            const hashToken = generateHashToken(user.id);
            const refreshToken = this.generateRefreshToken(user, hashToken);
            await this.dbManager.transaction(async (transactionManager) => {
                // add refresh token to user_tokens table.
                await transactionManager.save(UserTokenEntity, {
                    user,
                    token: refreshToken.token,
                    hashToken,
                });
            });

            return {
                user,
                accessToken,
                refreshToken,
            };
        } catch (error) {
            throw error;
        }
    }

    public async findById(id: number) {
        try {
            const user = await this.dbManager.findOne(UserEntity, {
                select: userDetailAttributes,
                where: { id },
            });
            return user;
        } catch (error) {
            throw error;
        }
    }

    public async findUserByEmail(email: string, attributes = usersAttributes) {
        try {
            const user = await this.dbManager.findOne(UserEntity, {
                select: attributes,
                where: { email },
            });
            return user;
        } catch (error) {
            throw error;
        }
    }

    public async profile(id: number) {
        return this.findById(id);
    }

    public async updateProfile(body: UpdateProfileDto, id: number) {
        try {
            const result = await this.dbManager.update(UserEntity, id, body);
            return result;
        } catch (error) {
            throw error;
        }
    }

    public async findTokensById(id: number) {
        return this.dbManager.find(UserTokenEntity, {
            select: ['token'],
            where: {
                userId: id,
            },
        });
    }

    public async logout(user: UserEntity): Promise<boolean> {
        try {
            // delete old refresh token
            await this.dbManager.delete(UserTokenEntity, { user });
            return true;
        } catch (error) {
            throw error;
        }
    }

    public async refreshToken(user: UserEntity) {
        try {
            const accessToken = this.generateAccessToken(user);
            const hashToken = generateHashToken(user.id);
            const refreshToken = this.generateRefreshToken(user, hashToken);
            await this.dbManager.transaction(async (transactionManager) => {
                // delete old refresh token
                await this.dbManager.delete(UserTokenEntity, { user });
                // add refresh token to user_tokens table.
                await transactionManager.save(UserTokenEntity, {
                    user,
                    token: refreshToken.token,
                    hashToken,
                });
            });
            return {
                user,
                accessToken,
                refreshToken,
            };
        } catch (error) {
            throw error;
        }
    }

    public async checkHashToken(token: string) {
        try {
            const data = await this.jwtService.verify(token, {
                secret: this.configService.get(
                    ConfigKey.JWT_SECRET_REFRESH_TOKEN_KEY,
                ),
            });
            const res = await this.databaseService.checkItemExist(
                UserTokenEntity,
                'hashToken',
                data.hashToken,
            );
            return res;
        } catch (error) {
            throw error;
        }
    }
}
