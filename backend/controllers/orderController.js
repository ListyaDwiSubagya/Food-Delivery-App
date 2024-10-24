import orderModels from "../models/orderModels.js";
import userModels from "../models/userModels.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing user order for frontend
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173"; // Pastikan URL frontend benar

  try {
    // Membuat order baru
    const newOrder = new orderModels({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    // Simpan order dan kosongkan cart user
    await newOrder.save();
    await userModels.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // Membuat line items untuk Stripe checkout session
    const line_item = req.body.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // Mengubah ke cents
      },
      quantity: item.quantity,
    }));

    // Tambahkan biaya pengiriman
    line_item.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 200, // Delivery charge 2 USD = 200 cents
      },
      quantity: 1,
    });

    // Buat sesi Stripe
    const session = await stripe.checkout.sessions.create({
      line_items: line_item,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    // Kirim URL sesi Stripe ke frontend
    res.json({ success: true, session_url: session.url });

  } catch (error) {
    // Tampilkan pesan kesalahan yang lebih detail
    console.error("Error during Stripe session creation:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

const verifyOrder = async (req, res) => {
  const {orderId, success} = req.body;
  try {
    if (success === "true") {
      await orderModels.findByIdAndUpdate(orderId, {payment:true});
      res.json({success:true, message:"Paid"})
    } else {
      await orderModels.findByIdAndDelete(orderId);
      res.json({success:false, message:"Not Paid"})
    }
  } catch (error) {
    console.log(error);
    res.json({success:false, message:"Error"})
  }
}

export default {placeOrder, verifyOrder};
