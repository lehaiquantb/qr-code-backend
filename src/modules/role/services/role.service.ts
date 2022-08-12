import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';

import { EntityManager } from 'typeorm';
import { BaseService } from '~common';
import { RoleRepository } from '~role/role.repository';
import { RoleEntity } from '../entity/role.entity';

const roleAttributes: (keyof RoleEntity)[] = ['id'];
@Injectable()
export class RoleService extends BaseService<RoleEntity, RoleRepository> {
    constructor(
        @InjectEntityManager()
        private readonly dbManager: EntityManager,
        private readonly repo: RoleRepository,
    ) {
        super(repo);
    }
}
