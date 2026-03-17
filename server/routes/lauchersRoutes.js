import { Router } from "express";
import { getLauchers, getLaucherById, addLaucher, deleteLaucher, updateLaucher } from "../services/lauchersServices.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const route = Router();

route.get("/", authMiddleware, roleMiddleware(["intelligence-Corps", "air-Corps", "system-administrator"]), getLauchers);
route.get("/:id", authMiddleware, roleMiddleware(["intelligence-Corps", "air-Corps", "system-administrator"]), getLaucherById); 
route.post("/", authMiddleware, roleMiddleware(["intelligence-Corps", "system-administrator"]), addLaucher);
route.delete("/:id", authMiddleware, roleMiddleware(["intelligence-Corps", "system-administrator"]), deleteLaucher);
route.put("/:id", authMiddleware, roleMiddleware(["intelligence-Corps", "system-administrator"]), updateLaucher);


export default route;