import { CommonListResponse, OmitProperty, ResponseDto } from '~common';
import { FileEntity } from '~file/entity/file.entity';

export class FileResponseDto extends ResponseDto {
    id: number;

    @OmitProperty()
    private file?: FileEntity;

    constructor(file?: FileEntity) {
        super();
        this.file = file;
        this.id = file?.id;
    }
}

export class FileListResponseDto extends CommonListResponse<FileResponseDto> {
    constructor(fileEntities?: FileEntity[]) {
        super();
        this.items =
            fileEntities?.map((file) => new FileResponseDto(file)) ?? [];
    }
}
