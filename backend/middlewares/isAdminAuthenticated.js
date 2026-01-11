import jwt from 'jsonwebtoken'
const isAdminAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(404).json({ message: 'Need to login.', success: false });
        }
        const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY)
        if (!decode) {
            return res.status(400).json({ message: 'Invalid token.', success: false });
        }
        req.admin = decode.adminId;
        next();
    } catch (error) {
        console.log(error)
    }
}

export default isAdminAuthenticated