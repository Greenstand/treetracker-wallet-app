import { http, HttpResponse } from "msw";
import { mockUser } from "../mocks";

const authHandlers = [
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

export default authHandlers;
