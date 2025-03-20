import express from "express"

import dotenv from "dotenv"

import bodyParser from "body-parser"

import { router } from "./routers/router.js"

import cors from "cors"

dotenv.config({ path: "./config.env" })

let app = express()

app.use(bodyParser.urlencoded({ extended: true }))

let port = process.env.port || 3214

let corsOption = {
    origin:"*",
    method:"*"
}

app.use(cors(corsOption))

app.use(express.json())

app.use(router)

app.listen(port, () => {
    console.log(`server is running on port :${port} || http://127.0.0.1:${port}`)
})