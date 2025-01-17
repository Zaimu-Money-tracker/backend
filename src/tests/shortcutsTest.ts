import request from "supertest";
import app from "../app.js";
import { getCookie } from "./utils/cookie.js";
import shortcutData from "./data/shortcuts/validShortcut.json";
import updateShortcutData from "./data/shortcuts/upteShortcut.json";

let id: string;

describe("/POST Create a shortcut", () => {
  it("Should respond with status code 200", async () => {
    await request(app)
      .post("/api/shortcuts")
      .send(shortcutData)
      .expect(200)
      .set("Cookie", getCookie());
  });
});

describe("/GET Return all shortcuts", () => {
  it("Should respond with status code 200", async () => {
    const response = await request(app)
      .get("/api/shortcuts")
      .expect(200)
      .set("Cookie", getCookie());

    id = response.body[0]._id;
  });
});

describe("/GET Return one shortcut by id", () => {
  it("Should respond with status code 200", async () => {
    await request(app)
      .get(`/api/shortcuts/${id}`)
      .expect(200)
      .set("Cookie", getCookie());
  });
});

describe("/GET Update shortcut", () => {
  it("Should respond with status code 200", async () => {
    await request(app)
      .put(`/api/shortcuts/${id}`)
      .send(updateShortcutData)
      .expect(200)
      .set("Cookie", getCookie());
  });
});

describe("/GET Delete shortcut", () => {
  it("Should respond with status code 200", async () => {
    await request(app)
      .delete(`/api/shortcuts/${id}`)
      .expect(200)
      .set("Cookie", getCookie());
  });
});
