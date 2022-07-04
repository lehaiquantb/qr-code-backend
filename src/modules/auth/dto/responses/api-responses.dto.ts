import { ApiResponse } from '../../../../common/helpers/api.response';

import { UserEntity } from '../../../user/entity/user.entity';

export interface ITokenInfo {
    token: string;
    expiresIn: number;
}
export class UserWithToken {
    profile: UserEntity;
    accessToken: ITokenInfo;
    refreshToken: ITokenInfo;
}
export class UserLoginResult extends ApiResponse<UserWithToken> {}

export class GoogleLoginLinkResult extends ApiResponse<
    Record<string, unknown>
> {
    link: string;
    redirectUri: string;
}

export class UpdateProfileResult extends ApiResponse<Record<string, unknown>> {}

export class UserProfileResult extends ApiResponse<UserEntity> {}

export class UserLogoutResult extends ApiResponse<boolean> {}

export class RefreshTokenResult extends ApiResponse<UserWithToken> {}
