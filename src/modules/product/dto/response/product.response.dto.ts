import { CommonListResponse, OmitProperty, ResponseDto } from '~common';
import { ProductEntity } from '~product/entity/product.entity';

export class ProductResponseDto extends ResponseDto {
    id: number;

    @OmitProperty()
    private product?: ProductEntity;

    constructor(product?: ProductEntity) {
        super();
        this.product = product;
        this.id = product?.id;
    }
}

export class ProductListResponseDto extends CommonListResponse<ProductResponseDto> {
    items: ProductResponseDto[];

    constructor(productEntities?: ProductEntity[]) {
        super();
        this.items =
            productEntities?.map(
                (product) => new ProductResponseDto(product),
            ) ?? [];
    }
}
