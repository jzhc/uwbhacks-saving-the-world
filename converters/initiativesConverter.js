import { Initiative } from '../models/initiativesModel'

export const initiativesConverter = {
    toFirestore: (initiatives) => {
        return {
            UID: null,
            title: initiatives.title,
            ScrumMasterId: initiatives.ScrumMasterId,
            description: initiatives.description,
            details: initiatives.details,
            rationale: initiatives.rationale,
            signatureCount: initiatives.signatureCount,
            tagsUID: initiatives.tagsUID,
            publishYear: initiatives.publishYear,
            publishMonth: initiatives.publishMonth,
            publishDay: initiatives.publishDay
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Initiative(data.UID, data.title, data.ScrumMasterId, data.description, data.details, data.rationale, data.signatureCount, data.tagsUID, data.publishYear, data.publishMonth, data.publishDay);
    }
}