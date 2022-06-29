import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface LoginUser {
    email: string;
    id: number;
    resourceWithPermissions: Record<string, string[]>;
    roles: Record<string, any>[];
    expiresIn: number;
}

export type IAuthUser = LoginUser & JwtPayload;

export interface IRequest extends Request {
    authUser: IAuthUser;
}
