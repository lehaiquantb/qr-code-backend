// import { PermissionDefault } from './role.constants';
// import * as Joi from 'joi';
// import { INPUT_TEXT_MAX_LENGTH } from '../../common/constants';
// import { IPermission } from './role.interface';

// const permissionObjectRules = (permissions: IPermission[]) => {
//     return permissions.reduce((permissionRule, permissionItem) => {
//         const { module, permission } = permissionItem;
//         const permissionObj = Object.keys(permission);
//         const subRule = permissionObj.reduce(
//             (permissionSubRule, permissionKey) => {
//                 Object.assign(permissionSubRule, {
//                     [permissionKey]: Joi.bool()
//                         .required()
//                         .label(`role.permission.${permissionKey}`),
//                 });
//                 return permissionSubRule;
//             },
//             {},
//         );
//         const data = {
//             [module]: Joi.object().keys(subRule).optional(),
//         };
//         Object.assign(permissionRule, data);
//         return permissionRule;
//     }, {});
// };

// export const roleFields = {
//     name: Joi.string()
//         .max(INPUT_TEXT_MAX_LENGTH)
//         .required()
//         .label('role.fields.name'),
//     permission: Joi.object()
//         .keys({
//             ...permissionObjectRules(PermissionDefault),
//         })
//         .required()
//         .label('role.fields.permission'),
// };
