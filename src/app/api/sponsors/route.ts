import { NextResponse } from "next/server";
import { getCachedSponsors, createSponsor } from "@/lib/services/sponsors";
import { z } from "zod";

export const dynamic = "force-dynamic";

const sponsorSchema = z.object({
  name: z.string().min(1),
  logoUrl: z.string().min(1),
  tier: z.string().min(1),
  websiteUrl: z.string().optional(),
  order: z.number().optional(),
});

export async function GET() {
  try {
    const sponsors = await getCachedSponsors();
    return NextResponse.json(sponsors);
  } catch (error) {
    console.error("GET /api/sponsors error:", error);
    return NextResponse.json({ error: "Failed to fetch sponsors" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = sponsorSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload", details: parsed.error.issues }, { status: 400 });
    }

    const created = await createSponsor(parsed.data);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("POST /api/sponsors error:", error);
    return NextResponse.json({ error: "Failed to create sponsor" }, { status: 500 });
  }
}
