import { Controller, UseGuards } from '@nestjs/common';
import { I18nRequestScopeService } from 'nestjs-i18n';
import { JwtGuard } from 'src/common/guards/jwt.guard';

import { DatabaseService } from '../../common/services/database.service';

import { RoleService } from './services/role.service';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';

@Controller('role')
@UseGuards(JwtGuard, AuthorizationGuard)
export class RoleController {
    constructor(
        private readonly roleService: RoleService,
        private readonly i18n: I18nRequestScopeService,
        private readonly databaseService: DatabaseService,
    ) {}
}
