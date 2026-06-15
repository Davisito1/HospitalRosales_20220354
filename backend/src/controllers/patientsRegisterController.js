import patientsModel from "../models/patients.js"
import bcryptjs from "bcryptjs"
import crypto from "crypto"               
import jsonwebtoken from "jsonwebtoken"
import {config} from "../../config.js"
import nodemailer from "nodemailer"

const patientsRegisterController = {}

patientsRegisterController.register = async (req, res) => {
    try {
        const {
            name,
            lastName,
            email,
            password,
            birthDate,
            phone,
            address,
            phoneEmergencyContacts,
            isVerified,
            loginAttempts,
            timeOut
        } = req.body

        const existingPatient = await patientsModel.findOne({email})

        if (existingPatient) {
            return res.status(400).json({message: "Patient already exists"})
        }

        const passwordHashed = await bcryptjs.hash(password, 10)

        const randomCode = crypto.randomBytes(3).toString("hex")

        const token = jsonwebtoken.sign({
            randomCode,
            name,
            lastName,
            email,
            password: passwordHashed,
            birthDate,
            phone,
            address,
            phoneEmergencyContacts,
            profilePhoto: req.file.path,
            public_id: req.file.filename
        }, config.JWT.secret, {expiresIn: "15m"})

        res.cookie("registrationCookie", token, {maxAge: 15 * 60 * 1000})

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email.user_email,
                pass: config.email.user_password
            }
        })

        const mailOptions = {
            from: config.email.user_email,
            to: email,
            subject: "Verificación de cuenta",
            text: `Para verificar tu cuenta, ingresa el siguiente código: ${randomCode}`
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("error" + error)
                return res.status(500).json({message: "Error sending email"})
            }

            return res.status(200).json({message: "Email sent"})
        })
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

patientsRegisterController.verifyCode = async (req, res) => {
    try {
        const {verificationCodeRequest} = req.body

        const token = req.cookies.registrationCookie

        const decoded = jsonwebtoken.verify(token, config.JWT.secret)

        const {
            randomCode: storedCode,
            randomCode,
            name,
            lastName,
            email,
            password: passwordHashed,
            birthDate,
            phone,
            address,
            phoneEmergencyContacts,
            profilePhoto,
            public_id,
            isVerified,
            loginAttempts,
            timeOut
        } = decoded

        if (verificationCodeRequest !== storedCode) {
            return res.status(400).json({message: "Invalid code"})
        }

        const newPatient = new patientsModel({
            randomCode,
            name,
            lastName,
            email,
            password: passwordHashed,
            birthDate,
            phone,
            address,
            phoneEmergencyContacts,
            profilePhoto,
            public_id,
            isVerified: true
        })

        await newPatient.save()

        return res.status(200).json({message: "Patient registered"})
    } catch (error) {
        console.log("error" + error)
        return res.status(500).json({message: "Internal server error"})
    }
}

export default patientsRegisterController