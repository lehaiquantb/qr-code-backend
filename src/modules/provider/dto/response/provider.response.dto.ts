import { CommonListResponse, ResponseDto } from '~common';
import { ProviderEntity } from '~provider/entity/provider.entity';
import { ProviderStatus } from '~provider/provider.constant';
import { UserResponseDto } from '~user/dto/response/user-response.dto';

export class ProviderResponseDto extends ResponseDto {
    id: number;
    name: string;
    description: string;
    address: string;
    licenseImageUrl: string;
    status: ProviderStatus;
    owner: UserResponseDto;

    constructor(provider?: ProviderEntity) {
        super();
        this.id = provider?.id;
        this.name = provider?.name;
        this.description = provider?.description;
        this.address = provider?.address;
        this.licenseImageUrl = provider?.licenseImage?.url;
        this.status = provider?.status;
        this.owner = new UserResponseDto(provider?.owner);
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
