import {
    ApiResponse,
    CommonListResponse,
} from 'src/common/helpers/api.response';
import { PermissionResponseDto } from './permission-response.dto';
import { RoleResponseDto } from './role-response.dto';

export class PermissionList extends CommonListResponse<PermissionResponseDto> {}

export class PermissionListResult extends ApiResponse<PermissionList> {}

export class RoleList extends CommonListResponse<RoleResponseDto> {}

export class RoleListResult extends ApiResponse<RoleList> {}

export class RoleResult extends ApiResponse<RoleResponseDto> {}

export class RoleRemoveResponseDto {
    id: number;
}

export class RemoveRoleResult extends ApiResponse<RoleRemoveResponseDto> {}
