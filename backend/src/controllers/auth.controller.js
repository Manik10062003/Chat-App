import User from "../models/user.model.js/";
import bcrypt from "bcryptjs";
import { generatetokens } from "../lib/utils.js/";
export const signup =  async (req,res) => {
    const {fullName, email, password, profilepic} = req.body;
    try {
            if(!fullName || !email || !password) {
            return res.status(400).send("All fields are required");
         }
         if(!email.includes("@")) {
            return res.status(400).send("Invalid email format");
         }

         if(password.length < 6) {
            return res.status(400).send("Password must be at least 6 characters long");
         }

         const user = await User.findOne({email})

            if(user) {
                return res.status(400).send("User already exists with this email");
            }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = new User({
                fullName,
                email,
                password: hashedPassword,
                profilepic
            });

            if(newUser){
                generatetokens(newUser._id, res);
                await newUser.save();
                return res.status(201).send("User created successfully");
            }else{
                return res.status(400).send("Failed to create user");
            }
    } catch (error) {
        
    }
    res.send("signup page");
}
export const login = (req,res) => {
    res.send("login page");
}
export const logout = (req,res) => {
    res.send("logout page");
}