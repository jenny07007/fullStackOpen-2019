const mongoose = require("mongoose");
const helper = require("../tests/blogstest_helper");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/User");

describe("when there is initially one user at db", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const user = new User({ username: "helloworld", password: "4hello" });
    await user.save();
  });

  test("should succeed with a new username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "helloworld2",
      name: "Hello World",
      password: "helloworld222"
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const usersAtend = await helper.usersInDb();
    expect(usersAtend.length).toBe(usersAtStart.length + 1);

    const usernames = usersAtend.map(u => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("should fail with proper status code when username is taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "helloworld",
      name: "IamTesting",
      password: "4hello"
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error, /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd.length).toBe(usersAtStart.length);
  });
});

afterAll(() => mongoose.connection.close());
