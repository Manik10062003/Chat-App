import User from "../models/user.model.js/";
import bcrypt from "bcryptjs";
import { generatetokens } from "../lib/utils.js/";
import cloudinary from "../lib/cloudinary.js";
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
export const login = async (req,res) => {

    const {email, password} = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send("User not found");
        }
        const ispasswordCorrect = await bcrypt.compare(password , user.password)
        if (!ispasswordCorrect) {
            return res.status(400).send("Invalid password");
        }

        generatetokens(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilepic: user.profilepic,
        })


    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).send("Internal server error");
        
    }

}
export const logout = (req,res) => {
    try {
        res.cookie("jwt" , "" , {maxAge : 0});
        res.status(200).json({message : "Logged out successfully"});

    } catch (error) {
        console.error("Error during logout:", error);
        return res.status(500).send("Internal server error");
    }
}
export const updateProfile = async (req, res) => {
    try {
        const {profilepic, fullName} = req.body;
        const userId = req.user._id;
        if (!profilepic) {
            return res.status(400).send("All fields are required");
        }
        const uploadresponse = await cloudinary.uploader.upload(profilepic);
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                profilepic: uploadresponse.secure_url,
                
            },
            { new: true }
        );
    } catch (error) {
        
    }

};

export const checkAuth = (req , res) => {
    try {
        res.status(200).json(req.user);

    } catch (error) {
        console.log("Error during authentication check:", error);
        return res.status(500).send("Internal server error");
    }
}