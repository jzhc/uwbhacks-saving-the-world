import { Initiative } from '../models/initiativesModel'

export const initiativesConverter = {
    toFirestore: (intiatives) => {
        return {
            UID: null,
            title: initiatives.title,
            ScrumMasterId: initiatives.ScrumMasterId,
            description: initiatives.description,
            year: initiatives.year,
            month: initiatives.month,
            day: initiatives.day
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Initiative(data.UID, data.title, data.description, data.ScrumMasterId, data.year, data.month, data.day);
    }
}