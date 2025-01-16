import express, { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth.controller";
import protect from "./../middlewares/auth.middleware";
import { User } from "../types/user";

const router: Router = express.Router();

router.get("/profile", protect, async (req, res) => {
    try {
        const user = req.user as User;
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching profile" });
    }
});

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
