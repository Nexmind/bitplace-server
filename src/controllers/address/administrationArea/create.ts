
import { getRepository } from 'typeorm';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { AdministrationArea } from 'orm/entities/address/AdministrationArea';
import { findOrCreateCountry } from '../country/create';

export const findOrCreateAdministrationArea = async (json: any): Promise<AdministrationArea> => {
    return new Promise<AdministrationArea>(async (resolve, reject) => {
        const { name, code, country } = json

        const administrationAreaRepository = getRepository(AdministrationArea)

        try {
            const existingAA = await administrationAreaRepository.findOne({
                where: {
                    code: code,
                    name: name
                }
            })
            if (existingAA) {
                resolve(existingAA)
            }

            const administrationArea = new AdministrationArea()
            administrationArea.code = code
            administrationArea.name = name
            administrationArea.country = await findOrCreateCountry(country)

            try {
                const createdAA = await administrationAreaRepository.save(administrationArea);
                resolve(createdAA)
            } catch (err) {
                const customError = new CustomError(409, 'Raw', `AdministrationArea can't be saved.`, null, err);
                reject(customError)
            }
        } catch (err) {
            const customError = new CustomError(400, 'Raw', 'Error', null, err);
            reject(customError)
        }
    })
};