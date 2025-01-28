import request from "supertest";
import app from "../../../app.js";
import categoryData from "../../mocks/categories/validCategory.json";
import updateCategoryData from "../../mocks/categories/updateCategory.json";
import { getCookie } from "../../utils/cookie.js";

let id: string;

describe("/POST Create a category", () => {
  it("Should respond with status code 200", async () => {
    await request(app)
      .post("/api/categories")
      .send(categoryData)
      .expect(200)
      .set("Cookie", getCookie())
      .expect("Content-Type", /text\/html/);
  });
});

describe("/GET Return all categories", () => {
  it("Should respond with status code 200", async () => {
    const response = await request(app)
      .get("/api/categories")
      .expect(200)
      .set("Cookie", getCookie())
      .expect("Content-Type", /application\/json/);

    id = response.body[0]._id;
  });
});

describe("/GET Return one category by id", () => {
  it("Should respond with status code 200", async () => {
    await request(app)
      .get(`/api/categories/${id}`)
      .expect(200)
      .set("Cookie", getCookie())
      .expect("Content-Type", /application\/json/);
  });
});

describe("/POST Update category", () => {
  it("Should respond with status code 200", async () => {
    await request(app)
      .put(`/api/categories/${id}`)
      .send(updateCategoryData)
      .expect(200)
      .set("Cookie", getCookie())
      .expect("Content-Type", /text\/html/);
  });
});

describe("/POST Delete category", () => {
  it("Should respond with status code 200", async () => {
    await request(app)
      .delete(`/api/categories/${id}`)
      .expect(200)
      .set("Cookie", getCookie())
      .expect("Content-Type", /text\/html/);
  });
});
