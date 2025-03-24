import express from "express"

import { getHome, adminLogin, getDashboard ,postHome} from "../controllers/controller.js"

import authAdmin from "../auth/authAdmin.js"


let router = express()

router.get("/", getHome)

router.post("/post", postHome)

router.post("/admin/login", adminLogin)

router.post("/dashboard", authAdmin, getDashboard)

export { router }