import { NextResponse } from "next/server";
import { getCachedAffiliations, createAmbassador } from "@/lib/services/affiliations";
import { z } from "zod";

const ambassadorSchema = z.object({
  name: z.string().min(1),
  company: z.string().min(1),
  logoUrl: z.string().optional(),
  photoUrl: z.string().optional(),
  linkedin: z.string().optional(),
  facebook: z.string().optional(),
  order: z.number().optional(),
});

export async function GET() {
  try {
    const data = await getCachedAffiliations();
    return NextResponse.json(data);
  } catch (error) {
    console.error("GET /api/affiliations error:", error);
    return NextResponse.json({ error: "Failed to fetch affiliations" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = ambassadorSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload", details: parsed.error.issues }, { status: 400 });
    }

    const created = await createAmbassador(parsed.data);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("POST /api/affiliations error:", error);
    return NextResponse.json({ error: "Failed to create ambassador" }, { status: 500 });
  }
}
