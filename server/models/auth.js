import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  about: { type: String },
  plan: {
    type: String,
    default: "Free",
  },
  tags: { type: [String] },
  joinedOn: { type: Date, default: Date.now },
  isAuthenticated: {
    type: Boolean,
    default: false,
  },
  otpCode: {
    type: Number,
    default:0
  },
  otpExpiration: {
    type: Date,
  },
});

export default mongoose.model("User", userSchema);
