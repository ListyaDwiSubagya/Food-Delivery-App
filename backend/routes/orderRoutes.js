import express from "express"
import authMiddleware from "../middleware/auth.js"
import orderController from "../controllers/orderController.js";

const { placeOrder, verifyOrder, userOrders, listOrders, updateStatus } = orderController;
const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder)
orderRouter.post("/userorders", authMiddleware, userOrders)
orderRouter.get("/list", listOrders)
orderRouter.post("/status", updateStatus)

export default orderRouter;