import { Schema , model } from "mongoose";

const userSchema = new Schema({
    name : {
        type : String,
        default : "-",
    },
    email: {
        type : String,
        unique : true,
        required : true,
    },
    password : {
        type : String,
        required : true,
    }, 
    mobile : {
        type: String,
        unique : true,
        required : true,
    },
    address : {
        type : String,
        required : true,
    },
    gender : {
        type : String,
        default : "preferd not to say"
    }

});

const User = model("User" , userSchema);

export default User ;
