import { IMeta } from '~common';
import {
    ApiResponse,
    CommonListResponse,
} from 'src/common/helpers/api.response';
import { UserEntity } from '~user/entity/user.entity';

import { UserResponseDto } from './user-response.dto';

export class UserList extends CommonListResponse<UserResponseDto> {
    constructor(entities?: UserEntity[], meta?: IMeta) {
        super();
        this.meta = meta;
        this.items = entities?.map((e) => new UserResponseDto(e)) ?? [];
    }
}

export class UserListResult extends ApiResponse<UserList> {}

export class UserDetailResult extends ApiResponse<UserResponseDto> {}

export class UserRemoveResponseDto {
    id: number;
}

export class RemoveUserResult extends ApiResponse<UserRemoveResponseDto> {}
