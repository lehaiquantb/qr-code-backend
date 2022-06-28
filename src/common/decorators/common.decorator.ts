import { METADATA_KEY } from '~common';
import {
    PERMISSION_ACTION,
    PERMISSION_RESOURCE,
} from './../../modules/role/role.interface';
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

export type Permission = `${PERMISSION_ACTION}_${PERMISSION_RESOURCE}`;
export type AuthOptions = { isPublic?: boolean };
export function Auth(
    permissions?: Permission[],
    options?: AuthOptions,
): MethodDecorator {
    return applyDecorators(
        SetMetadata(METADATA_KEY.PERMISSIONS, permissions),
        SetMetadata(METADATA_KEY.AUTH_OPTIONS, options),
        UseGuards(JwtGuard, AuthorizationGuard),
        ApiBearerAuth(),
        UseInterceptors(),
        ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    );
}

export function AuthUser() {
    return createParamDecorator((_data: unknown, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();

        const user = request.loginUser;

        if (user?.[Symbol.for('isPublic')]) {
            return;
        }

        return user;
    })();
}
