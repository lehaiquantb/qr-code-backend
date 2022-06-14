import { BaseEntity } from 'src/common/entites/BaseEntity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'role' })
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255, nullable: false })
    code: string;
}
