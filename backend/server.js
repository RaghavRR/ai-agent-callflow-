import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import callRoutes from "./routes/callRoutes.js";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://89.116.121.214", "http://localhost:8000"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 


connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/call", callRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT,() => console.log(`Server running on ${PORT}`));
