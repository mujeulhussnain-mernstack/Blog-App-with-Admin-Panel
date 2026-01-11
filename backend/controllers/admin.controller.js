import jwt from "jsonwebtoken"
export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'All the fields are required.', success: false });
        }
        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            return res.status(400).json({ message: 'Invalid email and password.', success: false });
        }
        const admin = {
            name: process.env.ADMIN_NAME,
            email: process.env.ADMIN_EMAIL
        }
        const token = await jwt.sign({ adminId: process.env.ADMIN_EMAIL }, process.env.JWT_SECRET_KEY)
        return res.status(200).cookie('token', token, { httpOnly: true, sameSite: 'strict', maxAge: 1 * 24 * 60 * 60 * 1000 }).json({ message: `Welcome ${process.env.ADMIN_NAME}`, success: true, admin });
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