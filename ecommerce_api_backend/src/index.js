const express = require("express");

const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    return res.status(200).send({message: "Welcome to ecommere api - node", status:true})
})

const authRouters = require("./routs/auth.routs.js");
app.use("/auth",authRouters);

const userRouters = require("./routs/user.route.js");
app.use("/api/users",userRouters);

const productRouter = require("./routs/product.routes.js");
app.use("/api/products",productRouter);

const adminProductrouter = require("./routs/adminProduct.routes.js");
app.use("/api/admin/products",adminProductrouter);

const cartRouter = require("./routs/cart.routs.js");
app.use("/api/cart",cartRouter);

const cartItemRouter = require("./routs/cartItem.routes.js");
app.use("/api/cart_items",cartItemRouter);

const orderRouter = require("./routs/order.router.js")
app.use("/api/orders",orderRouter);

const adminOrderRouter = require("./routs/adminOrders.routes.js");
app.use("/api/admin/orders",adminOrderRouter)

const reviewRouter = require("./routs/review.routes.js");
app.use("/api/reviews",reviewRouter);

const ratingRouter = require("./routs/rating.routes.js");
app.use("/api/ratings",ratingRouter);

module.exports = app;