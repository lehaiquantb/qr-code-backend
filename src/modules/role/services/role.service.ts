import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import {
    DEFAULT_LIMIT_FOR_PAGINATION,
    DEFAULT_ORDER_BY,
    DEFAULT_ORDER_DIRECTION,
} from 'src/common/constants';
import { User } from 'src/modules/user/entity/user.entity';
import { Brackets, EntityManager, Like, Not } from 'typeorm';
import { CreateRoleDto } from '../dto/requests/create-role.dto';
import { RoleListQueryStringDto } from '../dto/requests/list-role.dto';
import { UpdateRoleDto } from '../dto/requests/update-role.dto';
import { RoleList } from '../dto/responses/api-response.dto';
import { PermissionResponseDto } from '../dto/responses/permission-response.dto';
import { RoleResponseDto } from '../dto/responses/role-response.dto';
import { Role } from '../entity/role.entity';
import { PermissionDefault } from '../role.constants';

const roleAttributes: (keyof Role)[] = ['id', 'code'];
@Injectable()
export class RoleService {
    constructor(
        @InjectEntityManager()
        private readonly dbManager: EntityManager,
    ) {}
}
