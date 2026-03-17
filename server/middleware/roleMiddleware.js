
export const roleMiddleware = (requiredRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: "token requiered" });
        }
        if (!requiredRoles.includes(req.user.userType)) {
            console.log(req.user)
            return res.status(401).json({t: req.user.userType, message: "user_type not allowed" });
        }
        next();
    }
}
