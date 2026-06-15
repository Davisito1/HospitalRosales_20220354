import {Schema, model} from "mongoose"

const medicalAppointmentsModel = new Schema({
    patient_id: {
        type: Schema.Types.ObjectId,
        ref: "patients",
    },
    speciality: {
        type: Schema.Types.ObjectId,
        ref: "specialities"
    },
    appointmentDate: {type: Date},
    reason:{type: String},
    status: {type: String},
    observations: {type: String}
})

export default model("medicalAppointments", medicalAppointmentsModel)