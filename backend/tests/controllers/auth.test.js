const server = require("../../app");
const request = require("supertest");
const { registerUser } = require("../helpers/user");

describe("Authentication Endpoints", () => {
  let registeredUser = null;

  beforeAll(async () => {
    registeredUser = await registerUser();
  });

  test("register a new user", async () => {
    expect(registeredUser).toHaveProperty("id");
    expect(registeredUser).toHaveProperty("username");
    expect(registeredUser).toHaveProperty("email");
  });

  test("login the registered user", async () => {
    const loginResponse = await request(server).post("/api/auth/login").send({
      email: registeredUser.email,
      password: "password123",
    });

    expect(loginResponse.statusCode).toBe(200);
    expect(loginResponse.body).toHaveProperty("token");
  });

  afterEach(async () => {
    await server.close();
  });
});
