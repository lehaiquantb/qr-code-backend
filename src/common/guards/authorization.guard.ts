import { IRequest } from './../base/base.interface';
import { UserRole } from './../../modules/user/user.constant';
import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { intersection } from 'lodash';

export const Permissions = (permissions: string[]) =>
    SetMetadata('permissions', permissions);

export const Role = (role: UserRole) => SetMetadata('role', role);

@Injectable()
export class AuthorizationGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        // const permissions = this.reflector.get<string[]>(
        //     'permissions',
        //     context.getHandler(),
        // );
        // if (!permissions) {
        //     return true;
        // }
        // const request = context.switchToHttp().getRequest();
        // const user = request.loginUser;

        // const userPermissions = [];
        // // return array of string resource_action
        // // ex: ['user_login', 'user_create',...]
        // Object.keys(user?.role?.permission || {}).forEach((key: string) => {
        //     const value = user?.role?.permission?.[key];
        //     Object.keys(value).forEach((keyValue: string) => {
        //         if (value[keyValue]) userPermissions.push(`${key}_${keyValue}`);
        //     });
        // });
        // // check if the loginUser has any one permission in the needed permissions
        // if (!!intersection(userPermissions, permissions).length) return true;
        // throw new ForbiddenException();
        const role = this.reflector.get<UserRole>('role', context.getHandler());
        if (!role) {
            return true;
        }
        const request = context.switchToHttp().getRequest() as IRequest;
        const currentRole = request.loginUser.role.code;
        if (currentRole === UserRole.ADMIN) {
            return true;
        } else if (
            (currentRole === UserRole.USER && role === UserRole.TENANT) ||
            (currentRole === UserRole.TENANT && role === UserRole.ADMIN)
        ) {
            throw new ForbiddenException();
        } else return true;
    }
}
