// const express = require("express");
import express from "express";
import dotenv from "dotenv";
import {connectDB} from "./lib/db.js";
import cookieParser from "cookie-parser";
import { generatetokens } from "./lib/utils.js";
import User from "./models/user.model.js";

import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth" , authRoutes)
app.use("/api/message" , messageRoutes);

app.listen(5001 , () => {
console.log("Server is running on port " + PORT);
connectDB()
});