export class Comment {
    UID;
    userUID;
    initiativeUID;
    text;
    constructor(UID, userUID, initiativeUID, text) {
        this.UID = UID
        this.userUID = userUID;
        this.initiativeUID = initiativeUID;
        this.text = text;
    }
}