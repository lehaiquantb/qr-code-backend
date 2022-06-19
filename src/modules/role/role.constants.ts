// import {
//     IAssetPermission,
//     IBillingPermission,
//     IContractPermission,
//     IEventPermission,
//     IPermission,
//     IPermissionPermission,
//     IRecruitmentPermission,
//     IRequestAbsencePermission,
//     IRequestAssetPermission,
//     IRolePermission,
//     ITeamPermission,
//     ITimeKeepingPermission,
//     IUserPermission,
// } from './role.interface';

// export enum ModuleName {
//     USER = 'user',
//     CONTRACT = 'contract',
//     TIME_KEEPING = 'timeKeeping',
//     ASSET = 'asset',
//     EVENT = 'event',
//     RECRUITMENT = 'recruitment',
//     BILLING = 'billing',
//     ROLE = 'role',
//     REQUEST_ASSET = 'requestAsset',
//     REQUEST_ABSENCE = 'requestAbsence',
//     PERMISSION = 'permission',
//     TEAM = 'team',
//     CONTRACT_TYPE = 'contractType',
// }

// const BasicPermission = {
//     read: false,
//     create: false,
//     update: false,
//     delete: false,
// };

// export const UserPermission: IUserPermission = {
//     ...BasicPermission,
//     login: false,
// };
// export const ContractPermission: IContractPermission = { ...BasicPermission };
// export const TeamPermission: ITeamPermission = { ...BasicPermission };
// export const BillingPermission: IBillingPermission = { ...BasicPermission };
// export const EventPermission: IEventPermission = { ...BasicPermission };
// export const RolePermission: IRolePermission = { ...BasicPermission };
// export const TimeKeepingPermission: ITimeKeepingPermission = {
//     ...BasicPermission,
//     readAll: false,
// };
// export const AssetPermission: IAssetPermission = { ...BasicPermission };
// export const RecruitmentPermission: IRecruitmentPermission = {
//     ...BasicPermission,
//     hrRole: false,
// };
// export const RequestAssetPermission: IRequestAssetPermission = {
//     ...BasicPermission,
// };
// export const RequestAbsencePermission: IRequestAbsencePermission = {
//     ...BasicPermission,
//     updateStatus: false,
// };

// export const PermissionPermission: IPermissionPermission = {
//     read: false,
// };

// export const PermissionDefault: IPermission[] = [
//     {
//         module: ModuleName.USER,
//         permission: UserPermission,
//     },
//     {
//         module: ModuleName.CONTRACT,
//         permission: ContractPermission,
//     },
//     {
//         module: ModuleName.TIME_KEEPING,
//         permission: TimeKeepingPermission,
//     },
//     {
//         module: ModuleName.ASSET,
//         permission: AssetPermission,
//     },
//     {
//         module: ModuleName.EVENT,
//         permission: EventPermission,
//     },
//     {
//         module: ModuleName.RECRUITMENT,
//         permission: RecruitmentPermission,
//     },
//     {
//         module: ModuleName.BILLING,
//         permission: BillingPermission,
//     },
//     {
//         module: ModuleName.ROLE,
//         permission: RolePermission,
//     },
//     {
//         module: ModuleName.REQUEST_ASSET,
//         permission: RequestAssetPermission,
//     },
//     {
//         module: ModuleName.REQUEST_ABSENCE,
//         permission: RequestAbsencePermission,
//     },
//     {
//         module: ModuleName.PERMISSION,
//         permission: PermissionPermission,
//     },
//     {
//         module: ModuleName.TEAM,
//         permission: TeamPermission,
//     },
// ];

// export const permissionExample = {
//     user: {
//         ...BasicPermission,
//         login: false,
//     },
//     contract: {
//         ...BasicPermission,
//     },
//     timeKeeping: {
//         ...BasicPermission,
//         readAll: false,
//     },
//     asset: {
//         ...BasicPermission,
//     },
//     event: {
//         ...BasicPermission,
//     },
//     team: {
//         ...BasicPermission,
//     },
//     recruitment: {
//         ...BasicPermission,
//         hrRole: false,
//     },
//     billing: {
//         ...BasicPermission,
//     },
//     role: {
//         ...BasicPermission,
//     },
//     requestAsset: {
//         ...BasicPermission,
//     },
//     requestAbsence: {
//         ...BasicPermission,
//         updateStatus: false,
//     },
//     permission: {
//         read: false,
//     },
// };
