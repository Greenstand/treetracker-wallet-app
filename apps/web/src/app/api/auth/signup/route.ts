import { createUser } from "../../services/userService"; // Import the createUser function
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const res = await request.json();

  try {
    const result = await createUser({
      username: res.username,
      email: res.email,
      password: res.password,
    });

    if (result.success) {
      return NextResponse.json({ message: result.message }, { status: 201 });
    } else {
      return NextResponse.json({ message: result.message }, { status: 409 });
    }
  } catch (error: unknown) {
    console.error("Error during signup:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}
