const express = require('express');
const { getAllBlogsController, getBlogByIdController, createBlogController, updateBlogController, deleteBlogController, userBlogController } = require('../controllers/blog.controller');
const router = express.Router();

//routes
//get all blogs
router.get('/blogs',getAllBlogsController);

//get single blog
router.get('/get-blog/:id',getBlogByIdController);

//create blogs
router.post('/create-blog',createBlogController);

//update blogs
router.put('/update-blog/:id',updateBlogController);

//delete blogs
router.delete('/delete-blog/:id',deleteBlogController);

//userblogs
router.get('/user-blogs/:id',userBlogController);

module.exports = router;