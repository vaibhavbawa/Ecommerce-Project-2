const Cart = require("../models/cart.model");
const CartItem = require("../models/cartItem.model");
const Product = require("../models/product.model");

async function createCart(user){
    try {

        const cart=new Cart({user});
        const createdCart = await cart.save();
        return createdCart;
        
    } catch (error) {
        throw new Error(error.message);
    }
}

async function findUserCart(userId){
    // console.log("userId",userId);
    try {
        const cart =await Cart.findOne({user:userId});
        const cartItem=await CartItem.find({cart:cart._id}).populate("product");
              cart.cartItems = cartItem ;
        const totalPrice=0;
        const totalDiscountedPrice=0;
        const totalItem=0;
         
        for(let CartItem of cart.cartItems){
            totalPrice+=cartItems.price;
            totalDiscountedPrice+=CartItem.discountedPrice;
            totalItem+=cartItems.quantity;
        }

        cart.totalPrice=totalPrice;
        cart.totalItem=totalItem;
        cart.discounte=totalPrice.totalDiscountedPrice;

        return cart;
    } catch (error) {

        throw new Error(error.message)
        
    }
}

async function addCartItem(userId,req){
    // console.log("userId",userId)
    console.log("req",req)
    try {
        const cart=await Cart.findOne({user:userId});
        // console.log("cart",cart);
        const product = await Product.findById(req.productId);
        // console.log("product",product);
        const isPresent = await CartItem.findOne({cart:cart._id, product:product._id, userId});

        // console.log("isPresent",isPresent);
        if(!isPresent){
            const cartItem=new CartItem({
                product:product._id,
                userId,
                cart:cart._id,
                quantity:1,
                price:product.price,
                size:req.size,
                discountedPrice:product.discountedPrice,
            })

            const createdCartItem=await cartItem.save();
            cart.cartItems.push(createdCartItem);
            await cart.save();
            return "Item added to cart";
        }
    } catch (error) {
        console.log("error_500",error);
        throw new Error(error.message)
    }
}


module.exports={createCart,findUserCart,addCartItem};