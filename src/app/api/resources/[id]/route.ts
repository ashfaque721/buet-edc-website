import { NextResponse } from "next/server";
import { updateResource, deleteResource } from "@/lib/services/resources";

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const updated = await updateResource(id, body);
    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT /api/resources/[id] error:", error);
    return NextResponse.json({ error: "Failed to update resource" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const deleted = await deleteResource(id);
    return NextResponse.json(deleted);
  } catch (error) {
    console.error("DELETE /api/resources/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete resource" }, { status: 500 });
  }
}
