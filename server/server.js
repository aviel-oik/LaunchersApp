import express from "express";
import cors from "cors";
import { connectMoongooseDB } from "./database/connectDB.js";
import lauchersRoutes from "./routes/lauchersRoutes.js"
import authRoutes from "./routes/authRoutes.js"

const app = express();
const PORT = 3300
await connectMoongooseDB();

app.use(cors());
app.use(express.json());

app.use("/api/lauchers", lauchersRoutes)
app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
    console.log("running in port 3300...")
})