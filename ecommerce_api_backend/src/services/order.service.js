const OrderItem = require("../models/orderItems");
const cartService = require("../services/cart.service");

async function createOrder(user,shippAddress){
    let address;

    if(shippAddress._id){
        let existAddress = await address.findById(shippAddress._id);
        address=existAddress;
    }else{
        address = new address(shippAddress);
        address.user=user;
        await address.save();

        user.address.push(address);
        await user.save();
    }

    const cart = await cartService.findUserCart(user._id);
    const orderItems=[];

    for(const item of cart.cartItems){
        const orderItem=new OrderItem({
            price:item.price,
            product:item.product,
            quantity:item.quantity,
            size:item.sizw,
            userId:item.userId,
            discountedPrice:item.discountedPrice,
        })

        const createdOrderItem=await  orderItem.save();
        orderItem.push(createdOrderItem);
    }

    const createdOrder=new Order({
        user,
        orderItem,
        totalPrice:cart.totalPrice,
        totalDiscountedPrice:cart.totalDiscountedPrice,
        discounted:cart.discounte,
        totalItem:cart.totalItem,
        shippAddress:address,
    })

    const savedOrder=await createdOrder.save();

    return savedOrder;

}

async function placeOrder(orderId){

    const order=await findOrderById(orderId);

    order.orderStatus="PLACED";
    order.paymentDetails.staus="COMPLETED";

    return await order.save();

}


async function confiredOrder(orderId){

    const order=await findOrderById(orderId);

    order.orderStatus="CONFIRMED";

    return await order.save();

}

async function shipdOrder(orderId){

    const order=await findOrderById(orderId);

    order.orderStatus="SHIPPED";

    return await order.save();

}

async function deliverOrder(orderId){

    const order=await findOrderById(orderId);

    order.orderStatus="DELIVERED";

    return await order.save();

}

async function cancelOrder(orderId){

    const order=await findOrderById(orderId);

    order.orderStatus="CANCELLED";

    return await order.save();

}

async function findOrderById(orderId){

    const order=await Order.findById(orderId)
    .populate('user')
    .populate({path:"orderItem",populate:{path:"product"}})
    .populate('shippingAddress')

    return order

}

async function usersOrderHistory(userId){
    try {
        const orders=await Order.find({user:userId,orderStatus:"PLACED"})
        .populate({path:"orderItems",populate:{path:"product"}}).lean()
        return orders;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function getAllOrders(){
    return await Order.find()
    .populate({path:"orderItems",populate:{path:"product"}}).lean()
}

async function deleteOrder(orderId){
    const order=await findOrderById(orderId);
    await Order.findByIdAndDelete(order._id)
}


module.exports={
    createOrder,
    confiredOrder,
    shipdOrder,
    deliverOrder,
    cancelOrder,
    findOrderById,
    usersOrderHistory,
    getAllOrders,
    deleteOrder,
    placeOrder
}