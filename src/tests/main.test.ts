import connectDb from "../config/db/database.js";
import mongoose from "mongoose";
import userModel from "../models/user/user.model.js";
import categoryModel from "../models/entities/category.model.js";
import goalModel from "../models/entities/goal.model.js";
import shortcutModel from "../models/entities/shortcut.model.js";
import transactionModel from "../models/entities/transaction.model.js";

import "./unit/auth/authTest.js";
import "./unit/user/userTest.js";
import "./unit/entities/categoriesTest.js";
import "./unit/entities/goalsTest.js";
import "./unit/entities/shortcutsTest.js";
import "./unit/entities/transactionsTest.js";

beforeAll(() => {
  void connectDb();
});

afterAll(async () => {
  await userModel.deleteMany({});
  await categoryModel.deleteMany({});
  await goalModel.deleteMany({});
  await shortcutModel.deleteMany({});
  await transactionModel.deleteMany({});
  await mongoose.connection.close();
});
