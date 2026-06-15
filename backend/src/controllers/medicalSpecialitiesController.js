import specialitiesModel from "../models/medicalSpecialities.js"

const specialitiesController = {}

specialitiesController.getSpecialities = async (req, res) => {
    try {
        const specialities = await specialitiesModel.find()
        return res.status(200).json(specialities)
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

specialitiesController.insertSpeciality = async (req, res) => {
    try {
        const {specialityName, description, isAvailable} = req.body

        const newSpeciality = new specialitiesModel({
            specialityName,
            description,
            isAvailable
        })

        await newSpeciality.save()

        return res.status(200).json({message: "speciality saved"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

specialitiesController.updateSpeciality = async (req, res) => {
    try {
        const {specialityName, description, isAvailable} = req.body

        const updatedSpeciality = await specialitiesModel.findByIdAndUpdate(req.params.id,
            {specialityName, description, isAvailable},
            {new: true}
        )

        if (!updatedSpeciality) {
            return res.status(400).json({message: "Speciality not found"})
        }

        return res.status(200).json({message: "Speciality updated"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

specialitiesController.deleteSpeciality = async (req, res) => {
    try {
        const deletedSpeciality = await specialitiesModel.findByIdAndDelete(req.params.id)

        if (!deletedSpeciality) {
            return res.status(400).json({message: "Speciality not found"})
        }

        return res.status(200).json({message: "Speciality deleted"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default specialitiesController