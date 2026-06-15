import patientsModel from "../models/patients.js"
import {v2 as cloudinary} from "cloudinary"

const patientsController = {}

patientsController.getPatients = async (req, res) => {
    try {
        const patients = await patientsModel.find()
        return res.status(200).json(patients)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

patientsController.updatePatient = async (req, res) => {
    try {
        const {
            name,
            lastName,
            email,
            password,
            birthDate,
            phone,
            address,
            phoneEmergencyContacts,
            isVerified,
            loginAttempts,
            timeOut
        } = req.body

        const patientFound = await patientsModel.findById(req.params.id)

        if (!patientFound) {
            return res.status(400).json({message: "Patient not found"})
        }

        const updateData = {
            name,
            lastName,
            email,
            password,
            birthDate,
            phone,
            address,
            phoneEmergencyContacts,
            isVerified,
            loginAttempts,
            timeOut
        }

        if (req.file) {
            await cloudinary.uploader.destroy(patientFound.public_id)

            updateData.profilePhoto = req.file.path,
            updateData.public_id = req.file.filename
        }

        const updatedPatient = await patientsModel.findByIdAndUpdate(req.params.id, updateData, {new: true})

        return res.status(200).json({message: "Patient updated"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

patientsController.deletePatient = async (req, res) => {
    try {
        const patientFound = await patientsModel.findById(req.params.id)

        if (!patientFound) {
            return res.status(400).json({message: "Patient not found"})
        }

        await cloudinary.uploader.destroy(patientFound.public_id)

        const deletedPatient = await patientsModel.findByIdAndDelete(req.params.id)

        return res.status(200).json({message: "Patient deleted"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default patientsController