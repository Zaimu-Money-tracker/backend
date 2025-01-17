import connectDb from "../config/database.js";
import mongoose from "mongoose";
import userModel from "../models/user.model.js";
import categoryModel from "../models/category.model.js";
import goalModel from "../models/goal.model.js";
import shortcutModel from "../models/shortcut.model.js";
import transactionModel from "../models/transaction.model.js";

import "./authTest";
import "./userTest";
import "./categoriesTest";
import "./goalsTest";
import "./shortcutsTest";
import "./transactionsTest";

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
