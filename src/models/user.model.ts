import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    userName: { type: String, required: true, unique: true, trim: true },
    gender: { type: String, required: true, trim: true },
    profilePhoto: {
      url: { type: String, require: false, default: "" },
      id: { type: String, require: false, default: "" },
    },
    profession: { type: String, required: false, default: "User", trim: true },
    birthDate: { type: Date, required: true },
    phoneNumber: { type: String, required: false, default: "", trim: true },
    email: { type: String, unique: true, required: true, trim: true },
    password: { type: String, required: true },
    settings: {
      language: { type: String, required: true, trim: true },
      currency: { type: String, required: true, trim: true },
      appearance: { type: String, required: true, trim: true },
      weekStart: {
        type: String,
        required: false,
        default: "monday",
        trim: true,
      },
      monthStart: {
        type: String,
        required: false,
        default: "1",
        trim: true,
      },
      theme: {
        name: { type: String, required: true, trim: true },
        imageUrl: { type: String, required: true },
      },
      notifications: {
        email: { type: Boolean, required: false, default: true },
        push: { type: Boolean, required: false, default: true },
        whatsApp: { type: Boolean, required: false, default: false },
        zaimuUpdates: { type: Boolean, required: false, default: false },
        goals: { type: Boolean, required: false, default: false },
        budgetAlerts: { type: Boolean, required: false, default: false },
        weeklyReport: { type: Boolean, required: false, default: true },
        monthlyReport: { type: Boolean, required: false, default: true },
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
