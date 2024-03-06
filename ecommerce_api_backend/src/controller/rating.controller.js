const ratingService = require("../services/rating.service.js")

const createRating = async(res,req)=>{
    const user=req.user;

    try {
        const rating = await ratingService.createRating(req.body,user)
        return res.status(201).send(rating);
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

const getAllRating = async(res,req)=>{
    const user=req.user;
    const productId=req.params.productId;

    try {
        const rating = await ratingService.getAllRating(productId)
        return res.status(201).send(rating);
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

module.exports={
    createRating,
    getAllRating
}