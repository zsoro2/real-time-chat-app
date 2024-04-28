const server = require("../../app");
const request = require("supertest");
const { faker } = require("@faker-js/faker");
const { registerUser } = require("../helpers/user");

describe("Messaging Endpoints", () => {
  let cookies;
  let user1, user2;

  beforeAll(async () => {
    // Create user1
    user1 = await registerUser({
      password: "password123",
    });

    const login1 = await request(server)
      .post("/api/auth/login")
      .send({ email: user1.email, password: "password123" });

    expect(login1.statusCode).toBe(200);
    cookies = login1.headers["set-cookie"]
      .map((cookie) => cookie.split(";")[0])
      .join("; ");
    user1 = { ...user1, id: login1.body.id };

    // Create user2
    user2 = await registerUser({
      password: "password123",
    });

    const login2 = await request(server)
      .post("/api/auth/login")
      .send({ email: user2.email, password: "password123" });

    expect(login2.statusCode).toBe(200);
    user2 = { ...user2, id: login2.body.id };
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

  test("send new message without receiver", async () => {
    const messageData = {
      content: "Hello from user1 to user2!",
    };

    const response = await request(server)
      .post("/api/messages")
      .set("Cookie", cookies)
      .send(messageData);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("errors");
  });

  test("send new message without authenticated user", async () => {
    const messageData = {
      content: "Hello from user1 to user2!",
      userId: 123,
    };

    const response = await request(server)
      .post("/api/messages")
      .send(messageData);

    expect(response.statusCode).toBe(401);
  });

  afterEach(async () => {
    await server.close();
  });
});
