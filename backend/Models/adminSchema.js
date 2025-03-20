import mongoose from "mongoose";
let adminSchema = mongoose.Schema({
    email: String,
    password: String,
    token: String
})
let adminModel = mongoose.model("admins", adminSchema);

export default adminModel