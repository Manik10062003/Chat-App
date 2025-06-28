import User from "../models/user.model.js";
import Message from "../models/message.model.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggeduserId = req.user._id; // Assuming req.user is set by the protectRoute middleware
        const filteredusers = await User.find({ _id: { $ne: loggeduserId } }).select("-password");
        
        res.status(200).json(filteredusers);
    } catch (error) {
        console.error("Error fetching users for sidebar:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getMessages = async (req, res) => {
    try {
        const {id:usertochatid} = req.params;
        const myid = req.user._id; // Assuming req.user is set by the protectRoute middleware
        const messages = await Message.find({
            $or: [
                { senderId: myid, recieverId: usertochatid },
                { senderId: usertochatid, recieverId: myid }
            ]
        }).sort({ createdAt: 1 });

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in messages" , error);
        res.status(500).json({message: "Internal server error"});

    }

}   

export const sendMessage = async (req, res) => {
    try {
        const { text , image} = req.body;
        const {id: recieverId} = req.params;
        const senderId = req.user._id; 

        let imageurl;
        if(image){
            const uploadresponse = await cloudinary.uploader.upload(image);
            imageurl = uploadresponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            recieverId,
            text,
            image: imageurl
        });
        await newMessage.save();

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error sending message:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}