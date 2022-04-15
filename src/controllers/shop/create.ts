import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { User } from 'orm/entities/user/User';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { Role } from 'orm/entities/user/types';
import { Shop } from 'orm/entities/shop/Shop';
import { createAddress } from 'controllers/address';

export const create = async (req: Request, res: Response, next: NextFunction) => {
    const { name, description, address } = req.body
    const userId = req.jwtPayload.id

    const userRepository = getRepository(User)
    const shopRepository = getRepository(Shop)

    let user = null
    try {
        user = await userRepository.findOne(userId)
    } catch (err) {
        const customError = new CustomError(409, 'Raw', `User '${userId}' can't be found.`, null, err)
        return next(customError)
    }
    
    try {
        const shop = new Shop()
        shop.name = name
        shop.description = description
        shop.address = await createAddress(address)
        shop.user = user

        try {
            await shopRepository.save(shop);
            res.customSuccess(200, 'Shop successfully created.');
        } catch (err) {
            const customError = new CustomError(409, 'Raw', `Shop '${shop.name}' can't be saved.`, null, err);
            return next(customError);
        }
    } catch (err) {
        const customError = new CustomError(400, 'Raw', 'Error', null, err);
        return next(customError);
    }
};
