import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from '~product/services/product.service';
import { ProductController } from '~product/product.controller';
import { ProductRepository } from '~product/product.repository';
import { ProviderModule } from '~provider/provider.module';
import { CategoryModule } from '~category/category.module';
import { FileModule } from '~file/file.module';
import { ActionModule } from '~action/action.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([ProductRepository]),
        ProviderModule,
        CategoryModule,
        FileModule,
        ActionModule,
    ],
    controllers: [ProductController],
    providers: [ProductService],
    exports: [ProductService],
})
export class ProductModule {}
