import { Router } from "express";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const route = Router();

route.post("/register/create", authMiddleware, roleMiddleware([ "system-administrator"]), async (req, res) => {
    if(!req.body.username || !req.body.password || !req.body.email || !req.body.userType)
        return res.status(400).json({ message: "miss required fields" });
    try {
        await User.create(req.body) 
        res.json({message: "User added suceffuly"})
    } 
    catch (err) {
        res.status(500).json({ error: err.message })
    }
})

route.get("/users", authMiddleware, roleMiddleware(["system-administrator"]), async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } 
    catch (err) {
        res.status(500).json({ error: err.message })
    }
})

route.put("/register/update/:id", authMiddleware, roleMiddleware(["system-administrator"]), async (req, res) => {
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

route.delete("/register/delete/:id", authMiddleware, roleMiddleware(["system-administrator"]), async (req, res) => {
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
        const token = jwt.sign({ id: user._id , username: user.username, userType: user.userType }, process.env.JWT_SECRET, { expiresIn: "1h" });
        await User.findByIdAndUpdate(user._id, {"last_login": Date.now()}, { new: true }); ///
        res.json({ message: "Login successful", user, token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

route.get("/user/:id", authMiddleware, roleMiddleware(["system-administrator"]), async (req, res) => {
    const user = await User.findById(req.params.id);
    if(!user)
        return res.status(404).json({ message: "User not found" });
    res.json(user)
})

route.get("/getUser", authMiddleware, roleMiddleware(["intelligence-Corps", "air-Corps", "system-administrator"]), async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
        return res.status(401).json({ message: "Token required" });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user)            
            return res.status(404).json({ message: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
})

export default route;