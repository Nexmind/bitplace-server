import { Request, Response, NextFunction } from 'express';
import { Address } from 'orm/entities/address/Address';
import { getRepository } from 'typeorm';

import { CustomError } from 'utils/response/custom-error/CustomError';
import { findOrCreateCity } from './city/create';

export const createAddress = async (json: any): Promise<Address> => {
    return new Promise<Address>(async (resolve, reject) => {
        const { street, number, lat, long, city } = json

        const addressRepository = getRepository(Address)
        try {
            const address = new Address()
            address.street = street
            address.number = number
            address.lat = lat
            address.long = long
            address.city = await findOrCreateCity(city)

            try {
                const createdAddress = await addressRepository.save(address);
                resolve(createdAddress)
            } catch (err) {
                const customError = new CustomError(409, 'Raw', `Address can't be saved.`, null, err);
                reject(customError)
            }
        } catch (err) {
            const customError = new CustomError(400, 'Raw', 'Error', null, err);
            reject(customError)
        }
    })
}