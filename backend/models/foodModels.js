import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: [0, 'Price must be a positive number'] },
    image: { type: String, required: true },
    category: { type: String, required: true, default: 'Uncategorized' }
}, { timestamps: true });

const foodModel = mongoose.models.food || mongoose.model("food", foodSchema);

export default foodModel;
