import mongoose from "mongoose";

const promptSchema = new mongoose.Schema(
  {
    business_type: {
      type: String,
      required: true,
      unique: true,
      enum: ["dental_clinic", "restaurant", "real_estate"],
    },
    prompt: {
      type: String,
      required: true,
      trim: true,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

promptSchema.pre("save", function (next) {
  this.updated_at = Date.now();
  next();
});

const Prompt = mongoose.model("Prompt", promptSchema);
export default Prompt;
