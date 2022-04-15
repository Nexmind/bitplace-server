
import { City } from 'orm/entities/address/City';
import { getRepository } from 'typeorm';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { findOrCreateAdministrationArea } from '../administrationArea/create';

export const findOrCreateCity = async (json: any): Promise<City> => {
    return new Promise<City>(async (resolve, reject) => {
        const { name, zipCode, administrationArea } = json

        const cityRepository = getRepository(City)

        const dbAdministrationArea = await findOrCreateAdministrationArea(administrationArea)
        try {
            const existingCity = await cityRepository.findOne({
                where: {
                    zipCode: zipCode,
                    name: name,
                    administrationArea: {
                        id: dbAdministrationArea.id
                    }
                }
            })
            if (existingCity) {
                resolve(existingCity)
            }

            const city = new City()
            city.name = name
            city.zipCode = zipCode
            city.administrationArea = dbAdministrationArea

            try {
                const createdCity = await cityRepository.save(city);
                resolve(createdCity)
            } catch (err) {
                const customError = new CustomError(409, 'Raw', `city can't be saved.`, null, err);
                reject(customError)
            }
        } catch (err) {
            const customError = new CustomError(400, 'Raw', 'Error', null, err);
            reject(customError)
        }
    })
};