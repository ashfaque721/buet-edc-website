import { NextResponse } from "next/server";
import { getCachedGalleryPhotos, createGalleryPhoto } from "@/lib/services/gallery";
import { z } from "zod";

export const dynamic = "force-dynamic";

const photoSchema = z.object({
  imageUrl: z.string().min(1),
  caption: z.string().min(1),
  eventDate: z.string().transform((d) => new Date(d)),
  eventName: z.string().optional(),
  showOnHomepage: z.boolean().default(false),
});

export async function GET() {
  try {
    const photos = await getCachedGalleryPhotos();
    return NextResponse.json(photos);
  } catch (error) {
    console.error("GET /api/gallery error:", error);
    return NextResponse.json({ error: "Failed to fetch gallery photos" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = photoSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload", details: parsed.error.issues }, { status: 400 });
    }

    const created = await createGalleryPhoto(parsed.data);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("POST /api/gallery error:", error);
    return NextResponse.json({ error: "Failed to create photo" }, { status: 500 });
  }
}
