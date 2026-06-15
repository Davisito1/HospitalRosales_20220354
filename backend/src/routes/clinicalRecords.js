import express from "express"
import clinicalRecordsController from "../controllers/clinicalRecordsController.js"

const router = express.Router()

router.route("/")
.get(clinicalRecordsController.getRecords)
.post(clinicalRecordsController.insertRecord)

router.route("/:id")
.put(clinicalRecordsController.updateRecord)
.delete(clinicalRecordsController.deleteRecord)

export default router