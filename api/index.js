import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import listingRouter from './routes/listing.route.js'
import path from 'path';
dotenv.config();

const uri = process.env.MONGO_URI
mongoose
   .connect(uri).then(()=>{console.log('connected to MONGODB')}).catch((err)=>console.log(err))

   const __dirname = path.resolve();

const app = express()

app.listen(3000, ()=>{
   console.log('Server is running on PORT 3000!!!')
});


//PATH

app.get('/', (req, res) => {
   res.send({message: 'hello world'})
})

//allow app to use json file

app.use(express.json());

// use cookie parser

app.use(cookieParser());

//PATH use
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/listing', listingRouter);

app.use(express.static(path.join(__dirname, '/client/dist')))
app.get('*', (re, res) => {
   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})

//middle ware

app.use((err, req, res, next) => {
   const statusCode = err.statusCode || 500;
   const message = err.message || 'Internal Server Error';
   return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
   })
})

app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
   next();
 });
 