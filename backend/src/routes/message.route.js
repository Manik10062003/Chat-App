import express from "express";
import { protectRoute } from "../middleware/auth.middleware";
const router = express.Router();

router.get("/users" , protectRoute , getUsersForSidebar);
router.get("/:id",protectRoute, getMessages);

request.post("/send/:id" , protectroute , sendmessage);
export default router;