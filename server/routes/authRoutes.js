import { Router } from "express";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

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

route.put("/register/update/:id", async (req, res) => {
    if (!req.params.id) 
        return res.status(400).json({ message: "ID required" });
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });///
        res.json({ message: "User updated successfully", user });
    } 
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}) 

route.delete("/register/delete/:id", async (req, res) => {
    if (!req.params.id) 
        return res.status(400).json({ message: "ID required" });
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted successfully", user });
    } 
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}) 

route.post("/login", async (req, res) => {
    if(!req.body.username || !req.body.password)
        return res.status(400).json({ message: "miss required fields (password or username)" });
    try {
        const user = await User.findOne({ username: req.body.username, password: req.body.password });
        if (!user) 
            return res.status(401).json({ message: "Invalid username or password" });
        const token = jwt.sign({ id: user._id , username: user.username, user_type: user.user_type }, process.env.JWT_SECRET, { expiresIn: "1h" });
        await User.findByIdAndUpdate(user._id, {"last_login": Date.now()}, { new: true }); ///
        res.json({ message: "Login successful", user, token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

route.get("/getUser", () => {}) ////

export default route;