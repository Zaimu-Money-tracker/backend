import request from "supertest";
import app from "../../../app.js";
import { getCookie } from "../../utils/cookie.js";
import transactionData from "../../mocks/transactions/validTransaction.json";
import updateTransactionData from "../../mocks/transactions/updateTransaction.json";

let id: string;

describe("/POST Create a transaction", () => {
  it("Should respond with status code 200", async () => {
    await request(app)
      .post("/api/transactions")
      .send(transactionData)
      .expect(200)
      .set("Cookie", getCookie())
      .expect("Content-Type", /text\/html/);
  });
});

describe("/GET Return all transactions", () => {
  it("Should respond with status code 200", async () => {
    const response = await request(app)
      .get("/api/transactions")
      .expect(200)
      .set("Cookie", getCookie())
      .expect("Content-Type", /application\/json/);

    id = response.body[0]._id;
  });
});

describe("/GET Return all expenses", () => {
  it("Should respond with status code 200", async () => {
    await request(app)
      .get("/api/transactions/expenses")
      .expect(200)
      .set("Cookie", getCookie())
      .expect("Content-Type", /application\/json/);
  });
});

describe("/GET Return all incomes", () => {
  it("Should respond with status code 200", async () => {
    await request(app)
      .get("/api/transactions/incomes")
      .expect(200)
      .set("Cookie", getCookie())
      .expect("Content-Type", /application\/json/);
  });
});

describe("/GET Return one transaction by id", () => {
  it("Should respond with status code 200", async () => {
    await request(app)
      .get(`/api/transactions/item/${id}`)
      .expect(200)
      .set("Cookie", getCookie())
      .expect("Content-Type", /application\/json/);
  });
});

describe("/GET Update transaction", () => {
  it("Should respond with status code 200", async () => {
    await request(app)
      .put(`/api/transactions/item/${id}`)
      .send(updateTransactionData)
      .expect(200)
      .set("Cookie", getCookie())
      .expect("Content-Type", /text\/html/);
  });
});

describe("/GET Delete transaction", () => {
  it("Should respond with status code 200", async () => {
    await request(app)
      .delete(`/api/transactions/item/${id}`)
      .expect(200)
      .set("Cookie", getCookie())
      .expect("Content-Type", /text\/html/);
  });
});
