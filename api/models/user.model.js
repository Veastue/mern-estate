import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    avatar: {type: String, default: "https://www.bing.com/th/id/OIP.rs4RRfLTSA44vJRDpJmMBAHaHi?w=191&h=195&c=7&r=0&o=5&pid=1.7"},
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;