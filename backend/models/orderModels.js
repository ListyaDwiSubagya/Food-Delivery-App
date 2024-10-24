import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
    userId:{type:String, require:true},
    items:{type:Array, require:true},
    amount:{type:Number, require:true},
    addres:{type:Object, require:true},
    status:{type:String, default:"Food Processing"},
    date:{type:Date, default:Date.now()},
    payment:{type:Boolean, default:false},
})

const orderModels = mongoose.order || mongoose.model("order", orderSchema);

export default orderModels;