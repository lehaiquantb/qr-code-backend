import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';

import { EntityManager } from 'typeorm';
import { Role } from '../entity/role.entity';

const roleAttributes: (keyof Role)[] = ['id', 'code'];
@Injectable()
export class RoleService {
    constructor(
        @InjectEntityManager()
        private readonly dbManager: EntityManager,
    ) {}
}
