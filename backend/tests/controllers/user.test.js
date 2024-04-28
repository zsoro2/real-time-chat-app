const server = require("../../app");
const request = require("supertest");
const { registerAndLoginUser } = require("../helpers/user");
const path = require("path");
const { faker } = require("@faker-js/faker");

const ImagePath500x500 = path.resolve(__dirname, "../images/500x500guy.jpg");
const ImagePath1x1 = path.resolve(__dirname, "../images/1x1white.jpg");

describe("User Endpoints", () => {
  let user, cookies;

  beforeAll(async () => {
    [user, cookies] = await registerAndLoginUser();
  });

  test("user update profile picture with good size", async () => {
    const response = await request(server)
      .put("/api/users")
      .set("Cookie", cookies)
      .attach("pictureImage", ImagePath500x500);

    expect(response.statusCode).toBe(200);
  });

  test("user update profile picture with 1x1 picture", async () => {
    const response = await request(server)
      .put("/api/users")
      .set("Cookie", cookies)
      .attach("pictureImage", ImagePath1x1);

    expect(response.statusCode).toBe(400);
  });

  test("user update username", async () => {
    const messageData = {
      username: faker.string.alpha(10),
    };

    const response = await request(server)
      .put("/api/users")
      .set("Cookie", cookies)
      .send(messageData);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("user");
    expect(response.body.user).toEqual(
      expect.objectContaining({
        username: messageData.username,
      })
    );
  });

  test("user update profile picture and username", async () => {});

  afterEach(async () => {
    await server.close();
  });
});
