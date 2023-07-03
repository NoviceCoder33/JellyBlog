const mongoose = require('mongoose');
const connectDB = async()=>{
    try{
     await mongoose.connect(process.env.MONGODB_URI)
     console.log("connected to MongoDB Database")
    }catch(error){
      console.log(`MongoDB Connection error ${error}`)
    }
};
module.exports = connectDB;