import { CommonListResponse, OmitProperty, ResponseDto } from '~common';
import { CategoryEntity } from '~category/entity/category.entity';

export class CategoryResponseDto extends ResponseDto {
    id: number;

    @OmitProperty()
    private category?: CategoryEntity;

    constructor(category?: CategoryEntity) {
        super();
        this.category = category;
        this.id = category?.id;
    }
}

export class CategoryListResponseDto extends CommonListResponse<CategoryResponseDto> {
    items: CategoryResponseDto[];

    constructor(categoryEntities?: CategoryEntity[]) {
        super();
        this.items =
            categoryEntities?.map(
                (category) => new CategoryResponseDto(category),
            ) ?? [];
    }
}
