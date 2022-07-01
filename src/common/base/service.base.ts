import { IAuthUser, ContextProvider, Optional } from '~common';
import { CommonService } from './../modules/services/common.service';
import { I18nService } from 'nestjs-i18n';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EntityId } from 'typeorm/repository/EntityId';
import { DeleteResult } from 'typeorm';
import { BaseEntity } from '../entites/BaseEntity';
import { BaseRepository } from './repository.base';
export interface IBaseService<T> {
    index(): Promise<T[]>;

    findById(id: EntityId): Promise<T>;

    findByIds(id: [EntityId]): Promise<T[]>;

    store(data: any): Promise<T>;

    update(id: EntityId, data: any): Promise<T>;

    delete(id: EntityId): Promise<DeleteResult>;
}

@Injectable()
export class BaseService<T extends BaseEntity, R extends BaseRepository<T>>
    implements IBaseService<T>
{
    constructor(repository: R) {
        this.repository = repository;
    }
    // @Inject()
    // moduleRef: ModuleRef;

    @Inject()
    readonly i18n: I18nService;

    @Inject()
    readonly configService: ConfigService;

    @Inject()
    commonService: CommonService;

    // @Inject(REQUEST)
    // req: IRequest;

    protected readonly repository: R;

    get authUser(): Optional<IAuthUser> {
        return ContextProvider.getAuthUser();
    }

    // async onModuleInit() {
    //     // this.commonService = this.moduleRef.resolve(CommonService);
    //     const contextId = ContextIdFactory.create();
    //     const rr = { asd: 'da' };
    //     this.moduleRef.registerRequestByContextId(rr, contextId);
    //     this.commonService = await this.moduleRef.resolve(
    //         CommonService,
    //         contextId,
    //     );
    // }

    index(): Promise<T[]> {
        return this.repository.find();
    }

    findById(id: EntityId): Promise<T> {
        return this.repository.findOne(id);
    }

    findByIds(ids: [EntityId]): Promise<T[]> {
        return this.repository.findByIds(ids);
    }

    store(data: any): Promise<T> {
        return this.repository.save({ ...data });
    }

    async update(id: EntityId, data: any): Promise<T> {
        await this.repository.update(id, data);
        return this.findById(id);
    }

    delete(id: EntityId): Promise<DeleteResult> {
        return this.repository.delete(id);
    }
}
