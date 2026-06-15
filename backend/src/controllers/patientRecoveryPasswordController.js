import patientsModel from "../models/patients.js";
import crypto from "crypto"
import jsonwebtoken from "jsonwebtoken"
import bcryptjs from "bcryptjs";
import { config } from "../../config.js";

const patientRecoveryPasswordController = {}

patientRecoveryPasswordController.requestCode = async (req, res) => {
    try {
        const {email} = req.body

        const patientFound = await patientsModel.findOne({email})

        if (!patientFound) {
            return res.status(400).json({message: "Patient not found"})
        }

        const randomCode = crypto.randomBytes(3).toString("hex")

        const token = jsonwebtoken.sign(
            {email, randomCode, userType: "patient", verified: false},
            config.JWT.secret,
            {expiresIn: "15m"}
        )

        res.cookie("recoveryCookie", token, {maxAge: 15 * 60 * 1000})

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.user_email,
                password: config.email.user_password
            }
        })

        const mailOptions = {
            from: config.email.user_email,
            to: email,
            subject: "Recuperación de contraseña",
            text: `Para recuperar tu contraseña, ingresa el siguiente código: ${randomCode}`
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({message: "Error sending email"})
            }

            return res.status(200).json({message: "Email sent"})
        })  
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

patientRecoveryPasswordController.verifyCode = async (req, res) => {
    try {
        const {code} = req.body 

        const token = req.cookies.recoveryCookie

        const decoded = jsonwebtoken.verify(token, config.JWT.secret)

        if (code !== decoded.randomCode) {
            return res.status(400).json({message: "Invalid code"})
        }

        const newToken = jsonwebtoken.sign(
            {email: decoded.email, userType: "patient", verified: true},
            config.JWT.secret,
            {expiresIn: "15m"}
        )

        res.cookie("recoveryCookie", newToken, {maxAge: 15 * 60 * 1000})

        return res.status(200).json({message: "Code verified"})
    } catch (eror) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

patientRecoveryPasswordController.newPassword = async (req, res) => {
    try {
        const {newPassword, confirmPassword} = req.body 

        if (newPassword !== confirmPassword) {
            return res.status(400).json({message: "Password doesn't match"})
        }

        const token = res.cookies.recoveryCookie

        const decoded = jsonwebtoken.verify(token, config.JWT.secret)

        if (!decoded.verified) {
            return res.status(400).json({message: "Code not verified"})
        }

        const passwordHashed = await bcryptjs.hash(newPassword, 10)

        await patientsModel.findOneAndUpdate({email: decoded.email}, {password: passwordHashed}, {new: true})

        res.clearCookie("recoveryCookie")

        return res.status(200).json("Password updated")
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}
export default patientRecoveryPasswordController