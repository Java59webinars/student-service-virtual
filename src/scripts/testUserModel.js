import User from "../model/user.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
async function test(){
    await mongoose.connect(process.env.MONGO_URI, { dbName: 'java59' });
    const user = new User({username: 'testModelUserNew',
        password: '12345'});
    await user.save();
    await mongoose.disconnect();
}
test().catch(console.error);