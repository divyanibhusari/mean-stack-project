import { generatedToken } from "../auth/generatedToken.js"

import "../database/conn.js"

import adminModel from "../Models/adminSchema.js"

let getHome = (req, res) => {

    console.log("gethome route called !")

    res.status(200).json({ message: "This is a home route" })

}
let postHome = (req,res)=>{
    console.log("post home route called !")
    console.log(req.body)
    res.status(202).json({message:"form submitted successfully !"})
}

let adminLogin = async (req, res) => {
    let responseData = {
        status: 0,
        message: ""
    }
    try {
        let { email, password } = req.body
        // check if we have email and password
        if (!email || !password) {
            responseData.message = "Email or password is missing !"
                responseData.status = 400
            throw (responseData.message)
        }
        // here we have email and password | now verify with database

        // checking if admin exists

        let adminExists = await adminModel.findOne({ "email": email })
        if (!adminExists) {
            responseData.message = "Email doesn't exists !"
                responseData.status = 400
            throw (responseData.message)
        }
        // now compare the password

        let verifypassword = await adminModel.findOne({ "email": email, "password": password })

        if (!verifypassword) {
            responseData.message = "Email or password doen not match !"
                responseData.status = 401
            throw (responseData.message)
        }
        // create the token (jwt)
        let generateToken = generatedToken(verifypassword.email)
        if (!generateToken) {
            responseData.message = "unable to login | token error try again later !"
                responseData.status = 500
            throw (responseData.message)
        }
        // now save the token into the database
        let result = await adminModel.updateOne({ "email": verifypassword.email }, { $set: { "token": generateToken } })

        console.log(result)

        res.status(202).json({message:"email and password matched !" , token : generateToken})

    } catch (err) {
        console.log(err)
        res.status(responseData.status).json({ message: err })
    }
    
}
let getDashboard = (req,res)=>{

    console.log("this is get dashboard")

    console.log("we got user after authAdmin :",req.user)

    res.status(202).json({message:"Welcome admin to the dashboard"})

}

export { getHome, adminLogin , getDashboard ,postHome }