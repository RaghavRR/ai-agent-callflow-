import express from "express";
import jwt from "jsonwebtoken";
import axios from "axios";
import SingleCall from "../models/SingleCall.js";
import BulkCall from "../models/BulkCall.js";
import User from "../models/TempUser.js";
import { callPhoneNumber } from "../utils/callService.js";
import Prompt from "../models/Prompt.js";


const router = express.Router();

const protect = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Not authorized, no token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    res.status(401).json({ message: "Token failed" });
  }
};

router.post("/call", protect, async (req, res) => {
  try {
    const { business_type, phone_number } = req.body;

    if (!phone_number) {
      return res.status(400).json({ error: "Phone number is required" });
    }

    const callEntry = await SingleCall.create({
      user: req.user._id,
      phoneNumber: phone_number,
      business_type: business_type || "General",
    });

    console.log("Call saved to DB:", callEntry._id);
    console.log(`Business Call for ${business_type || "General"} → ${phone_number}`);
    const aiResponse = await axios.post(
      `${process.env.AI_SERVER_URL}/call`,
      { business_type, phone_number },
      {
        headers: { "Content-Type": "application/json" },
        timeout: 15000,
      }
    );

    res.status(200).json({
      message: "Call initiated successfully",
      aiResponse: aiResponse.data,
      data: callEntry,
    });
  } catch (err) {
    console.error("Call initiation error:", err.message);
    res.status(500).json({ message: "Call failed", error: err.message });
  }
});

router.post("/bulkCall", protect, async (req, res) => {
  try {
    const { phoneNumbers, business_type } = req.body;

    if (!Array.isArray(phoneNumbers) || phoneNumbers.length === 0) {
      return res.status(400).json({ error: "phoneNumbers array is required" });
    }

    console.log("Bulk Call Initiated:", phoneNumbers.length);
    console.log("User ID:", req.user?._id);

    const bulkEntry = await BulkCall.create({
      user: req.user._id,
      phoneNumbers,
      business_type: business_type || "General",
    });

    console.log("Saved BulkCall entry:", bulkEntry._id);

    const aiResponses = [];

    for (const num of phoneNumbers) {
      try {
        console.log(`Sending call request → ${num}`);

        const aiRes = await axios.post(
          `${process.env.AI_SERVER_URL}/call`,
          {
            phone_number: num,
            business_type: business_type || "General",
          },
          {
            headers: { "Content-Type": "application/json" },
            timeout: 15000,
          }
        );

        console.log("📡 AI Server Response Data:", aiRes.data);

        
        aiResponses.push({
          number: num,
          status: "success",
          response: aiRes.data,
        });
      } catch (err) {
        console.error(`AI call failed for ${num}:`, err.message);
        aiResponses.push({
          number: num,
          status: "failed",
          error: err.message,
        });
      }
    }

    console.log("Bulk call processing complete:", aiResponses.length);

    return res.status(200).json({
      message: "Bulk calls processed successfully",
      data: {
        bulkId: bulkEntry._id,
        totalNumbers: phoneNumbers.length,
        aiResponses,
      },
    });
  } catch (error) {
    console.error("Main Bulk Call Error:", error);
    return res.status(500).json({
      message: "Bulk call failed",
      error: error.message || "Unexpected error",
    });
  }
});

export default router;
