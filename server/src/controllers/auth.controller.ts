import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user.model";

export const registerUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400).json({ message: "Please fill all fields" });
        return;
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username,
            email,
            password: hashedPassword,
        });

        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: "Server error", error });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
};
