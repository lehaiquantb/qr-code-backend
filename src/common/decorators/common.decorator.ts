/*eslint-disable @typescript-eslint/ban-types*/
import { METADATA_KEY, IRequest } from '~common';
import { PERMISSION_ACTION, PERMISSION_RESOURCE } from '~common';
import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import {
    applyDecorators,
    createParamDecorator,
    ExecutionContext,
    SetMetadata,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

export type PermissionType =
    | `${PERMISSION_ACTION}_${PERMISSION_RESOURCE}`
    | String;
export type AuthOptions = { isPublic?: boolean };
export function Auth(
    permissions?: PermissionType[],
    options?: AuthOptions,
): MethodDecorator {
    return applyDecorators(
        SetMetadata(METADATA_KEY.PERMISSIONS, permissions ?? []),
        SetMetadata(METADATA_KEY.AUTH_OPTIONS, options ?? {}),
        UseGuards(JwtGuard, AuthorizationGuard),
        ApiBearerAuth(),
        UseInterceptors(),
        ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    );
}

export const AuthUser = createParamDecorator(
    (_data: unknown, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest() as IRequest;

        const user = request?.authUser;

        return user;
    },
);

export function OmitProperty(): PropertyDecorator {
    return (target: Object, propertyKey: string | symbol) => {
        const existMetaData =
            Reflect.getMetadata(METADATA_KEY.OMIT_PROPERTY, target) ?? [];
        existMetaData.push(propertyKey);
        Reflect.defineMetadata(
            METADATA_KEY.OMIT_PROPERTY,
            existMetaData,
            target,
        );
    };
}
