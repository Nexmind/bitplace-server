import { Request, Response, NextFunction } from 'express';
import { Shop } from 'orm/entities/shop/Shop';
import { getManager, getRepository } from 'typeorm';

import { CustomError } from 'utils/response/custom-error/CustomError';

export const geolocation = async (req: Request, res: Response, next: NextFunction) => {
    const shopRepository = getRepository(Shop);
    const { lat, long, distance } = req.body
    try {
        const manager = getManager()
        const shopRepository = getRepository(Shop)
        const shopIds = await manager.query(
            "SELECT s.id, (6371 *acos(cos( radians( ? ) ) * cos( radians( a.lat ) ) * cos(radians( a.long ) - radians( ? )) + sin(radians(?)) * sin(radians(a.lat)))) `distance` FROM shop s JOIN address a ON s.address_id = a.id HAVING `distance` < ? ORDER BY `distance`;",
            [lat, long, lat, distance]
            ) as number[]

        const shops = await shopRepository.findByIds(shopIds, {
            relations: ['address', 'address.city', 'address.city.administrationArea', 'address.city.administrationArea.country']
        })
        res.customSuccess(200, 'List of shop by geolocation.', shops);
    } catch (err) {
        const customError = new CustomError(400, 'Raw', `Can't retrieve list of shops by geolocation.`, null, err);
        return next(customError);
    }
};


//var query = "SELECT s.*, (6371 *acos(cos( radians( ? ) ) * cos( radians( a.lat ) ) * cos(radians( a.long ) - radians( ? )) + sin(radians(?)) * sin(radians(a.lat)))) `distance` FROM Shop s JOIN Address a ON s.addressId = a.id WHERE s.isEnabled = true HAVING `distance` < ? ORDER BY `distance`;"

