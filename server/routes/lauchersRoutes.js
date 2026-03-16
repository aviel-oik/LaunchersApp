import { Router } from "express";
import Laucher from "../models/laucher.js";

const route = Router();

route.get("/", async (req, res) => {
    const lauchers = await Laucher.find()
    res.json(lauchers)
});

route.get("/id", () => {

}); // 

route.post("/", async (req, res) => {
    const newLaucher =  Laucher.create(req.body) //
    res.json({message: "laucher added suceffuly"})
});

route.delete("/:id", () => {

});

export default route;