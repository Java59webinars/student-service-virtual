import mongoose, {Schema} from "mongoose";
import Joi from "joi";
import bcrypt from "bcrypt";
import {VALID_ROLES} from "../config/accessControl.js";


const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        roles: {
            type: [String],
            enum: VALID_ROLES,
            default: ['USER'],
        }
    }
)
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
const User = mongoose.model('User', userSchema);
export default User;
