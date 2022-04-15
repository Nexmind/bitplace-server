import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { User } from 'orm/entities/user/User';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { Shop } from 'orm/entities/shop/Shop';
import { editAddress } from 'controllers/address/edit';

export const edit = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const { name, description, address } = req.body

    const shopRepository = getRepository(Shop);
    try {
        const shop = await shopRepository.findOne({ where: { id } });

        if (!shop) {
            const customError = new CustomError(404, 'General', `Shop with id:${id} not found.`, ['Shop not found.']);
            return next(customError);
        }

        shop.name = name
        shop.description = description
        shop.address = await editAddress(address)

        try {
            await shopRepository.save(shop);
            res.customSuccess(200, 'Shop successfully saved.');
        } catch (err) {
            const customError = new CustomError(409, 'Raw', `Shop '${shop.name}' can't be saved.`, null, err);
            return next(customError);
        }
    } catch (err) {
        const customError = new CustomError(400, 'Raw', 'Error', null, err);
        return next(customError);
    }
};
