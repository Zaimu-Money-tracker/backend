import app from "../app.js";
import userData from "./data/users/validUser.json";
import userLogin from "./data/users/loginValidUser.json";
import request from "supertest";
import connectDb from "../config/database.js";
import mongoose from "mongoose";
import userModel from "../models/user.model.js";

const maxTimeOut = 100000;
let cookie: string = "";

beforeAll(() => {
  void connectDb();
});

afterAll(async () => {
  await userModel.deleteMany({});
  await mongoose.connection.close();
});

describe("/POST Register an user", () => {
  test(
    "Should respond with status code 200",
    async () => {
      await request(app)
        .post("/api/register")
        .send(userData)
        .expect(200)
        .expect("Content-Type", /application\/json/);
    },
    maxTimeOut
  );
});

describe("/POST Logout user", () => {
  test(
    "Should respond wit status code 200",
    async () => {
      await request(app)
        .post("/api/logout")
        .send()
        .expect(200)
        .expect("Content-Type", /application\/json/);
    },
    maxTimeOut
  );
});

describe("/POST Login user", () => {
  test("Should respond with status code 200", async () => {
    const response = await request(app)
      .post("/api/login")
      .send(userLogin)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    cookie = response.headers["set-cookie"][0];
  });
});

describe("GET /user", () => {
  test(
    "Should respond with status code 200",
    async () => {
      await request(app).get("/api/user").expect(200).set("Cookie", cookie);
    },
    maxTimeOut
  );
});
