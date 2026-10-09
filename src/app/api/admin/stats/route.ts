import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [
      totalEvents,
      activeRegistrations,
      totalResources,
      currentExecutives,
      recentRegistrations,
    ] = await Promise.all([
      prisma.event.count(),
      prisma.eventRegistration.count(),
      prisma.resource.count(),
      prisma.executive.count({ where: { term: "current" } }),
      prisma.eventRegistration.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          event: { select: { title: true } },
        },
      }),
    ]);

    return NextResponse.json({
      stats: {
        totalEvents,
        activeRegistrations,
        totalResources,
        currentExecutives,
      },
      recentRegistrations: recentRegistrations.map((r) => ({
        id: r.id,
        name: r.name,
        email: r.email,
        institution: r.institution,
        eventName: r.event.title,
        createdAt: r.createdAt,
      })),
    });
  } catch (error) {
    console.error("GET /api/admin/stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard stats" },
      { status: 500 }
    );
  }
}
