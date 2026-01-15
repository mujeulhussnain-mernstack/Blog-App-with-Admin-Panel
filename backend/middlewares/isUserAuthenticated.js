import jwt from 'jsonwebtoken';

const isUserAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        
        if (!token) {
            return res.status(401).json({ 
                message: 'Authentication required.', 
                success: false 
            });
        }
        
        const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        if (!decoded || !decoded.userId) {
            return res.status(401).json({ 
                message: 'Invalid token.', 
                success: false 
            });
        }
        
        req.id = decoded.userId;
        next();
        
    } catch (error) {
        console.error('Auth error:', error.message);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                message: 'Session expired.', 
                success: false 
            });
        }
        
        return res.status(401).json({ 
            message: 'Authentication failed.', 
            success: false 
        });
    }
}

export default isUserAuthenticated;