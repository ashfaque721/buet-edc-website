import { NextResponse } from "next/server";
import { updateGalleryPhoto, deleteGalleryPhoto } from "@/lib/services/gallery";

export async function PUT(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await request.json();

    if (body.eventDate && typeof body.eventDate === "string") {
      body.eventDate = new Date(body.eventDate);
    }

    const updated = await updateGalleryPhoto(id, body);
    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT /api/gallery/[id] error:", error);
    return NextResponse.json({ error: "Failed to update gallery photo" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const deleted = await deleteGalleryPhoto(id);
    return NextResponse.json(deleted);
  } catch (error) {
    console.error("DELETE /api/gallery/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete gallery photo" }, { status: 500 });
  }
}
