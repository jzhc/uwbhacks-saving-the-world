export class Intiative {
    UID;
    title;
    ScrumMasterId;
    description;
    publishYear;
    publishMonth;
    publishDay;
    constructor(UID, title, smID, description, year, month, day) {
        this.UID = UID;
        this.title = title;
        this.ScrumMasterId = smID;
        this.description = description;
        this.publishYear = year;
        this.publishMonth = month;
        this.publishDay = day;
    }
}