import { Signature } from '../models/signatureModel'

export const signatureConverter = {
    toFirestore: (sig) => {
        return {
            initiativeUID: sig.initiativeUID,
            signature: sig.signature
        };
    },
    fromFirestore: (snapshot, options) => {
        const data = snapshot.data(options);
        return new Signature(data.initiativeUID, data.signature);
    }
}