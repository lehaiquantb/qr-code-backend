import { CommonListResponse, ResponseDto } from '~common';
import { FileEntity } from '~file/entity/file.entity';

export class FileResponseDto extends ResponseDto {
    id: number;
    fileName: string;
    url: string;
    size: number;
    mimeType: string;

    constructor(file?: FileEntity) {
        super();
        this.id = file?.id;
        this.fileName = file?.fileName;
        this.url = file?.url;
        this.size = file?.size;
        this.mimeType = file?.mimeType;
    }
}

export class FileListResponseDto extends CommonListResponse<FileResponseDto> {
    constructor(fileEntities?: FileEntity[]) {
        super();
        this.items =
            fileEntities?.map((file) => new FileResponseDto(file)) ?? [];
    }
}
