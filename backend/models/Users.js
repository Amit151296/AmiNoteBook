import mongoose from 'mongoose';
const { Schema } = mongoose;

const usersSchema= new Schema({
    userName:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    date:{
        type:Date,
        default:Date.now,
    }

});

module.exports=mongoose.model("User",usersSchema)