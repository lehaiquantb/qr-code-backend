import { Module } from '@nestjs/common';
import { DatabaseService } from '~common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProviderService } from '~provider/services/provider.service';
import { ProviderController } from '~provider/provider.controller';
import { ProviderRepository } from '~provider/provider.repository';

@Module({
    imports: [TypeOrmModule.forFeature([ProviderRepository])],
    controllers: [ProviderController],
    providers: [ProviderService, DatabaseService],
    exports: [ProviderService],
})
export class ProviderModule {}
