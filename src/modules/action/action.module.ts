import { Module } from '@nestjs/common';
import { DatabaseService } from '~common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionService } from '~action/services/action.service';
import { ActionController } from '~action/action.controller';
import { ActionRepository } from '~action/action.repository';

@Module({
    imports: [TypeOrmModule.forFeature([ActionRepository])],
    controllers: [ActionController],
    providers: [ActionService, DatabaseService],
    exports: [ActionService],
})
export class ActionModule {}
