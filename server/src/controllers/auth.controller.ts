import { Request, Response } from "express";
import jwt from "jsonwebtoken";
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
            res.status(500).json({ message: `Server error: ${error.message}` });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: "Please provide email and password" });
        return;
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }

        const token = jwt.sign(
            {
                id: user._id,
            },
            process.env.JWT_SECRET || "secret_key",
            { expiresIn: "1h" }
        );

        res.json({ token });
        
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: `Server error: ${error.message}` });
        } else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
};
