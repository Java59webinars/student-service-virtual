import { registerUser, loginUser, validateCredentials } from '../services/authService.js';

export const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        validateCredentials(username, password);
        await registerUser(username, password);
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(error.code || 500).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        validateCredentials(username, password);
        const token = await loginUser(username, password);
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 3600000
        }).json({ message: 'Welcome back!' });
    } catch (error) {
        res.clearCookie('token', {
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
    });
        res.status(error.code || 500).json({ error: error.message });
    }
};
