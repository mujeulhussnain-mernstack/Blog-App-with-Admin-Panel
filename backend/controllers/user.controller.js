import User from "../models/user.model.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
export const Register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(401).json({ message: 'All the fields are required.', success: false });
        }
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: 'Email already exist.', success: false });
        }
        const userName = await User.findOne({ username })
        if (userName) {
            return res.status(400).json({ message: 'Username not available.', success: false });
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        await User.create({
            username,
            email,
            password: hashedPassword,
            profilePicture: process.env.USER_IMAGE
        })
        return res.status(201).json({ message: 'Account created.', success: true });
    } catch (error) {
        console.log(error);
    }
}
export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({ message: 'All the fields are required.', success: false });
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: 'Invalid email and password.', success: false });
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(404).json({ message: 'Invalid email and password.', success: false });
        }
        const token = await jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1d' }
        )
        return res.status(200)
            .cookie('token', token, { httpOnly: true, sameSite: 'strict', maxAge: 1 * 24 * 60 * 60 * 1000 })
            .json({ message: `Welcome ${user.username}`, success: true, user });
    } catch (error) {
        console.log(error);
    }
}
export const Logout = async (_, res) => {
    try {
        return res.status(200).cookie('token', '', { maxAge: 0 }).json({
            message: 'Logged Out.',
            success: true
        });
    } catch (error) {
        console.log(error);
    }
}