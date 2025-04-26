export class Comment {
    UID
    userUID;
    initiativeUID;
    text;
    constructor(userUID, initiativeUID, text) {
        this.userUID = userUID;
        this.initiativeUID = initiativeUID;
        this.text = text;
    }
}