const request = require("supertest");
const server = require("../../app");
const { faker } = require("@faker-js/faker");

async function registerUser(userData) {
  const defaultUserData = {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: "password123",
  };

  const newUser = { ...defaultUserData, ...userData };

  const registerResponse = await request(server)
    .post("/api/auth/register")
    .send(newUser);

  if (registerResponse.statusCode !== 201) {
    throw new Error("Failed to register user");
  }

  return {
    ...newUser,
    id: registerResponse.body.id,
  };
}

async function registerAndLoginUser() {
  let user = await registerUser();

  const login = await request(server)
    .post("/api/auth/login")
    .send({ email: user.email, password: "password123" });

  expect(login.statusCode).toBe(200);
  let cookies = login.headers["set-cookie"]
    .map((cookie) => cookie.split(";")[0])
    .join("; ");
  user = { ...user, id: login.body.id };

  return [user, cookies];
}

module.exports = {
  registerUser,
  registerAndLoginUser,
};
