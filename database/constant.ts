import { TableColumnOptions } from 'typeorm';

export enum TABLE_NAME {
    USER = 'user',
    ROLE = 'role',
    USER_TOKEN = 'user_token',
    USER_ROLE = 'user_role',
    ROLE_PERMISSION = 'role_permission',
    PERMISSION = 'permission',
    PERMISSION_ACTION = 'permission_action',
    PERMISSION_RESOURCE = 'permission_resource',
}

export const createColumns = function (
    columns?: TableColumnOptions[],
): TableColumnOptions[] {
    return [
        {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
        },
        ...columns,
        {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
        },
        {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
        },
        {
            name: 'deletedAt',
            type: 'timestamp',
            isNullable: true,
        },
        {
            name: 'createdBy',
            type: 'int',
            isNullable: true,
        },
        {
            name: 'updatedBy',
            type: 'int',
            isNullable: true,
        },
        {
            name: 'deletedBy',
            type: 'int',
            isNullable: true,
        },
    ];
};

// export const createForeignKey = () => {

// }
