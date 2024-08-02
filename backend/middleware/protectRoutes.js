import jwt from 'jsonwebtoken';
import { ENV_VARS } from '../config/envVars.js';

const protectedRoute = (req, res, next) => {
    console.log("protectedRoute middleware triggered");
    const token = req.cookies['jwt-inventory'] || req.header('Authorization')?.replace('Bearer ', '');
    console.log("Token found:", token);

    if (!token) {
        console.log("No token provided");
        return res.status(401).send({ error: 'Access denied, no token provided' });
    }

    try {
        const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);
        req.user = decoded;
        console.log("Token verified, user:", decoded);
        next();
    } catch (error) {
        console.log("Invalid token");
        res.status(400).send({ error: 'Invalid token' });
    }
};

export default protectedRoute;
