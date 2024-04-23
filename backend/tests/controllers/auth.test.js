const server = require("../../app");
const request = require("supertest");
const { faker } = require("@faker-js/faker");

describe("Authentication Endpoints", () => {
  let registeredUser = null;

  beforeAll(async () => {
    const newUser = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: "password123",
    };

    const registerResponse = await request(server)
      .post("/api/auth/register")
      .send(newUser);

    expect(registerResponse.statusCode).toBe(201);
    registeredUser = {
      ...newUser,
      id: registerResponse.body.id,
    };
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
