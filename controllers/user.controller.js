const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');

//get all users
exports.getAllUsers=async(req,res)=>{
    try {
        const users = await userModel.find({})
        res.status(200).send({
            success:true,
            message:"All Users data",
            users,
            userCount: users.length,
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success:false,
            message:"Error in getting all Users",
            error
        })
    }
    
};

//create user register 
exports.registerController=async(req,res)=>{
    try {
        const {username,email,password} = req.body;
        if(!username || !email || !password){
            return res.status(400).send({
                success:false,
                message:'Please fill all the required fields'
            })
        }
        //existing user
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.status(401).send({
                success:false,
                message:"User already exists",

            })
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password,10);

        //new user
        const user = new userModel({username,email,password: hashedPassword})
        await user.save();
        return res.status(201).send({
            success:true,
            message:"New User Created",
            user
        })
        
    } catch (error) {
        console.log(error);
        res.send(500).send({
            message:'Error in Register user',
            success: false,
            error
        })
    }
};

//user login
exports.loginController=async(req,res)=>{
    try {
        const {email,password}= req.body;
        if(!email || !password){
            return res.status(401).send({
                success:false,
                message:'Please provide email and password',
            })
        }
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(200).send({
                success:false,
                message:'Email is not registered',
            })
        }

        const isPasswordMatch = await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            return res.status(401).send({
                success:false,
                message:'Invalid Email or Password',
            })
        }
       return res.status(200).send({
            success:true,
            message:'Login Successfully',
            user
       })

    } catch (error) {
        console.log(error);
        res.send(500).send({
            message:'Error in user Login',
            success: false,
            error
        })
    }
};