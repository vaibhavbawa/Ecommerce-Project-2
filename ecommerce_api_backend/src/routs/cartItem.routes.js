const express = require("express");
const router = express.Router();

const cartItemController = require("../controller/cartItem.controller.js");
const {authenticate}  = require("../middleware/authenticate.js");


router.put("/:id",cartItemController.updateCartItem);
router.delete("/:id",cartItemController.removeCartItem);


module.exports=router;