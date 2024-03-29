import { CommonListResponse, ResponseDto } from '~common';
import { FileResponseDto } from '~file/dto/response/file.response.dto';
import { ProviderEntity } from '~provider/entity/provider.entity';
import { ProviderStatus } from '~provider/provider.constant';
import { UserResponseDto } from '~user/dto/response/user-response.dto';

export class ProviderResponseDto extends ResponseDto {
    id: number;
    name: string;
    description: string;
    address: string;
    licenseImageUrl: string;
    licenseImage: FileResponseDto;
    status: ProviderStatus;
    owner: UserResponseDto;
    updatedAt: Date;
    createdAt: Date;

    constructor(provider?: ProviderEntity) {
        super();
        this.updatedAt = provider?.updatedAt;
        this.createdAt = provider?.createdAt;
        this.id = provider?.id;
        this.name = provider?.name;
        this.description = provider?.description;
        this.address = provider?.address;
        this.licenseImageUrl = provider?.licenseImage?.url;
        this.licenseImage = provider?.licenseImage;
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
