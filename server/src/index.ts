import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import authRoutes from "./routes/auth.routes";

dotenv.config();

const app: Express = express();
const PORT: string | number = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: "http://localhost:5173" }));

app.use("/api/auth", authRoutes);

app.get("/", (req: Request, res: Response) => {
    res.send("Server is running");
});

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
