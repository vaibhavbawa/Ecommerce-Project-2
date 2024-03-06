const Category = require("../models/category.model.js");
const Product =require("../models/product.model.js");
async function createProduct(reqData){
    let topLevel=await Category.findOne({name:reqData,topLevelCategory});

    if(!topLevel){
        topLevel=new Category({
            name:reqData.topLevel,
            level:1
        })
    }

    let secondLevel=await category.findOne({
        name:reqData.secondLevelCategory,
        parentCategory: topLevel._id,
    })

    if(!secondLevel){
        secondLevel=new Category({
            name:reqData.secondLevelCategory,
            patentCategory:topLevel._id,
            level:2
        })

    }

    let thiredLevel = await Category.findOne({
        name:reqData.thiredLevelCategory,
        parentCategory:secondLevel._id,
    })

    if(!thiredLevel){
        thiredLevel=new Category({
            name:reqData.thiredLevelCategory,
            parentCategory:secondLevel._id,
            level:3,
        })
    }

    const product = new Product({
        title:reqData.title,
        color:reqData.color,
        description:reqData.description,
        discoundedPrice:reqData.discoundedPrice,
        discountedPersent:reqData.discountedPersent,
        imageUrl:reqData.imageUrl,
        brand:reqData.brand,
        price:reqData.price,
        sizes:reqData.sizes,
        quantity:reqData.quantity,
        category:thiredLevel._id,
    })

    return await product.save();
}

async function deleteProduct(productId){
    const product = await findProductById(productId);

    await Product.findByIdAndDelete(productId);
    return "Product deleted Successfully";
}

async function updateProduct(productId,reqData){
    return await Product.findByIdAndUpdate(productId,reqData);
}


async function findProductById(id){
    const product = await Product.findById(id).populate("category").exec();

    if(!product){
        throw new Error("Product not found with id "+ id);
    }
    return product;
}


async function getAllProducts(reqQuery){
    let{category,color,sizes,minPrice,maxPrice,minDiscount,stock,sort,pageNumber,pageSize}=reqQuery

    pageSize=pageSize || 10;

    let Query = Product.find().populate("category");

    if(category){
        const existCategory=await Category.findOne({name:category});
        if(existCategory){
            Query=query.where("category").equals(existCategory._id);
        }else{
            return {content:[],curentPage:1,totalPages:0}
        }
    }

    if(color){
        const colorSet = new Set(color.split(",").map(color=>color.trm().toLowerCase()));

        const colorRegex=colorSet.size>0?new RegExp([...colorSet].join("|"),"i"): null;

        query.query.where("color").regex(colorRegex);
    }

    if(sizes){
        const sizesSet=new Set(sizes);
        query.query.where('sizes.name').in([...sizesSet]);
    }

    if(minPrice && maxPrice){
        quer=query.where('discoundedPrice').gte(minPrice).lte(maxPrice);
    }

    if(minDiscount){
        query=query.where('discountPersent').gt(minDiscount);
    }

    if(stock){
        if(stock=="in_stock"){
            query=query.where("quantity").gt(0);
        }else if(stock=="out_of_stock"){
            query=query.where("quantity").gt(1);
        }
    }

    if(sort){
        const sortDirection=sort==="price_hight"?-1:1;
        query=query.sort({discoundedPrice:sortDirection})
    }

    const totalProducts=await Product.countDocuments(query);
    const skip=(pageNumber-1)*pageSize;
    query=query.skip(skip).limit(pageSize);
    const products=await query.exec();
    const totalPages=Math.ceil(totalProducts/pageSize);
    return {content:products,curentPage:pageNumber,totalPages}

}

async function createMultipleProduct(products){
    for(let product of products){
        await createProduct(product);
    }
}

module.exports={
    createProduct,
    deleteProduct,
    updateProduct,
    getAllProducts,
    findProductById,
    createMultipleProduct
}
