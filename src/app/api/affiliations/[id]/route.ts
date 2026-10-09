import { NextResponse } from "next/server";
import { deleteAmbassador } from "@/lib/services/affiliations";

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const deleted = await deleteAmbassador(id);
    return NextResponse.json(deleted);
  } catch (error) {
    console.error("DELETE /api/affiliations/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete ambassador" }, { status: 500 });
  }
}
