import {
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    Request,
    UseGuards,
} from '@nestjs/common';
import { I18nRequestScopeService } from 'nestjs-i18n';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import {
    ErrorResponse,
    SuccessResponse,
} from '../../common/helpers/api.response';
import { JoiValidationPipe } from '../../common/pipes/joi.validation.pipe';
import { DatabaseService } from '../../common/services/database.service';
import {
    CreateRoleDto,
    CreateRoleSchema,
} from './dto/requests/create-role.dto';
import {
    RoleListQueryStringDto,
    RoleListQueryStringSchema,
} from './dto/requests/list-role.dto';
import {
    UpdateRoleDto,
    UpdateRoleSchema,
} from './dto/requests/update-role.dto';
import { PermissionList, RoleList } from './dto/responses/api-response.dto';
import { RoleResponseDto } from './dto/responses/role-response.dto';
import { RoleService } from './services/role.service';
import { Role } from './entity/role.entity';
import {
    AuthorizationGuard,
    Permissions,
} from 'src/common/guards/authorization.guard';
import { ACTIONS, RESOURCES } from 'src/common/permissionConstants';
import { HttpStatus } from '../common/common.constant';

@Controller('role')
@UseGuards(JwtGuard, AuthorizationGuard)
export class RoleController {
    constructor(
        private readonly roleService: RoleService,
        private readonly i18n: I18nRequestScopeService,
        private readonly databaseService: DatabaseService,
    ) {}
}
