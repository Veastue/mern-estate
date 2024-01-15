import dotenv from 'dotenv';
dotenv.config();

// rest of your code

import express from 'express';
import mongoose from 'mongoose';


const uri = process.env.MONGO_URI
mongoose
   .connect(uri).then(()=>{console.log('connected to MONGODB')}).catch((err)=>console.log(err))


const app = express()

app.listen(3000, ()=>{
   console.log('Server is running on PORT 3000!!!')
});