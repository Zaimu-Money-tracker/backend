import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({});

export default mongoose.model("Settings", settingsSchema);
