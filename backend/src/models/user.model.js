import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        email: {
            type : String,
            required: true,
            unique: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        profilepic : {
            type : String,
            default : "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;