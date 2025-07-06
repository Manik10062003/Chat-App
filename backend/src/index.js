// const express = require("express");
import express from "express";
import dotenv from "dotenv";
import {connectDB} from "./lib/db.js";
import cookieParser from "cookie-parser";
import { generatetokens } from "./lib/utils.js";
import User from "./models/user.model.js";
import cors from "cors";
import {app , server } from "./lib/socket.js";
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js";

dotenv.config();
const PORT = process.env.PORT || 5001;

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());



app.use("/api/auth" , authRoutes)
app.use("/api/messages" , messageRoutes);

server.listen(5001 , () => {
console.log("Server is running on port " + PORT);
connectDB()
});