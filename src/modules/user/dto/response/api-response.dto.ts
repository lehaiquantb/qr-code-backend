import {
    ApiResponse,
    CommonListResponse,
} from 'src/common/helpers/api.response';

import { UserResponseDto } from './user-response.dto';

export class UserList extends CommonListResponse<UserResponseDto> {
    items: UserResponseDto[];
}


export class UserListResult extends ApiResponse<UserList> {
    data: UserList;
}

export class UserDetailResult extends ApiResponse<UserResponseDto> {
    data: UserResponseDto;
}

export class UserRemoveResponseDto {
    id: number;
}

export class RemoveUserResult extends ApiResponse<UserRemoveResponseDto> {
    data: UserRemoveResponseDto;
}
