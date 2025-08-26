import { NextResponse } from "next/server";

const API_URL = process.env.EXPRESS_API_URL;

export async function GET() {
  try {
    const res = await fetch(`${API_URL}/devices`);
    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch devices" },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching devices:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch(`${API_URL}/devices`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to create device" },
        { status: res.status }
      );
    }

    const data = await res.json();
    console.log("Created device:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error creating device:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
