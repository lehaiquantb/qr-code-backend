import { Module } from '@nestjs/common';
import { DatabaseService } from '~common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RateService } from '~rate/services/rate.service';
import { RateController } from '~rate/rate.controller';
import { RateRepository } from '~rate/rate.repository';

@Module({
    imports: [TypeOrmModule.forFeature([RateRepository])],
    controllers: [RateController],
    providers: [RateService, DatabaseService],
    exports: [RateService],
})
export class RateModule {}
