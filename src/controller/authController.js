import user from "../model/user.js";
import User from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async(req,res,next)=>{
    const {username,password} = req.body;
    if(!username || !password){
        return res.status(400).json({error: 'Username and password are required'});
    }
    try {
        const existingUser = await user.findOne({username});
        if(existingUser){
            return res.status(409).json({error: 'Username already exist'});
        }
        const newUser = new User({username,password});
        await newUser.save();
        return res.status(201).json({message: 'User created successfully'});
    } catch (error) {
        console.error("Error while trying to create new user", error);
        return res.status(500).json({error: 'Error while trying to create new user'});
    }
}
export const login = async(req,res)=>{
    const {username,password} = req.body;
    if(!username || !password){
        return res.status(400).json({error: 'Username and password are required'});
    }
    try {
        const user = await User.findOne({username});
        if(!user) return res.status(401).json({error: 'Invalid credentials'});
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch) return res.status(400).json({error: 'Invalid credentials'});
        const token = jwt.sign({username},
            process.env.JWT_SECRET || 'mysecret', {expiresIn: '1h'});
        return res.cookie('token', token, {
            httpOnly: true,
            secure: false, //true only in production!!!
            sameSite: 'lax',
            maxAge: 3600000
        }).json({message: 'Welcome back!'});
    }catch (error) {
        return res.status(500).json({error: 'Error while trying to login'});
    }
}