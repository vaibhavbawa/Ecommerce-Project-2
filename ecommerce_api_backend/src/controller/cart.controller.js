const cartService = require("../services/cart.service.js");
// const cartModul = require("../models/cart.model.js")

const findUserCart = async(req,res)=>{
    const user = await req.user;
    console.log("userIddff");
    try {
        // console.log("dkfjdfkdjf");
        // console.log("cartddf",req.body.userId);
        const cart = await cartService.findUserCart(req.userId);
        return res.status(200).send(cart);
    } catch (error) {
        console.log("error1",error);
        return res.status(500).send({error:error.message})
    }
}

const addItemToCart = async(req,res)=>{
    try {
        const cartItem = await cartService.addCartItem(req.body.userId,req.body)
        console.log('res:',cartItem)
        return res.status(200).send(cartItem)
    } catch (error) {
        console.log("error",error);
        return res.status(500).send({error:error.message})
    }
}

module.exports={
    findUserCart,
    addItemToCart
}