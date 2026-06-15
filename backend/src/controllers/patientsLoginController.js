import patientsModel from "../models/patients.js"
import bcryptjs from "bcryptjs"
import { config } from "../../config.js"
import jsonwebtoken from "jsonwebtoken"

const patientsLoginController = {} 

patientsLoginController.login = async (req, res) => {
    try {
        const {email, password} = req.body

        const patientFound = await patientsModel.findOne({email})

        if (!patientFound) {
            return res.status(400).json({message: "Patient not found"})
        }

        if (patientFound.timeOut && patientFound.timeOut > Date.now()) {
            return res.status(400).json({message: "Account blocked"})
        }

        const isMatch = await bcryptjs.compare(password, patientFound.password)

        if (!isMatch) {
            patientFound.logginAttempts = (patientFound.logginAttempts || 0) + 1

            if (patientFound.logginAttempts >= 5) {
                patientFound.timeOut = Date.now() + 5 * 60 * 1000

                patientFound.logginAttempts = 0

                await patientFound.save()

                return res.status(400).json({message: "Account blocked for many attempts"})
            }

            await patientFound.save()

            return res.status(401).json("Wrong password")
        }

        patientFound.logginAttempts = 0
        patientFound.timeOut = null

        const token = jsonwebtoken.sign(
            {id: patientFound._id, userType: "patient"},
            config.JWT.secret,
            {expiresIn: "30d"}
        )

        res.cookie("authCookie", token)

        return res.status(200).json({message: "Logged in successfully"})
    } catch {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default patientsLoginController