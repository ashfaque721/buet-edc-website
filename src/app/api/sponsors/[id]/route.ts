import { NextResponse } from "next/server";
import { updateSponsor, deleteSponsor } from "@/lib/services/sponsors";

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const updated = await updateSponsor(id, body);
    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT /api/sponsors/[id] error:", error);
    return NextResponse.json({ error: "Failed to update sponsor" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const deleted = await deleteSponsor(id);
    return NextResponse.json(deleted);
  } catch (error) {
    console.error("DELETE /api/sponsors/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete sponsor" }, { status: 500 });
  }
}
