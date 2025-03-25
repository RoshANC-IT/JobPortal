import jwt from 'jsonwebtoken';
const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
    // console.log("Token received:", token);  // Log token for debugging
    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }
    req.id = decoded.userId;
    next();
  } catch (error) {
    console.error("Authentication Error: ", error);
    return res.status(500).json({
      message: "Authentication failed, invalid or expired token",
      success: false,
    });
  }
};

export default isAuthenticated;

