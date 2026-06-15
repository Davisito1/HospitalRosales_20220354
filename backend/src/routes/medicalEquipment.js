import express from "express"
import medicalEquipmentController from "../controllers/medicalEquipmentConroller.js"
import upload from "../utils/cloudinaryConfig.js"

const router = express.Router()

router.route("/")
.get(medicalEquipmentController.getEquipment)
.post(upload.single("image"), medicalEquipmentController.insertEquipment)

router.route("/:id")
.put(upload.single("image"), medicalEquipmentController.updateEquipment)
.delete(medicalEquipmentController.deletedEquipment)

export default router