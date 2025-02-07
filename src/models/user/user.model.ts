import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    profilePhoto: {
      url: {
        type: String,
        require: false,
        default:
          "https://res.cloudinary.com/zaimu/image/upload/v1738339789/No-Profile-Picture_igg17f.webp",
      },
      id: { type: String, require: false, default: "Default_Image" },
    },
    profession: { type: String, required: false, default: "User", trim: true },
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
        type: Number,
        required: false,
        default: 1,
        trim: true,
      },
      theme: { type: String, required: false, default: "Default", trim: true },
      notifications: {
        email: { type: Boolean, default: true },
        push: { type: Boolean, default: true },
        whatsApp: { type: Boolean, default: false },
        zaimuUpdates: { type: Boolean, default: true },
        goals: { type: Boolean, default: true },
        budgetAlerts: { type: Boolean, default: true },
        weeklyReport: { type: Boolean, default: true },
        monthlyReport: { type: Boolean, default: true },
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
