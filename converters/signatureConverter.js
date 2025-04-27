import { Signature } from '../models/signatureModel'

export const signatureConverter = {
    toFirestore: (sig) => {
        return {
            UID: null,
            userUID: sig.userUID,
            initiativeUID: sig.initiativeUID,
            signature: sig.signature
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Signature(data.UID, data.userUID, data.initiativeUID, data.signature);
    }
}