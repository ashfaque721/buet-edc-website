import { NextResponse } from "next/server";
import { getCachedEvents, createEvent } from "@/lib/services/events";
import { z } from "zod";

const createEventSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  date: z.string().transform((d) => new Date(d)),
  venue: z.string().min(1),
  category: z.string().min(1),
  status: z.enum(["upcoming", "past"]).default("upcoming"),
  isOpenForReg: z.boolean().default(false),
  regFee: z.coerce.number().min(0).default(0),
  summary: z.string().min(1),
  description: z.string().min(1),
  fbLink: z.string().optional(),
  bannerUrl: z.string().optional(),
  timeline: z.array(z.object({ time: z.string(), activity: z.string(), order: z.number().optional() })).optional(),
  speakers: z.array(z.object({ name: z.string(), designation: z.string(), photoUrl: z.string(), order: z.number().optional() })).optional(),
  guests: z.array(z.object({ name: z.string(), designation: z.string(), photoUrl: z.string(), order: z.number().optional() })).optional(),
});

export async function GET() {
  try {
    const events = await getCachedEvents();
    return NextResponse.json(events);
  } catch (error) {
    console.error("GET /api/events error:", error);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = createEventSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload", details: parsed.error.issues }, { status: 400 });
    }

    const created = await createEvent(parsed.data);
    return NextResponse.json(created, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/events error:", error);
    if (error?.code === "P2002") {
      return NextResponse.json({ error: "An event with this slug already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}
