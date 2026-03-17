import Laucher from "../models/laucher.js";

export async function getLauchers(req,res){
    try {
        const lauchers = await Laucher.find()
        res.json(lauchers)
    } 
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export async function getLaucherById(req,res){
    if (!req.params.id) 
        return res.status(400).json({ message: "ID required" });
    try {
        const laucher = await Laucher.findById(req.params.id)
        if (!laucher) 
            return res.status(404).json({ message: "Laucher with this id not found" });
        res.json(laucher)
    } 
    catch (err) {
        res.status(500).json({ error: err.message })
    }  
}

export async function addLaucher(req,res){
    if (!req.body.laucherName || !req.body.rocketType || !req.body.latitude || !req.body.longitude || !req.body.city)
        return res.status(400).json({ message: "miss required fields" });
    try {
        await Laucher.create(req.body) 
        res.json({message: "laucher added suceffuly"})
    } 
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export async function deleteLaucher(req,res){
    if (!req.params.id) 
        return res.status(400).json({ message: "ID required" });
    try {
        await Laucher.findByIdAndDelete(req.params.id)
        res.json({message: "laucher deleted successfully"})
    } 
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export async function updateLaucher(req,res){
    if (!req.params.id) 
        return res.status(400).json({ message: "ID required" });
    try {
        await Laucher.findByIdAndUpdate(req.params.id, req.body)
        res.json({message: "laucher updated successfully"})
    } 
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}
