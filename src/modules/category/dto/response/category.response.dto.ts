import { CommonListResponse, ResponseDto } from '~common';
import { CategoryEntity } from '~category/entity/category.entity';

export class CategoryResponseDto extends ResponseDto {
    id: number;

    name: string;

    description: string;

    constructor(category?: CategoryEntity) {
        super();
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
