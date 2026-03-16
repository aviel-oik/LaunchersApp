import mongoose from "mongoose";

const laucherShema = new mongoose.Schema({
    city : { type: String, }, //
    rocketType : {type: String, enum: ["Shahab3", "Fetah110", "Radwan", "Kheibar"], }, //
    latitude : { type: Number, }, //
    longitude : { type: Number, },
    laucherName : { type: String, } //
});

const Laucher = mongoose.model("Laucher", laucherShema);

export default Laucher;