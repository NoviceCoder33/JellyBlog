const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

//router
const userRoutes = require('./routes/user.route');
const blogRoutes = require('./routes/blog.route');

//mongodb connection
connectDB();

const app = express();
//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));


//routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/blog',blogRoutes);

const PORT = process.env.PORT || 8080;

//listening to server
app.listen(PORT,()=>{
    console.log(`Listening to port ${PORT} on ${process.env.DEV_MODE}`);
});