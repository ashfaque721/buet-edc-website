import { NextResponse } from "next/server";
import { getCachedExecutives, createExecutive } from "@/lib/services/executives";
import { z } from "zod";

export const dynamic = "force-dynamic";

const execSchema = z.object({
  name: z.string().min(1),
  designation: z.string().min(1),
  wing: z.string().min(1),
  term: z.string().min(1),
  photoUrl: z.string().min(1),
  facebook: z.string().optional(),
  linkedin: z.string().optional(),
  order: z.number().optional(),
});

export async function GET() {
  try {
    const executives = await getCachedExecutives();
    return NextResponse.json(executives);
  } catch (error) {
    console.error("GET /api/executives error:", error);
    return NextResponse.json({ error: "Failed to fetch executives" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = execSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload", details: parsed.error.issues }, { status: 400 });
    }

    const created = await createExecutive(parsed.data);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("POST /api/executives error:", error);
    return NextResponse.json({ error: "Failed to create executive" }, { status: 500 });
  }
}
