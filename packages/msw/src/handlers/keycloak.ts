import { http, HttpResponse } from "msw";
import { mockKeycloakToken } from "../mocks";

const keycloakHandlers = [
  http.post("*/openid-connect/token", () =>
    HttpResponse.json(mockKeycloakToken),
  ),
];

export default keycloakHandlers;
