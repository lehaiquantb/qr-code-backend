export enum PERMISSION_RESOURCE {
    FILE = 'file',
    CATEGORY = 'category',
    USER = 'user',
    PRODUCT = 'product',
    ACTION = 'action',
}

export enum PERMISSION_ACTION {
    READ = 'read',
    CREATE = 'create',
    UPDATE = 'update',
    DELETE = 'delete',
    LOGIN = 'login',
    READ_ALL = 'readAll',
    MANAGE_ALL = 'manageAll',
    UPDATE_STATUS = 'updateStatus',
}

export enum ROLE_TYPE {
    ADMIN = 'admin',
    MEMBER = 'member',
}
