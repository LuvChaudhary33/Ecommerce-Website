import express from "express";
import userRoute from "./routes/user.js"
import productRoute from "./routes/product.js"
import orderRoute from "./routes/order.js"
import paymentRoute from "./routes/payment.js"
import dashboardRoute from "./routes/stats.js"
import { connectDB } from "./utils/features.js";
import NodeCache from "node-cache";
import { errorMiddleware } from "./middlewares/error.js";
import {config} from "dotenv"
import Stripe from "stripe";
import cors from "cors";

config({
    path:"./.env"
})
const port=process.env.PORT || 4000;
const stripeKey=process.env.STRIPE_KEY || ""; 

connectDB(process.env.MONGO_URI || "");

export const stripe=new Stripe(stripeKey);
export const myCache=new NodeCache();

const app=express();
app.use(express.json());
app.use(cors());

app.get("/", (req,res) =>{
    res.send("API Working with /api/v1")
})

app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/dashboard", dashboardRoute);

app.use("/uploads", express.static("uploads"))
app.use(errorMiddleware)

app.listen(port, () => {
    console.log(`Server is working on localhost:${port}`)
})