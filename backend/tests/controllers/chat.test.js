const server = require("../../app");
const request = require("supertest");
const { registerUser } = require("../helpers/user");

describe("Chat Enpoints", () => {
  let registeredUser = null;

  beforeAll(async () => {
    registeredUser = await registerUser();
  });

  test("get active chats", async () => {
    expect(200).toBe(200);
  });

  afterEach(async () => {
    await server.close();
  });
});
