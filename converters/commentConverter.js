import { Comment } from '../models/commentModel'

export const commentConverter = {
    toFirestore: (comment) => {
        return {
            UID: null,
            userUID: comment.userUID,
            initiativeUID: comment.initiativeUID,
            text: comment.text
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Comment(data.UID, data.userUID, data.initiativeUID, data.text);
    }
}