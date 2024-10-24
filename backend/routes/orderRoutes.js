import express from "express"
import authMiddleware from "../middleware/auth.js"
import orderController from "../controllers/orderController.js";

const { placeOrder, verifyOrder } = orderController;
const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder)

export default orderRouter;