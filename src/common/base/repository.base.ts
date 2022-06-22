/* eslint-disable @typescript-eslint/no-empty-interface */
import { Repository as TypeormRepository } from 'typeorm';
import { BaseEntity } from '../entites/BaseEntity';

interface IRepository<T extends BaseEntity> {
    // findOne(id: number): Promise<T>;
}

export class BaseRepository<T extends BaseEntity>
    extends TypeormRepository<T>
    implements IRepository<T> {}
