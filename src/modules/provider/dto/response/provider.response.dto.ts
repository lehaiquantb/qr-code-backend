import { CommonListResponse, OmitProperty, ResponseDto } from '~common';
import { ProviderEntity } from '~provider/entity/provider.entity';

export class ProviderResponseDto extends ResponseDto {
    id: number;

    @OmitProperty()
    private provider?: ProviderEntity;

    constructor(provider?: ProviderEntity) {
        super();
        this.provider = provider;
        this.id = provider?.id;
    }
}

export class ProviderListResponseDto extends CommonListResponse<ProviderResponseDto> {
    constructor(providerEntities?: ProviderEntity[]) {
        super();
        this.items =
            providerEntities?.map(
                (provider) => new ProviderResponseDto(provider),
            ) ?? [];
    }
}
