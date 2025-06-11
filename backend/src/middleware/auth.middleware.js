const jwt = require('jsonwebtoken')


exports.isValidUser = (req, res, next) => {

    const authHeader = req.headers.authorization;

 
    if (!authHeader) {
        return res.status(401).json({ 
            message: "Authorization header missing. Please login."
        });
    }

    const tokenParts = authHeader.split(' ');
    let token;
  
    if (tokenParts.length === 2 && tokenParts[0] === 'Bearer') {
        token = tokenParts[1]; 
    } else {
        return res.status(401).json({
            message: "Invalid Authorization header format. Expected 'Bearer <token>'."
        });
    }

 
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user; 

        next(); 
    } catch (err) {
        
        console.error("JWT verification error:", err.message); 

        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: "Token expired. Please login again.",
                error: err.name 
            });
        } else if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({
                message: "Invalid token. Please login again.",
                error: err.name 
            });
        } else {
            
            return res.status(500).json({ 
                message: "Failed to authenticate token.",
                error: err.message 
            });
        }
    }
};
    
    
