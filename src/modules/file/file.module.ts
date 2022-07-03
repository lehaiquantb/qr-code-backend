import { Module } from '@nestjs/common';
import { DatabaseService } from '~common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileService } from '~file/services/file.service';
import { FileController } from '~file/file.controller';
import { FileRepository } from '~file/file.repository';

@Module({
    imports: [TypeOrmModule.forFeature([FileRepository])],
    controllers: [FileController],
    providers: [FileService, DatabaseService],
    exports: [FileService],
})
export class FileModule {}
