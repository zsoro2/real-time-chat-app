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

module.exports = {
  registerUser,
};
