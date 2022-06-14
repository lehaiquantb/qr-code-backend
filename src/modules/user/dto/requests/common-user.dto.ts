import { UserStatus } from '../../user.constant';
import * as Joi from 'joi';
export const UserStatusSchema = Joi.object().keys({
    status: Joi.string()
        .valid(
            UserStatus.WAITING_FOR_APPROVAL,
            UserStatus.ACTIVE,
            UserStatus.INACTIVE,
        )
        .required(),
});

export class UserStatusDto {
    status: UserStatus;
}
