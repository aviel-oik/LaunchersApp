import express from "express";
import cors from "cors";
import { connectMoongooseDB } from "./database/connectDB.js";
import lauchersRoutes from "./routes/lauchersRoutes.js"

const app = express();
const PORT = 3300
await connectMoongooseDB();

app.use(cors());
app.use(express.json());

app.get("/test", (req,res) => {
    res.json({message: "okkkk"})
})
app.use("/lauchers", lauchersRoutes)


app.listen(PORT, () => {
    console.log("running in port 3300...")
})