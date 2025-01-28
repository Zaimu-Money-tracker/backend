import app from "../../../app.js";
import userData from "../../mocks/users/validUser.json";
import userLogin from "../../mocks/users/loginValidUser.json";
import request from "supertest";
import { setCookie } from "../../utils/cookie.js";

const maxTimeOut = 100000;

describe("/POST Register an user", () => {
  it(
    "Should respond with status code 200",
    async () => {
      await request(app)
        .post("/api/register")
        .send(userData)
        .expect(200)
        .expect("Content-Type", /text\/html/);
    },
    maxTimeOut
  );
});

describe("/POST Logout user", () => {
  it("Should respond wit status code 200", async () => {
    await request(app)
      .post("/api/logout")
      .send()
      .expect(200)
      .expect("Content-Type", /text\/html/);
  });
});

describe("/POST Login user", () => {
  it("Should respond with status code 200", async () => {
    const response = await request(app)
      .post("/api/login")
      .send(userLogin)
      .expect(200)
      .expect("Content-Type", /text\/html/);

    setCookie(response.headers["set-cookie"][0]);
  });
});
