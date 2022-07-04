import { CommonListResponse, OmitProperty, ResponseDto } from '~common';
import { CategoryEntity } from '~category/entity/category.entity';

export class CategoryResponseDto extends ResponseDto {
    id: number;

    name: string;

    description: string;

    @OmitProperty()
    private category?: CategoryEntity;

    constructor(category?: CategoryEntity) {
        super();
        this.category = category;
        this.id = category?.id;
        this.name = category?.name;
        this.description = category?.description;
    }
}

export class CategoryListResponseDto extends CommonListResponse<CategoryResponseDto> {
    constructor(categoryEntities?: CategoryEntity[]) {
        super();
        this.items =
            categoryEntities?.map(
                (category) => new CategoryResponseDto(category),
            ) ?? [];
    }
}
