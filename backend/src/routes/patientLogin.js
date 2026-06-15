import express from "express"
import patientLoginController from "../controllers/patientsLoginController.js"

const router = express.Router()

router.route("/")
.post(patientLoginController.login)

export default router