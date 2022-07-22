import { factoryExcute } from '~database/factories';

import { faker } from '@faker-js/faker';
import { ProviderEntity } from '~provider/entity/provider.entity';
import { FactoryDefine } from '.';
import { FileEntity } from '~file/entity/file.entity';
import { UserEntity } from '~user/entity/user.entity';
import { ProviderStatus } from '~provider/provider.constant';

const providerFactory: FactoryDefine<ProviderEntity> = async (params) => {
    const provider = new ProviderEntity();
    provider.name = faker.company.companyName();
    provider.description = faker.company.catchPhraseDescriptor();
    provider.address = faker.address.cityName();
    provider.licenseImage =
        params?.licenseImage ?? (await factoryExcute(FileEntity));
    provider.owner = params?.owner ?? (await factoryExcute(UserEntity));
    provider.status = ProviderStatus.ACCEPT;
    return provider;
};

export default providerFactory;
