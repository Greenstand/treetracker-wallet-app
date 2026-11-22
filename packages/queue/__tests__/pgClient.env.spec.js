jest.mock("pg", () => ({
  Client: jest.fn().mockImplementation(() => ({ connect: jest.fn() })),
}));

jest.mock("dotenv", () => ({
  config: jest.fn(options => {
    process.env.DATABASE_URL =
      options?.path === ".dev.env"
        ? "postgresql://localhost/dev_queue"
        : "postgresql://localhost/default_queue";
  }),
}));

describe("queue database configuration", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
    delete process.env.DATABASE_URL;
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    process.env = originalEnv;
    jest.restoreAllMocks();
  });

  it("loads the development environment before creating clients", () => {
    process.env.NODE_ENV = "dev";

    require("../pgClient");

    const { Client } = require("pg");
    expect(Client).toHaveBeenCalledTimes(2);
    expect(Client).toHaveBeenCalledWith({
      connectionString: "postgresql://localhost/dev_queue",
    });
  });

  it("loads the default environment outside development", () => {
    process.env.NODE_ENV = "production";

    require("../pgClient");

    const { Client } = require("pg");
    expect(Client).toHaveBeenCalledTimes(2);
    expect(Client).toHaveBeenCalledWith({
      connectionString: "postgresql://localhost/default_queue",
    });
  });
});
