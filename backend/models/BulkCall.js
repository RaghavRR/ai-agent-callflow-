import mongoose from "mongoose";

const bulkCallSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "TempUser", required: true },
  phoneNumbers: [{ type: String, required: true }],
  createdAt: { type: Date, default: Date.now },
});

const BulkCall = mongoose.model("BulkCall", bulkCallSchema);
export default BulkCall;
