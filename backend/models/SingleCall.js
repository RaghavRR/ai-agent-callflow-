import mongoose from "mongoose";

const callSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "TempUser", required: true },
  phoneNumber: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const SingleCall = mongoose.model("SingleCall", callSchema);
export default SingleCall;
