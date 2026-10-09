import { NextResponse } from "next/server";
import { updateExecutive, deleteExecutive } from "@/lib/services/executives";

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const updated = await updateExecutive(id, body);
    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT /api/executives/[id] error:", error);
    return NextResponse.json({ error: "Failed to update executive" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const deleted = await deleteExecutive(id);
    return NextResponse.json(deleted);
  } catch (error) {
    console.error("DELETE /api/executives/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete executive" }, { status: 500 });
  }
}
