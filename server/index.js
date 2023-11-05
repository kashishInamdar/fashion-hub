import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

import User from "./models/User.js";
import Product from "./models/Product.js";


const app = express();
app.use(express.json());

// connect to Database
const connectDB = async ()=>{
    const conn = mongoose.connect(process.env.MONGOODB_URI);
    if(conn){
        console.log("Database Connected Successfully");
    }
}
connectDB();

// POST /SignUp 
app.post("/signup", async (req ,res)=>{
    const { name , password , email , mobile , address , gender}= req.body

    const user = new User({
        name : name , 
        password : password , 
        email : email  , 
        mobile :mobile, 
        address  : address, 
        gender : gender,
    });
    try{
        const savedUser = await user.save();

    res.json({
        success : true,
        data : savedUser,
        message : " SignUP Successfull  "
    })
    }
    catch(err){
        res.json({
            success : false,
            message : err.message,
        })
    }
})
// POST /Login
app.post("/login" , async (req , res)=>{
    const {email , password} = req.body;
    if(!email || !password){
        return res.json({
            success : false , 
            message : "Please provide email and password"
        })
    }

    const user = await User.findOne({
        email : email,
        password : password
    }).select("name email mobile")

    if(user){
        return res.json({
            success : true,
            data : user,
            message : "Login Successful"
        });
    }
    else{
        return res.json({
            success : false , 
            message : "Invalide Credentials"
        });
    }
})

// GET /products
app.get("/products", async (req , res)=>{
    const products = await Product.find();

    res.json({
        success : true , 
        data : products,
        message : "succsessfully find products "
    })
    

})

// Post /product

app.post("/product", async (req , res)=>{
    const {name , image, description , price, category , brand } = req.body;
    try{
        const product = new Product({
            name,
            image,
            description,
            price,
            category,
            brand,
        }) ;
    
        const savedProduct = await product.save();

        res.json({
            success : true,
            data : savedProduct,
            massage : " Succrssfully add Product "
        })


    }
    catch(err){
        return res.json({
            success : false,
            message : err.message,
        })
    }
   

});

// GET /product/:id

app.get("/product/:id" , async (req , res)=>{
    const {id} = req.params;

    try{
         const product = await Product.findById(id);

    res.json({
        success : true , 
        data : product,
        message : "Product find successfully"
    })
    }
    catch(err){
      res.json({
        success : false,
        message : err.message
      })
    }
   
})
 
// Delete /product/:id 
app.delete("/product/:id" , async (req ,res)=>{
    const {id} = req.params;

    await Product.deleteOne({_id : id})

    res.json({
        success : true , 
        massage : "Product Deleted"
    })
})

// Put /prosuct/:id
app.put("/product/:id" , async (req , res)=>{
    const {id} = req.params ;
    const {
        name ,
        image,
        price,
        description,
        category,
        brand,
    } = req.body ; 
    

    try {
        await Product.updateOne({_id : id} , {$set : {
            name : name   ,
           image : image,
           price : price,
           description : description,
           category : category,
           brand : brand , 
       }});
   
       const updatedProduct = await Product.findById(id);
   
       res.json({
           success : true , 
           data : updatedProduct , 
           message : " Product Update Successfully "
       });
    } catch (err) {
        res.json({
            success : false,
            message : err.message,
        })
    }

})

// Get /products/search?query=Sam

app.get("/products/search" , async (req , res)=>{
    const {q} = req.query;
    const products = await Product.find({name : {$regex : q , $options : "i" }});

    res.json({
        success: true,
        data : products,
        massage: "Successfully Find Products ",
    })
});

const PORT = process.env.PORT || 8080; 

app.listen(PORT , ()=>{
    console.log(`Server is Running on Port : ${PORT}`)
})