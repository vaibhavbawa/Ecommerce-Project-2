const express = require("express");
const router = express.Router();

const orderController = require("../controller/order.controller.js");
const {authenticate} = require("../middleware/authenticate.js");



router.post("/",orderController.createOrder);
router.get("/user",orderController.orderHistory);
router.get("/:id",orderController.findOrderById);



module.exports=router;