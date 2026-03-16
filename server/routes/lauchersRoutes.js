import { Router } from "express";

const route = Router();

route.get("/", getLauchers);

route.get("/id", getOneLaucher); // 

route.post("/", addLaucher);

route.delete("/:id", deleteLaucher);

export default route;