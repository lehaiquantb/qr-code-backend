import { CommonListResponse, ResponseDto } from '~common';
import { ActionEntity } from '~action/entity/action.entity';

export class ActionResponseDto extends ResponseDto {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    isFavorite: boolean;
    rate: number;
    comment: string;
    userId: number;
    productId: number;

    constructor(action?: ActionEntity) {
        super();
        this.id = action?.id;
        this.rate = action?.rate;
        this.comment = action?.comment;
        this.isFavorite = action?.isFavorite;
        this.createdAt = action?.createdAt;
        this.updatedAt = action?.updatedAt;
        this.userId = action?.userId;
        this.productId = action?.productId;
    }
}

export class ActionListResponseDto extends CommonListResponse<ActionResponseDto> {
    constructor(actionEntities?: ActionEntity[]) {
        super();
        this.items =
            actionEntities?.map((action) => new ActionResponseDto(action)) ??
            [];
    }
}
