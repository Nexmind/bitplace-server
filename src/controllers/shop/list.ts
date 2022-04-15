import { Request, Response, NextFunction } from 'express';
import { Shop } from 'orm/entities/shop/Shop';
import { getRepository } from 'typeorm';

import { CustomError } from 'utils/response/custom-error/CustomError';

export const list = async (req: Request, res: Response, next: NextFunction) => {
    const shopRepository = getRepository(Shop);
    try {
        const shops = await shopRepository.find({
            relations: ['address', 'address.city', 'address.city.administrationArea', 'address.city.administrationArea.country']
        })

        res.customSuccess(200, 'List of shop.', shops);
    } catch (err) {
        const customError = new CustomError(400, 'Raw', `Can't retrieve list of shops.`, null, err);
        return next(customError);
    }
};
