const server = require("../../app");
const request = require("supertest");
const { registerAndLoginUser } = require("../helpers/user");

describe("Chat Enpoints", () => {
  let cookies;
  let user;

  beforeAll(async () => {
    [user, cookies] = await registerAndLoginUser();
  });

  test("get active chats", async () => {
    const response = await request(server)
      .get("/api/chats")
      .set("Cookie", cookies);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("data");
  });

  afterEach(async () => {
    await server.close();
  });
});
