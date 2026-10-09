import { NextResponse } from "next/server";
import { getCachedResources, createResource } from "@/lib/services/resources";
import { z } from "zod";

export const dynamic = "force-dynamic";

const resourceSchema = z.object({
  title: z.string().min(1),
  category: z.string().min(1),
  type: z.string().min(1),
  readingTime: z.string().min(1),
  description: z.string().min(1),
  link: z.string().min(1),
});

export async function GET() {
  try {
    const resources = await getCachedResources();
    return NextResponse.json(resources);
  } catch (error) {
    console.error("GET /api/resources error:", error);
    return NextResponse.json({ error: "Failed to fetch resources" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = resourceSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload", details: parsed.error.issues }, { status: 400 });
    }

    const created = await createResource(parsed.data);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("POST /api/resources error:", error);
    return NextResponse.json({ error: "Failed to create resource" }, { status: 500 });
  }
}
