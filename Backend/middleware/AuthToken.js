import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const verifyUser = (req, res, next) => {
  const token = req.cookies.jwt; // Access the token from cookies
  console.log('token in verifyUser:', token);

  if (!token) {
    return res.status(401).json({ success: false, error: 'Token not available' });
  }

  try {
    // Verify the token using JWT_SECRET from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // Assign userId from the token to the request object
    next(); // Move to the next middleware or route
  } catch (err) {
    console.error('Token verification error:', err);
    return res.status(401).json({ success: false, error: 'Invalid token' });
  }
};

export default verifyUser;
