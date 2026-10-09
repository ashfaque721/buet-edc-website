import { NextResponse } from "next/server";
import { registerForEvent } from "@/lib/services/events";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const baseRegistrationSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(6, "Valid phone is required"),
  institution: z.string().min(2, "Institution is required"),
  dept: z.string().optional().default("N/A"),
  studentId: z.string().min(1, "Student ID is required"),
  year: z.string().min(1, "Year is required"),
  paymentMethod: z.string().optional().default("Free"),
  trxId: z.string().optional().default("FREE"),
});

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    // Check if event exists and is open for registration
    const event = await prisma.event.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
    });

    if (!event) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    if (!event.isOpenForReg) {
      return NextResponse.json(
        { error: "Registration is currently closed for this event." },
        { status: 400 }
      );
    }

    const body = await request.json();
    const parsed = baseRegistrationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const isFree = (event.regFee ?? 0) === 0;

    if (!isFree) {
      if (!parsed.data.paymentMethod || parsed.data.paymentMethod.toLowerCase() === "free") {
        return NextResponse.json(
          { error: "Payment method (bKash or Nagad) is required for paid events." },
          { status: 400 }
        );
      }
      if (!parsed.data.trxId || parsed.data.trxId.trim().length < 3 || parsed.data.trxId.toUpperCase() === "FREE") {
        return NextResponse.json(
          { error: "A valid Transaction ID is required for paid events." },
          { status: 400 }
        );
      }
    } else {
      parsed.data.paymentMethod = "Free";
      parsed.data.trxId = "FREE";
    }

    const registration = await registerForEvent(event.id, parsed.data);

    return NextResponse.json(
      {
        success: true,
        message: "Registration successful!",
        registration,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/events/[id]/register error:", error);
    return NextResponse.json(
      { error: "Registration failed. Please try again." },
      { status: 500 }
    );
  }
}
