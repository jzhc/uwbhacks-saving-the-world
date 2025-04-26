import { User } from '../models/userModel'

export const userConverter = {
    toFirestore: (user) => {
        return {
            UID: null,
            firstName: user.firstName,
            lastName: user.lastName
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new User(data.UID, data.firstName, data.lastName);
    }
}