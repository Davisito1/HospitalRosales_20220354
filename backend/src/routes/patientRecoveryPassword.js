import express from "express"
import patientRecoveryPasswordController from "../controllers/patientRecoveryPasswordController.js"

const router = express.Router()

router.route("/requestCode", patientRecoveryPasswordController.requestCode)
router.route("/verifyCode", patientRecoveryPasswordController.verifyCode)
router.route("/newPassword", patientRecoveryPasswordController.newPassword)

export default router