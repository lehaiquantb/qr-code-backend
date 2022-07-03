
import { faker } from '@faker-js/faker';
import { FileEntity } from '~file/entity/file.entity';
import { FactoryDefine } from '.';

const fileFactory: FactoryDefine<FileEntity> = async (params) => {
    const file = new FileEntity();
    file.fileName = faker.system.fileName();
    file.url = faker.image.imageUrl();
    file.size = faker.datatype.number();
    file.mimeType = faker.system.mimeType();
    return file;
};

export default fileFactory;
