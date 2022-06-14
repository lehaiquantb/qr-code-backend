import { UserRole } from './../../modules/user/user.constant';
import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface LoginUser {
    email: string;
    id: number;
    role: {
        id: number;
        code: UserRole;
    };
    expiresIn: number;
    tenantId: number;
}

export interface IRequest extends Request {
    loginUser: LoginUser & JwtPayload;
}
