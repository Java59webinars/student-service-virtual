import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findUserByUsername, saveUser } from '../repository/userRepository.js';
import logger from "../logger/logger.js";
import accessControl from "../config/accessControl.js";

export function validateCredentials(username, password) {
    if (!username || !password) {
        const error = new Error('Username and password are required');
        error.code = 400;
        throw error;
    }
}

export async function registerUser(username, password) {
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
        const error = new Error('Username already exists');
        error.code = 409;
        throw error;
    }

    await saveUser({ username, password });
}

export async function loginUser(username, password) {
    function validateUser(victim) {
        if (!victim) {
            const error = new Error('Invalid credentials');
            error.code = 401;
            throw error;
        }
    }
    const user = await findUserByUsername(username);
    validateUser(user);
    const match = await bcrypt.compare(password, user.password);
    validateUser(match);
    logger.info('loginUser', user);
    return jwt.sign({ username: user.username, roles:user.roles }, process.env.JWT_SECRET || 'mysecret', {
        expiresIn: '1h'
    });
}

export const authenticateToken = (req,res,next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.status(401).json({error: 'No token provided'});
    }
    jwt.verify(token, process.env.JWT_SECRET || 'mysecret',
        (err,user) => {
        if(err){
            return res.status(403).json({error: 'Invalid token'});
        }
        req.user = user;
        next();
    })
}

export const checkPermissions = (action, resource) => {
    return (req, res, next) => {
        const roles = req.user?.roles ||[];
        const permission = roles.some(role =>
            accessControl.can(role)[action](resource).granted);
        if (!permission) {
            return res.status(403).json({error: 'Permission denied'});
        }
        next();
    }
}