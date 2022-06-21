import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';

import { EntityManager } from 'typeorm';
import { RoleEntity } from '../entity/role.entity';

const roleAttributes: (keyof RoleEntity)[] = ['id'];
@Injectable()
export class RoleService {
    constructor(
        @InjectEntityManager()
        private readonly dbManager: EntityManager,
    ) {}
}
