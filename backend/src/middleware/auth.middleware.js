import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { generatetokens } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";
import cookieParser from "cookie-parser";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

                console.log("JWT from cookies:", req.cookies.jwt);


        if (!token) {
            return res.status(401).json({
                message: "Unauthorized: No token provided"});
        }

        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({
                message: "Unauthorized: Invalid token"});
        }

        const user = await User.findById(decoded.userId).select("-password");
        console.log("Found user:", user); // Add this
        console.log("Decoded userId:", decoded.userId); // Add this
        if (!user) {
            return res.status(404).json({
                message: "User not found"});
        }
          req.user = user;
        next();   
     
    } catch (error) {
        console.log("Error in protectRoute middleware:", error);
        res.status(401).json({
            message: "Internal server error"
        });
    }
}