const mongoose = require('mongoose');
const validator = require("validator");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true, "username is required"],
        trim: true,
    },
    email:{
        type:String,
        required:[true,"email is required"],
        trim: true,
        lowercase: true,
        unique: true,
        validate: (newValue) => {
        if (validator.isEmail(newValue)) return true;
        return false;
      }
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    blogs:[{
        type:mongoose.Types.ObjectId,
        ref:"Blog",
    }]
},{timestamps:true})

const userModel = mongoose.model('User',userSchema);
module.exports = userModel;