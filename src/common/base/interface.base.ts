import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export type ResourceWithActions = Record<string, string[]>;

export interface LoginUser {
    email: string;
    id: number;
    resourceWithActions: ResourceWithActions;
    roles: Record<string, any>[];
    expiresIn: number;
}

export type IAuthUser = LoginUser & Pick<JwtPayload, 'expiresIn'>;

export interface IRequest extends Request {
    authUser: IAuthUser;
}
