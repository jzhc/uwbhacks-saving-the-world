export class User {
    UID;
    firstName;
    lastName;
    email;
    phone;
    profession;
    districtID;
    bio;
    constructor (UID, firstName, lastName, email, phone, profession, districtID, bio) {
        this.UID = UID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.profession = profession;
        this.districtID = districtID;
        this.bio = bio;
    }
}