import request from "supertest";
import app from "../app.js";
import { getCookie } from "./utils/cookie.js";

describe("/GET Return user data", () => {
  it("Should respond with status code 200", async () => {
    await request(app).get("/api/user").expect(200).set("Cookie", getCookie());
  });
});
