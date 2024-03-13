const cartService = require("../services/cart.service.js");
// const cartModul = require("../models/cart.model.js")

const findUserCart = async(req,res)=>{
    const user = await req.user;
    console.log("userId",user);
    try {
        const cart = await cartService.findUserCart(user.id);
        return res.status(200).send(cart);
    } catch (error) {
        console.log("error1",error);
        return res.status(500).send({error:error.message})
    }
}

const addItemToCart = async(req,res)=>{
    // const user = await req.user;
    // console.log("User",user)
    try {
        const cartItem = await cartService.addCartItem(req.body.userId,req.body)
        return res.status(200).send(cartItem)
    } catch (error) {
        console.log("error",error);
        return res.status(500).send({error:error.message})
    }
}

// const addItemToCart = async (req, res) => {
//     try {
//         // Ensure req.user is defined
//         if (!req.user) {
//             return res.status(401).send({ error: 'User not authenticated' });
//         }

//         const user = req.user;
//         console.log("User", user);

//         const cartItem = await cartService.addCartItem(user.id, req.body);
//         return res.status(200).send(cartItem);
//     } catch (error) {
//         console.log("error", error);
//         return res.status(500).send({ error: error.message });
//     }
// }


module.exports={
    findUserCart,
    addItemToCart
}