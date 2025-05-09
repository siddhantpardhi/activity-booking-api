import jwt from "jsonwebtoken"
import { validationResult } from "express-validator"
import { User } from "../models/user.model.js"

export const registerUser = async (req, res) => {

    try {

        const errors = validationResult(req)

        if (!errors.isEmpty()) return res.status(400).json({ status:400, errors: errors.array() })

        const existedUser = await User.findOne({ email: req.body.email })

        if (existedUser) return res.status(401).json({ status: 401, message: "User already exists" })

        const user = await User.create(req.body)

        return res.status(200).json({ status: 200, message: "User Registered Successfully", user })
    } catch (error) {
        console.error("Error While Registering User ", error)
        res.status(500).json({ status: 500, message: error.message })
    }
}

export const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body

        const user = await User.findOne({ email: email.toLowerCase() }).select("+password")
        if (!user) return res.status(404).json({ status: 404, message: "No Such User Exists" })

        const isPasswordValid = await user.isPasswordCorrect(password)
        if (!isPasswordValid) return res.status(400).json({ status: 400, message: "Invalid credentials" })

        const token = jwt.sign(
            { userID: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1hr" }
        )

        const origin = req.get("origin") || ""
        const islocal = origin.includes("localhost")

        const options = {
            httpOnly: true,     
            secure: !islocal,   
            sameSite: islocal ? 'lax' : 'none',    
            maxAge: 3600000
          }

        return res
        .status(200)
        .cookie("token", token, options)
        .json({status: 200, token })
    } catch (error) {
        console.error("Error while Logging in User ", error)
        res.status(500).json({ status: 500, message: error.message })
    }
}
