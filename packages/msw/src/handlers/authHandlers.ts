import { http, HttpResponse } from "msw";

export const mockUser = {
  userId: "mock-user-id",
  username: "mockuser",
  email: "mock@example.com",
};

export const authHandlers = [
  http.post("*/login", () =>
    HttpResponse.json({
      token: "mock-access-token",
      ...mockUser,
    }),
  ),

  http.post("*/register", () =>
    HttpResponse.json({
      success: true,
      message: "Registration successful",
      ...mockUser,
    }),
  ),
];
