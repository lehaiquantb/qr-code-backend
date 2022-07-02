import { Module } from '@nestjs/common';
import { DatabaseService } from '~common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from '~product/services/product.service';
import { ProductController } from '~product/product.controller';
import { ProductRepository } from '~product/product.repository';

@Module({
    imports: [TypeOrmModule.forFeature([ProductRepository])],
    controllers: [ProductController],
    providers: [ProductService, DatabaseService],
    exports: [ProductService],
})
export class ProductModule {}
