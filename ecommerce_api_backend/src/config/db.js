const mongoose = require("mongoose")


const mongodbUrl='mongodb+srv://vaibhavbawamq:eBy80YpMq8QxC0qC@cluster0.zjgp2q0.mongodb.net/?retryWrites=true&w=majority&appName=vk'

const connectDb=()=>{
    return mongoose.connect(mongodbUrl);
}

module.exports={connectDb}