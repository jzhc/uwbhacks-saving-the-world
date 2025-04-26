export class Initiative {
    UID;
    title;
    ScrumMasterId;
    description;
    details;
    rationale;
    signatureCount;
    publishYear;
    publishMonth;
    publishDay;
    constructor(UID, title, smID, description, details, rationale, signatureCount, year, month, day) {
        this.UID = UID;
        this.title = title;
        this.ScrumMasterId = smID;
        this.description = description;
        this.details = details;
        this.rationale = rationale;
        this.signatureCount = signatureCount;
        this.publishYear = year;
        this.publishMonth = month;
        this.publishDay = day;
    }
}