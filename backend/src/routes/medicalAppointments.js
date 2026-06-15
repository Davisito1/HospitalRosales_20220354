import express from "express"
import medicalAppointmentsController from "../controllers/medicalAppointmentsController.js"
import router from "./patients.js"

const rotuer = express.Router()

router.route("/")
.get(medicalAppointmentsController.getAppointments)
.post(medicalAppointmentsController.insertAppointment)

router.route("/:id")
.put(medicalAppointmentsController.updateAppointment)
.delete(medicalAppointmentsController.deleteAppointment)

export default router