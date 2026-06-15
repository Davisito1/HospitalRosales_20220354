import express from "express"
import patientRegisterController from "../controllers/patientsRegisterController.js"
import upload from "../utils/cloudinaryConfig.js"

const router = express.Router()

router.route("/")
.post(upload.single("profilePhoto"), patientRegisterController.register)

router.route("/verifyCode")
.post(patientRegisterController.verifyCode)

export default router