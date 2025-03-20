import jwt from "jsonwebtoken"

import dotenv from "dotenv"
import adminModel from "../Models/adminSchema.js"

dotenv.config({ path: "./config.env" })

let authAdmin = async (req, res, next) => {
    let token = req.headers.token
    try {
        if (!token) { throw ("token not found !") }

        let decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded) {

            throw ("Invalid token")

        }
        console.log(decoded)

        let checkUser = await adminModel.findOne({ email: decoded.email })

        if (!checkUser) {

            throw ("user not found !")

        }
        
        req.user = decoded.email

        next()

    } catch (err) {

        res.status(400).json({ message: "Cannot access dashboard !", err })
        
    }
}

export default authAdmin