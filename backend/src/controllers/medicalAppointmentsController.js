import medicalAppointmentsModel from "../models/medicalAppointments.js"

const medicalAppointmentsController = {}

medicalAppointmentsController.getAppointments = async (req, res) => {
    try {
        const appointments = await medicalAppointmentsModel.find()
        return res.status(200).json(appointments)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

medicalAppointmentsController.insertAppointment = async (req, res) => {
    try {
        const {
            patient_id,
            speciality_id,
            appointmentDate,
            reason,
            status,
            observations
        } = req.body

        const newAppointment = new medicalAppointmentsModel({
            patient_id,
            speciality_id,
            appointmentDate,
            reason,
            status,
            observations
        })

        await newAppointment.save()

        return res.status(200).json({message: "Appointment saved"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    } 
}

medicalAppointmentsController.updateAppointment = async (req, res) => {
    try {
        const {
            patient_id,
            speciality_id,
            appointmentDate,
            reason,
            status,
            observations
        } = req.body

        const updatedAppointment = await medicalAppointmentsModel.findByIdAndDelete(req.params.id, {
                patient_id,
                speciality_id,
                appointmentDate,
                reason,
                status,
                observations
            },
            {new: true}
        )

        if (!updatedAppointment) {
            return res.status(400).json({message: "Appointment not found"})
        }

        return res.status(200).json({message: "Appointment updated"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

medicalAppointmentsController.deleteAppointment = async (req, res) => {
    try {
        const deletedAppointment = await medicalAppointmentsModel.findByIdAndDelete(req.params.id)

        if (!deletedAppointment) {
            return res.status(400).json({message: "Appointment not found"})
        }

        return res.status(200).json({message: "Appointment updated"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default medicalAppointmentsController