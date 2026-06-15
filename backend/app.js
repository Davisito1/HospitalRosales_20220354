import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import patientsRoutes from "./src/routes/patients.js"
import patientRegisterRoutes from "./src/routes/patientRegister.js"
import patientLoginRoutes from "./src/routes/patientLogin.js"
import patientRecoveryPasswordRoutes from "./src/routes/patientRecoveryPassword.js"
import medicalSpecialitiesRoutes from "./src/routes/medicalSpecialities.js"
import medicalAppointmentsRoutes from "./src/routes/medicalAppointments.js"
import clinicalRecordsRoutes from "./src/routes/clinicalRecords.js"
import medicalEquipmentRoutes from "./src/routes/medicalEquipment.js"

const app = express()

app.use(cors({
    origin: ["https://localhost:5173", "http://localhost:5174"],
    credentials: true
}))

app.use(cookieParser())
app.use(express.json())

app.use("/api/patients", patientsRoutes)
app.use("/api/registerPatient", patientRegisterRoutes)
app.use("/api/loginPatient", patientLoginRoutes)
app.use("/api/recoveryPasswordPatient", patientRecoveryPasswordRoutes)
app.use("/api/medicalSpecialities", medicalSpecialitiesRoutes)
app.use("/api/medicalAppointments", medicalAppointmentsRoutes)
app.use("/api/clinicalRecords", clinicalRecordsRoutes)
app.use("/api/medicalEquipment", medicalEquipmentRoutes)

export default app