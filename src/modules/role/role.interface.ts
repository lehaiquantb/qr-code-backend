// import { ModuleName } from './role.constants';

// export interface IBasicPermission {
//     read: boolean;
//     create: boolean;
//     update: boolean;
//     delete: boolean;
// }

// export interface IUserPermission extends IBasicPermission {
//     login: boolean;
// }

// export type IContractPermission = IBasicPermission;

// export type ITeamPermission = IBasicPermission;

// export type IBillingPermission = IBasicPermission;

// export type IAssetPermission = IBasicPermission;

// export type IRequestAssetPermission = IBasicPermission;

// export interface IRecruitmentPermission extends IBasicPermission {
//     hrRole: boolean;
// }

// export type IEventPermission = IBasicPermission;

// export interface ITimeKeepingPermission extends IBasicPermission {
//     readAll: boolean;
// }

// export type IRolePermission = IBasicPermission;

// export interface IRequestAbsencePermission extends IBasicPermission {
//     updateStatus: boolean;
// }

// export interface IPermissionPermission {
//     read: boolean;
// }

// export interface IPermission {
//     module: ModuleName;
//     permission:
//         | IRolePermission
//         | ITimeKeepingPermission
//         | IUserPermission
//         | IContractPermission
//         | IBillingPermission
//         | IAssetPermission
//         | IRecruitmentPermission
//         | IEventPermission
//         | IPermissionPermission
//         | ITeamPermission
//         | IRequestAbsencePermission;
// }

// export interface IPermisson {
//     [ModuleName.USER]: IUserPermission;
//     [ModuleName.ASSET]: IAssetPermission;
//     [ModuleName.BILLING]: IBillingPermission;
//     [ModuleName.CONTRACT]: IContractPermission;
//     [ModuleName.EVENT]: IEventPermission;
//     [ModuleName.RECRUITMENT]: IRecruitmentPermission;
//     [ModuleName.REQUEST_ASSET]: IRequestAssetPermission;
//     [ModuleName.ROLE]: IRolePermission;
//     [ModuleName.TIME_KEEPING]: ITimeKeepingPermission;
//     [ModuleName.PERMISSION]: IPermissionPermission;
//     [ModuleName.REQUEST_ABSENCE]: IRequestAbsencePermission;
//     [ModuleName.TEAM]: ITeamPermission;
// }

export enum PERMISSION_RESOURCE {
    USER = 'user',
    PRODUCT = 'product',
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
