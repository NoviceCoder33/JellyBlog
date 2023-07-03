const mongoose = require('mongoose');
const blogModel = require('../models/blog.model');
const userModel = require('../models/user.model');

exports.getAllBlogsController=async(req,res)=>{
 try {
    const blogs = await blogModel.find({}).populate("user");
    if(!blogs){
        return res.status(200).send({
            success:false,
            message:'No Blogs found',
        })
    }
    return res.status(200).send({
        success:true,
        message:'All blogs list',
        blogCount:blogs.length,
        blogs,
    });
 } catch (error) {
    return res.status(500).send({
        success:false,
        message:'Error in getting blogs',
        error
    })
 }
};

exports.getBlogByIdController=async(req,res)=>{
    try {
        const {id}= req.params;
        const blog = await blogModel.findById(id);
        if(!blog){
        return res.status(404).send({
            success:false,
            message:'Blog not found with this Id',
        });
        }

        return res.status(200).send({
            success:true,
            message:'Fetched blog by Id',
            blog,
        });
        
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success:false,
            message:'Error in getting blog',
            error
        })
        
    }
 
};

exports.createBlogController=async(req,res)=>{
    try {
        const {title,description,image ,user} = req.body;
        if(!title || !description || !image ||!user){
            return res.status(400).send({
                success:false,
                message:'PLease provide all fields for creating blog',
                error
            });
        }
        const existingUser = await userModel.findById(user);
        if(!existingUser){
            return res.status(400).send({
                success:false,
                message:'Unable to find user',
                error
            })
        }
        const newBlog = new blogModel({title,description,image,user});
        const session = await mongoose.startSession();
        session.startTransaction();
        await newBlog.save({session});
        existingUser.blogs.push(newBlog);
        await existingUser.save({session});
        await session.commitTransaction();
        await newBlog.save();
        return res.status(201).send({
            success:true,
            message:'Blog created!',
            newBlog,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success:false,
            message:'Error while creating blogs',
            error
        })
    }

};

exports.updateBlogController=async(req,res)=>{
    try {
        const {id}= req.params;
        const {title,description,image}= req.body;
        const blog =await blogModel.findByIdAndUpdate(id,{...req.body},{new:true})
        return res.status(200).send({
            success:true,
            message:"Blog updated!",
            blog,
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success:false,
            message:'Error in updating blog',
            error
        })
    }

};

exports.deleteBlogController=async(req,res)=>{
    try {
        const blog = await blogModel.findOneAndDelete(req.params.id).populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save();
        return res.status(200).send({
            success:true,
            message:"Blog deleted!",
        })
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success:false,
            message:'Error in deleting blog',
            error
        })
    }

};

exports.userBlogController=async(req,res)=>{
try {
    const userBlog = await userModel.findById(req.params.id).populate("blogs");
    if(!userBlog){
        return res.status(404).send({
            success:false,
            message:"blogs not found with this id",
        });
    }
        return res.status(200).send({
            success:true,
            message:"User blog",
            userBlog,
        });
    
} catch (error) {
    console.log(error);
        return res.status(400).send({
            success:false,
            message:'Error in getting user blog',
            error
        })
}
};