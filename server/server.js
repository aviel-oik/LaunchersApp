import express from "express";
import cors from "cors";
import { connectMoongooseDB } from "./database/connectDB.js";

const app = express();
const PORT = 6000
await connectMoongooseDB();

app.use(cors());
app.use(express.json());

app.get("/test", (req,res) => {
    res.json({message: "okkkk"})
})


app.listen(PORT, () => {
    console.log("running in port 6000...")
})