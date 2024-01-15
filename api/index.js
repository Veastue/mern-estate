import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'


const uri = process.env.MONGO_URI
mongoose
   .connect(uri).then(()=>{console.log('connected to MONGODB')}).catch((err)=>console.log(err))


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

//PATH use
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);