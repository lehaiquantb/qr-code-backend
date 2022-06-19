import { AuthorizationGuard } from 'src/common/guards/authorization.guard';
import { JwtGuard } from 'src/common/guards/jwt.guard';
import {
    applyDecorators,
    SetMetadata,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

export function Auth(roles?: string[]): MethodDecorator {
    return applyDecorators(
        SetMetadata('roles', roles),
        UseGuards(JwtGuard, AuthorizationGuard),
        ApiBearerAuth(),
        UseInterceptors(),
        ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    );
}
