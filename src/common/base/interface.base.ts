import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface LoginUser {
    email: string;
    id: number;
    expiresIn: number;
}

export interface IRequest extends Request {
    loginUser: LoginUser & JwtPayload;
}
