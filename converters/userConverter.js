import { User } from '../models/userModel'

export const userConverter = {
    toFirestore: (user) => {
        return {
            UID: null,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            profession: user.profession,
            districtID: user.districtID,
            bio: user.bio
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new User(data.UID, data.firstName, data.lastName, data.email, data.phone, data.profession, data.districtID, data.bio);
    }
}