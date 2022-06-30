import { DatabaseService } from 'src/common/modules/database/database.service';
import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './services/role.service';

@Module({
    controllers: [RoleController],
    providers: [RoleService, DatabaseService],
    exports: [RoleService],
})
export class RoleModule {}
