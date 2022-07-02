import { CommonListResponse, OmitProperty, ResponseDto } from '~common';
import { RateEntity } from '~rate/entity/rate.entity';

export class RateResponseDto extends ResponseDto {
    id: number;

    @OmitProperty()
    private rate?: RateEntity;

    constructor(rate?: RateEntity) {
        super();
        this.rate = rate;
        this.id = rate?.id;
    }
}

export class RateListResponseDto extends CommonListResponse<RateResponseDto> {
    items: RateResponseDto[];

    constructor(rateEntities?: RateEntity[]) {
        super();
        this.items =
            rateEntities?.map((rate) => new RateResponseDto(rate)) ?? [];
    }
}
