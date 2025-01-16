import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { User } from "../types/user";

const protect = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
        res.status(401).json({ message: "No token, authorization denied" });
        return;
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET || "secret_key"
        ) as User;
        
        req.user = decoded;

        next();
    } catch (error) {
        res.status(401).json({ message: "Token is not valid" });
    }
};

export default protect;
