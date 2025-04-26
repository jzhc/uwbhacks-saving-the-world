import { Tag } from '../models/tagModel'

export const tagConverter = {
    toFirestore: (tag) => {
        return {
            UID: tag.null,
            initiativeUID: tag.initiativeUID,
            text: tag.text
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Tag(data.UID, data.initiativeUID, data.text);
    }
}