import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Missing credentials" },
        { status: 400 },
      );
    }

    const payload = new URLSearchParams();
    payload.append("grant_type", "password");
    payload.append("client_id", process.env.KEYCLOAK_CLIENT_ID!);
    if (process.env.KEYCLOAK_CLIENT_SECRET) {
      payload.append("client_secret", process.env.KEYCLOAK_CLIENT_SECRET);
    }
    payload.append("username", username);
    payload.append("password", password);

    const keycloakUrl = `${process.env.KEYCLOAK_BASE_URL}/realms/${process.env.KEYCLOAK_REALM}/protocol/openid-connect/token`;

    const response = await fetch(keycloakUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: payload.toString(),
    });

    const contentType = response.headers.get("content-type") || "";

    if (!response.ok) {
      let error;
      if (contentType.includes("application/json")) {
        error = await response.json();
      } else {
        const text = await response.text();
        error = { message: text.substring(0, 100) };
      }
      return NextResponse.json({ error }, { status: response.status });
    }

    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        { error: "Expected JSON response from Keycloak, but received HTML" },
        { status: 502 },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
