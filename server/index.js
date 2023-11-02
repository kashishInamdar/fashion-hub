import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

import User from "./models/User.js";
console.log(`User : ${User}`)

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
const PORT = process.env.PORT || 5000; 

app.listen(PORT , ()=>{
    console.log(`Server is Running on Port : ${PORT}`)
})