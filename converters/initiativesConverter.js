import { Initiative } from '../models/initiativesModel'

export const initiativesConverter = {
    toFirestore: (initiatives) => {
        return {
            UID: null,
            title: initiatives.title,
            ScrumMasterId: initiatives.ScrumMasterId,
            description: initiatives.description,
            publishYear: initiatives.year,
            publicMonth: initiatives.month,
            publishDay: initiatives.day
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Initiative(data.UID, data.title, data.ScrumMasterId, data.description, data.year, data.month, data.day);
    }
}