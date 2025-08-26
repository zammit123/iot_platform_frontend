import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.EXPRESS_API_URL;

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const res = await fetch(`${API_URL}/devices/${id}`);
    if (!res.ok) throw new Error("Failed to fetch device");
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching device:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await req.json();
    const res = await fetch(`${API_URL}/devices/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error("Failed to update device");
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error updating device:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const res = await fetch(`${API_URL}/devices/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete device");
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error deleting device:", error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
