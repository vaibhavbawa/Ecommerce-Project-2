const app=require(".");
const { connectDb } = require("../src/config/db.js");

const PORT=5454;
app.listen(PORT, async()=>{
    await connectDb();
    console.log("ecommerce api listing on PORT : ",PORT);
})