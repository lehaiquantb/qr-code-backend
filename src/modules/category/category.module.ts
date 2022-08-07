import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from '~category/services/category.service';
import { CategoryController } from '~category/category.controller';
import { CategoryRepository } from '~category/category.repository';

@Module({
    imports: [TypeOrmModule.forFeature([CategoryRepository])],
    controllers: [CategoryController],
    providers: [CategoryService],
    exports: [CategoryService],
})
export class CategoryModule {}
