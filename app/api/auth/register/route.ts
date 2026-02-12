import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, password, organizationName } = await request.json();

    // Mock registration - database not connected as per user request
    console.log("Registration request:", { firstName, lastName, email, organizationName });

    return NextResponse.json(
      { message: "User created successfully", userId: "mock-user-id" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Failed to create account" },
      { status: 500 }
    );
  }
}
