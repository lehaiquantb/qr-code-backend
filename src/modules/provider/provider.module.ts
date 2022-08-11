import { UserRepository } from '~user/user.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProviderService } from '~provider/services/provider.service';
import { ProviderController } from '~provider/provider.controller';
import { ProviderRepository } from '~provider/provider.repository';
import { FileRepository } from '~file/file.repository';
import { FileModule } from '~file/file.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            ProviderRepository,
            UserRepository,
            FileRepository,
        ]),
        FileModule,
    ],
    controllers: [ProviderController],
    providers: [ProviderService],
    exports: [ProviderService],
})
export class ProviderModule {}
