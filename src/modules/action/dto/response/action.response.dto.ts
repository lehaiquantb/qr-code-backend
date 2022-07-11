import { CommonListResponse, OmitProperty, ResponseDto } from '~common';
import { ActionEntity } from '~action/entity/action.entity';

export class ActionResponseDto extends ResponseDto {
    id: number;

    @OmitProperty()
    private action?: ActionEntity;

    constructor(action?: ActionEntity) {
        super();
        this.action = action;
        this.id = action?.id;
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
