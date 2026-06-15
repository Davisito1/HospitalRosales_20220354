import {Schema, model} from "mongoose";

const patientsModel = new Schema({
    name: {type: String},
    lastName: {type: String},
    email: {type: String},
    password: {type: String},
    birthDate: {type: Date},
    phone: {type: String},
    address: {type: String},
    phoneEmergencyContacts: [
        {
            phone: {type: String},
            nameEmergencyContact: {type: String}
        }
    ],
    profilePhoto: {type: String},
    public_id: {type: String},
    isVerified: {type: Boolean},
    logginAttempts: {type: Number},
    timeOut: {type: Date}
})

export default model("patients", patientsModel)