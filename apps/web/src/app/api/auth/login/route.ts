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

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json({ error }, { status: response.status });
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
