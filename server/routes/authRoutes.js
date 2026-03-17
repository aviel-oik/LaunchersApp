import { Router } from "express";
import User from "../models/user.js";

const route = Router();

route.post("/register/create", async (req, res) => {
    if(!req.body.username || !req.body.password || !req.body.email || !req.body.user_type)
        return res.status(400).json({ message: "miss required fields" });
    try {
        await User.create(req.body) 
        res.json({message: "User added suceffuly"})
    } 
    catch (err) {
        res.status(500).json({ error: err.message })
    }
})

route.put("/register/update", () => {}) //

route.delete("/register/delete/:id", () => {}) //

route.post("/login", () => {
    if(!req.body.username || !req.body.password)
        return res.status(400).json({ message: "miss required fields (password or username)" });
    
})

route.get("/getUser", () => {})

export default route;