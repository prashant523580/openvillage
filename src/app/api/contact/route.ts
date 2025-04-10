import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Save to database
    await prisma.contactSubmission.create({
      data: {
        name,
        email,
        message,
      },
    });

    return NextResponse.json({ message: "Message sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error saving contact submission:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}