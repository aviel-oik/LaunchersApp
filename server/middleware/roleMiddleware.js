
export const roleMiddleware = (requiredRole) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: "token requiered" });
        }
        if (req.userRole !== requiredRole) {
            return res.status(401).json({ message: "user_type not allowed" });
        }
        next();
    }
}
