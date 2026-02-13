import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { id, username, first_name, last_name } = await request.json();

    const credential = await prisma.credential.create({
      data: {
        id,
        username,
        first_name,
        last_name,
      },
    });

    return NextResponse.json(
      { message: "Credential created successfully", credential },
      { status: 201 }
    );
  } catch (error) {
    console.error("Credential creation error:", error);
    return NextResponse.json(
      { error: "Failed to create credential" },
      { status: 500 }
    );
  }
}
