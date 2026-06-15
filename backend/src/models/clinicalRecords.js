import {Schema, model} from "mongoose";

const clincalRecordsModel = new Schema({
    patient_id: {
        type: Schema.Types.ObjectId,
        ref: "patients"
    },
    diagnosis: {type: String},
    medications: [
        {
            medicineName: {type: String}
        }
    ],
    medicalNotes: {type: String}
})

export default model("clinicalRecords", clincalRecordsModel)