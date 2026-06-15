import clinicalRecordsModel from "../models/clinicalRecords.js"

const clinicalRecordsController = {}

clinicalRecordsController.getRecords = async (req, res) => {
    try {
        const records = await clinicalRecordsModel.find()
        return res.status(200).json(records)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

clinicalRecordsController.insertRecord = async (req, res) => {
    try {
        const {
            patient_id,
            diagnosis,
            medications,
            medicalNotes
        } = req.body

        const newRecord = new clinicalRecordsModel({
            patient_id,
            diagnosis,
            medications,
            medicalNotes
        })

        await newRecord.save()

        return res.status(200).json({message: "Record saved"})
    } catch (error) { 
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

clinicalRecordsController.updateRecord = async (req, res) => {
    try {
        const {
            patient_id,
            diagnosis,
            medications,
            medicalNotes
        } = req.body

        const updatedRecord = await clinicalRecordsModel.findByIdAndUpdate(req.params.id, {
            patient_id,
            diagnosis,
            medications,
            medicalNotes
        }, {new: true})

        if (!updatedRecord) {
            return res.status(400).json(200).json({message: "Record not found"})
        }

        return res.status(200).json({message: "Record updated"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

clinicalRecordsController.deleteRecord = async (req, res) => {
    try {
        const deletedRecord = await clinicalRecordsModel.findByIdAndDelete(req.params.id)

        if (!deletedRecord) {
            return res.status(400).json({message: "Record not found"})
        }

        return res.status(200).json({message: "Message deleted"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default clinicalRecordsController