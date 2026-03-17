import jwt from "jsonwebtoken";
import "dotenv/config"

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) 
        return res.status(401).json({ message: "token requiered1" });
    const token = authHeader.split(" ")[1];
    if (!token) 
        return res.status(401).json({ message: "token required2" });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
}