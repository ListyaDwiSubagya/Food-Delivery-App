import foodModel from "../models/foodModels.js";
import fs from 'fs';

// add food item
const addFood = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Image file is required" });
        }

        const { name, description, price, category } = req.body;
        if (!name || !description || !price || !category) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        let image_filename = req.file.filename;

        const food = new foodModel({
            name,
            description,
            price,
            category,
            image: image_filename
        });

        await food.save();
        res.json({ success: true, message: "Food added successfully" });
    } catch (error) {
        console.error(error);
        // Delete the uploaded image file if the operation fails
        if (req.file) {
            fs.unlink(`path/to/uploads/${req.file.filename}`, (err) => {
                if (err) console.error("Error deleting file:", err);
            });
        }
        res.status(500).json({ success: false, message: "An error occurred while adding food" });
    }
};

// all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({success:true, data:foods})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"error"})
        
    }
}

// remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, ()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true, message:"Food Removed"})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

export { addFood, listFood, removeFood };
