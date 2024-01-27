const app = require("../app");
const request = require("supertest");

describe("POST /auth/register", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/auth/register").send({
      username: "john_doe",
      email: "john.doe@example.com",
      password: "password123",
    });
    expect(res.statusCode).toEqual(201);
  });
});
