import { ProviderResponseDto } from '~provider/dto/response/provider.response.dto';
import { ActionResponseDto } from '~action/dto/response/action.response.dto';
import { CategoryResponseDto } from '~category/dto/response/category.response.dto';
import { CommonListResponse, IMeta, ResponseDto } from '~common';
import { ProductEntity } from '~product/entity/product.entity';

export class ProductResponseDto extends ResponseDto {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    qrCode: string;
    name: string;
    price: number;
    description: string;
    verified: boolean;
    urlImage: string;
    category: CategoryResponseDto;
    averageRate: number;
    actions: ActionResponseDto[];
    currentActionOfUser: ActionResponseDto;
    provider: ProviderResponseDto;
    constructor(product?: ProductEntity) {
        super();
        this.id = product?.id;
        this.createdAt = product?.createdAt;
        this.updatedAt = product?.updatedAt;
        this.qrCode = product?.qrCode;
        this.name = product?.name;
        this.price = product?.price;
        this.description = product?.description;
        this.verified = product?.verified;
        this.urlImage = product?.image?.url ?? '';
        this.averageRate = product?.averageRate;
        this.category = new CategoryResponseDto(product?.category);
        this.provider = new ProviderResponseDto(product?.provider);
        this.actions =
            product?.actions?.map((a) => new ActionResponseDto(a)) ?? [];
    }
}

export class ProductListResponseDto extends CommonListResponse<ProductResponseDto> {
    constructor(productEntities?: ProductEntity[], meta?: IMeta) {
        super();
        this.meta = meta;
        this.items =
            productEntities?.map(
                (product) => new ProductResponseDto(product),
            ) ?? [];
    }
}
