const server = require("../../app");
const request = require("supertest");
const { faker } = require("@faker-js/faker");

describe("Messaging Endpoints", () => {
  let cookies;
  let user1, user2;

  beforeAll(async () => {
    // Create user1
    const user1Details = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: "password123",
    };

    await request(server).post("/api/auth/register").send(user1Details);

    const login1 = await request(server)
      .post("/api/auth/login")
      .send({ email: user1Details.email, password: "password123" });

    expect(login1.statusCode).toBe(200);
    cookies = login1.headers["set-cookie"]
      .map((cookie) => cookie.split(";")[0])
      .join("; ");
    user1 = { ...user1Details, id: login1.body.id };
    token = login1.body.token;

    // Create user2
    const user2Details = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: "password123",
    };

    await request(server).post("/api/auth/register").send(user2Details);

    const login2 = await request(server)
      .post("/api/auth/login")
      .send({ email: user2Details.email, password: "password123" });

    expect(login2.statusCode).toBe(200);
    user2 = { ...user2Details, id: login2.body.id };
  });

  test("send new message", async () => {
    const messageData = {
      content: "Hello from user1 to user2!",
      receiverId: user2.id,
    };

    const response = await request(server)
      .post("/api/messages")
      .set("Cookie", cookies)
      .send(messageData);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual(
      expect.objectContaining({
        content: messageData.content,
        chatId: expect.any(Number),
        userId: user1.id,
      })
    );
  });

  afterEach(async () => {
    await server.close();
  });
});
