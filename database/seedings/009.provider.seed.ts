import { ProviderEntity } from '~provider/entity/provider.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';
import * as dotenv from 'dotenv';
import { factoryExcute, ParamsExtend } from '~database/factories';
import { TABLE_NAME } from '~database/constant';
import { FileEntity } from '~file/entity/file.entity';
import { ProviderStatus } from '~provider/provider.constant';

dotenv.config();

export let providerList: ParamsExtend<ProviderEntity>[] = [
    {
        id: 5,
        name: 'Admin Provider',
        address: 'Việt Nam',
        description: 'Cung cấp sản phẩm bởi admin hệ thống',
        licenseImage: () => factoryExcute(FileEntity),
        ownerId: 1,
        status: ProviderStatus.ACCEPT,
    },
    {
        id: 1,
        name: 'Nông sản Phú Cường',
        address: 'Phố Minh Khai ,HBT, Hà Nội',
        description: 'Cung cấp nông sản cho khu vực HBT, Hà Nội',
        licenseImage: () => factoryExcute(FileEntity),
        ownerId: 2,
        status: ProviderStatus.ACCEPT,
    },
    {
        id: 2,
        name: 'BetaBooks',
        address: 'Ba Đình, Hà Nội',
        description: 'Nhà xuất bản sách lập trình',
        licenseImage: () => factoryExcute(FileEntity),
        ownerId: 2,
        status: ProviderStatus.ACCEPT,
    },
    {
        id: 3,
        name: 'Công ty Cổ phần Dầu thực vật Tường An',
        address: 'Số 2, Phường 15, quận Tân Bình, TP Hồ Chí Minh, Việt Nam',
        description: 'Công ty chuyên phân phối dầu thực vật khu vực phía nam',
        licenseImage: () => factoryExcute(FileEntity),
        ownerId: 2,
        status: ProviderStatus.ACCEPT,
    },
    {
        id: 4,
        name: 'PepsiCo VietName',
        address: 'Hà Nội, Việt Name',
        description: 'Công ty Cổ phần nước đóng chai Pepsi tại Việt Nam',
        licenseImage: () => factoryExcute(FileEntity),
        ownerId: 2,
        status: ProviderStatus.ACCEPT,
    },
];

export class Provider_1720963593422 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const promises = providerList.map(async (item) =>
            factoryExcute(ProviderEntity, {
                ...item,
            }),
        );

        await Promise.all(promises);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.manager.getRepository(TABLE_NAME.PROVIDER).clear();
    }
}
