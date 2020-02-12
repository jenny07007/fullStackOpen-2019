const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

// 4.8
test("blogs are returened as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

afterAll(() => {
  mongoose.connection.close();
});

test("staut code is returned as 200", async () => {
  const res = await api.get("/api/blogs");

  expect(res.status[200]);
});

// 4.9
