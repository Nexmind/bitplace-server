import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import { CustomError } from 'utils/response/custom-error/CustomError';
import { Role } from 'orm/entities/user/types';
import { Country } from 'orm/entities/address/Country';

export const findOrCreateCountry = async (json: any): Promise<Country> => {
    return new Promise<Country>(async (resolve, reject) => {
        const { code } = json

        const countryRepository = getRepository(Country)
        try {
            const existingCountry = await countryRepository.findOne({
                where: {
                    code: code
                }
            })
            if (existingCountry) {
                resolve(existingCountry)
            }

            const country = new Country()
            country.code = code

            try {
                const createdCountry = await countryRepository.save(country);
                resolve(createdCountry)
            } catch (err) {
                const customError = new CustomError(409, 'Raw', `Country can't be saved.`, null, err);
                reject(customError)
            }
        } catch (err) {
            const customError = new CustomError(400, 'Raw', 'Error', null, err);
            reject(customError)
        }
    })
};