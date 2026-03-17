import mongoose from "mongoose";

const userShema = new mongoose.Schema({
    username : {type: String, required: true}, 
    password : {type: String, required: true},
    email : {type: String },
    user_type : {type: String, enum: ["intelligence-Corps", "air-Corps", "system-administrator"], required: true},
    last_login : {type: Date, default: Date.now}
});

const User = mongoose.model("User", userShema);

export default User;