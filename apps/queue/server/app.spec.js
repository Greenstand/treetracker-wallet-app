const request = require('supertest');
const { expect } = require('chai');
const server = require("./app");


describe("", () => {

  it("Test header: content-type: application/json", async () => {
    const res = await request(server)
      .get('/');
    expect(res.statusCode).eq(200);
  });

  it("Test header: content-type: application/json", async () => {
    const res = await request(server)
      .post('/');
    expect(res.statusCode).eq(415);
    expect(res.body).property("message").match(/application.json/);
  });
});
