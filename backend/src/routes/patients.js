import express from "express"
import patientsController from "../controllers/patientsController.js"
import upload from "../utils/cloudinaryConfig.js"

const router = express.Router()

router.route("/")
.get(patientsController.getPatients)

router.route("/:id")
.put(upload.single("profilePhoto"), patientsController.updatePatient)
.delete(patientsController.deletePatient)

export default router