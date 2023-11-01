import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

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

const PORT = process.env.PORT || 5000; 

app.listen(PORT , ()=>{
    console.log(`Server is Running on Port : ${PORT}`)
})

