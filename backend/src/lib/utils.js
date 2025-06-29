import jwt from "jsonwebtoken";


export const generatetokens = (userId , res) => {
    const token = jwt.sign({userId} , process.env.JWT_SECRET, {
        expiresIn: "30d"
    });

    res.cookie("jwt",token,{
        maxAge : 30*24*60*60*1000,
        httpOnly: true,
        secure:false, // Use secure cookies in production
        sameSite: "lax" // Helps prevent CSRF attacks
        

    })
    return token;
}