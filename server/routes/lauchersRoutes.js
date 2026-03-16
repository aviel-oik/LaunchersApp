import { Router } from "express";
import { getLauchers, getLaucherById, addLaucher, deleteLaucher, updateLaucher } from "../services/lauchersServices.js";

const route = Router();

route.get("/", getLauchers);
route.get("/:id", getLaucherById); 
route.post("/", addLaucher);
route.delete("/:id", deleteLaucher);
route.put("/:id", updateLaucher);

export default route;