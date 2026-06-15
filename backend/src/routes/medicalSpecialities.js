import express from "express"
import medicalSpecialitiesController from "../controllers/medicalSpecialitiesController.js"

const router = express.Router()

router.route("/")
.get(medicalSpecialitiesController.getSpecialities)
.post(medicalSpecialitiesController.insertSpeciality)

router.route("/:id")
.put(medicalSpecialitiesController.updateSpeciality)
.delete(medicalSpecialitiesController.deleteSpeciality)

export default router