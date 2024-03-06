const reviewServie=require("../services/review.service.js");

const createReview = async(res,req)=>{
    const user=req.user;

    try {
        const review = await reviewServie.createReview(req.body,user);
        return res.status(201).send(review);
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

const getAllReview = async(res,req)=>{
    const user=req.user;
    const productId=req.params.productId;

    try {
        const reviews = await reviewServie.getAllReview(productId)
        return res.status(201).send(reviews);
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

module.exports={
    createReview,
    getAllReview
}