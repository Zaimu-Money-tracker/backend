import request from "supertest";
import app from "../../../app.js";
import { getCookie } from "../../utils/cookie.js";
import goalData from "../../mocks/goals/validGoal.json";
import updateGoalData from "../../mocks/goals/updateGoal.json";

let id: string;

describe("/POST Create a goal", () => {
  it("Should respond with status code 200", async () => {
    await request(app)
      .post("/api/goals")
      .send(goalData)
      .expect(200)
      .set("Cookie", getCookie())
      .expect("Content-Type", /text\/html/);
  });
});

describe("/GET Return all goals", () => {
  it("Should respond with status code 200", async () => {
    const response = await request(app)
      .get("/api/goals")
      .expect(200)
      .set("Cookie", getCookie())
      .expect("Content-Type", /application\/json/);

    id = response.body[0]._id;
  });
});

describe("/GET Return one goal by id", () => {
  it("Should respond with status code 200", async () => {
    await request(app)
      .get(`/api/goals/${id}`)
      .expect(200)
      .set("Cookie", getCookie())
      .expect("Content-Type", /application\/json/);
  });
});

describe("/GET Update goal", () => {
  it("Should respond with status code 200", async () => {
    await request(app)
      .put(`/api/goals/${id}`)
      .send(updateGoalData)
      .expect(200)
      .set("Cookie", getCookie())
      .expect("Content-Type", /text\/html/);
  });
});

describe("/GET Delete goal", () => {
  it("Should respond with status code 200", async () => {
    await request(app)
      .delete(`/api/goals/${id}`)
      .expect(200)
      .set("Cookie", getCookie())
      .expect("Content-Type", /text\/html/);
  });
});
