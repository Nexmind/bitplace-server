import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { User } from 'orm/entities/user/User';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { Role } from 'orm/entities/user/types';

export const create = async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body

    const userRepository = getRepository(User)
    try {
        const user = new User()

        user.username = username
        user.password = password
        user.email = email
        user.hashPassword()
        user.role = 'STANDARD' as Role

        try {
            await userRepository.save(user);
            res.customSuccess(200, 'User successfully created.');
        } catch (err) {
            const customError = new CustomError(409, 'Raw', `User '${user.email}' can't be saved.`, null, err);
            return next(customError);
        }
    } catch (err) {
        const customError = new CustomError(400, 'Raw', 'Error', null, err);
        return next(customError);
    }
};
