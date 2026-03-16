import mongoose from "mongoose";

const laucherShema = new mongoose.Schema({
    city : { type: String, required: true}, 
    rocketType : {type: String, enum: ["Shahab3", "Fetah110", "Radwan", "Kheibar"], required: true}, 
    latitude : { type: Number, required: true}, 
    longitude : { type: Number, required: true},
    laucherName : { type: String, required: true} 
});

const Laucher = mongoose.model("Laucher", laucherShema);

export default Laucher;