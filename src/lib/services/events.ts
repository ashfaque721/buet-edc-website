import { unstable_cache, revalidateTag } from "next/cache";
import { prisma } from "@/lib/prisma";

export const EVENT_TAGS = {
  all: "events",
  single: (slug: string) => `event-${slug}`,
};

export const getCachedEvents = unstable_cache(
  async () => {
    return prisma.event.findMany({
      orderBy: { date: "asc" },
      include: {
        speakers: { orderBy: { order: "asc" } },
        guests: { orderBy: { order: "asc" } },
        timeline: { orderBy: { order: "asc" } },
        attendees: true,
      },
    });
  },
  ["events-all"],
  { tags: [EVENT_TAGS.all], revalidate: 3600 }
);

export const getCachedEventBySlug = (slug: string) =>
  unstable_cache(
    async () => {
      return prisma.event.findUnique({
        where: { slug },
        include: {
          speakers: { orderBy: { order: "asc" } },
          guests: { orderBy: { order: "asc" } },
          timeline: { orderBy: { order: "asc" } },
          attendees: true,
        },
      });
    },
    [`event-${slug}`],
    { tags: [EVENT_TAGS.all, EVENT_TAGS.single(slug)], revalidate: 3600 }
  )();

export async function createEvent(data: {
  title: string;
  slug: string;
  date: Date;
  venue: string;
  category: string;
  status: string;
  isOpenForReg: boolean;
  regFee?: number;
  summary: string;
  description: string;
  fbLink?: string;
  bannerUrl?: string;
  timeline?: { time: string; activity: string; order?: number }[];
  speakers?: { name: string; designation: string; photoUrl: string; order?: number }[];
  guests?: { name: string; designation: string; photoUrl: string; order?: number }[];
}) {
  const { timeline, speakers, guests, ...baseData } = data;
  const created = await prisma.event.create({
    data: {
      ...baseData,
      regFee: baseData.regFee ?? 0,
      timeline: timeline && timeline.length > 0 ? { create: timeline } : undefined,
      speakers: speakers && speakers.length > 0 ? { create: speakers } : undefined,
      guests: guests && guests.length > 0 ? { create: guests } : undefined,
    },
    include: {
      timeline: true,
      speakers: true,
      guests: true,
    },
  });

  try {
    revalidateTag(EVENT_TAGS.all, { expire: 0 });
  } catch {}
  return created;
}

export async function updateEvent(
  id: string,
  data: Partial<{
    title: string;
    slug: string;
    date: Date;
    venue: string;
    category: string;
    status: string;
    isOpenForReg: boolean;
    regFee: number;
    summary: string;
    description: string;
    fbLink?: string;
    bannerUrl?: string;
    speakers?: { name: string; designation: string; photoUrl: string; order?: number }[];
    guests?: { name: string; designation: string; photoUrl: string; order?: number }[];
  }>
) {
  const { speakers, guests, ...baseData } = data;

  const updated = await prisma.event.update({
    where: { id },
    data: baseData,
  });

  if (speakers !== undefined) {
    await prisma.eventSpeaker.deleteMany({ where: { eventId: id } });
    if (speakers.length > 0) {
      await prisma.eventSpeaker.createMany({
        data: speakers.map((s, idx) => ({
          eventId: id,
          name: s.name,
          designation: s.designation,
          photoUrl: s.photoUrl,
          order: s.order ?? idx,
        })),
      });
    }
  }

  if (guests !== undefined) {
    await prisma.eventGuest.deleteMany({ where: { eventId: id } });
    if (guests.length > 0) {
      await prisma.eventGuest.createMany({
        data: guests.map((g, idx) => ({
          eventId: id,
          name: g.name,
          designation: g.designation,
          photoUrl: g.photoUrl,
          order: g.order ?? idx,
        })),
      });
    }
  }

  try {
    revalidateTag(EVENT_TAGS.all, { expire: 0 });
    if (updated.slug) {
      revalidateTag(EVENT_TAGS.single(updated.slug), { expire: 0 });
    }
  } catch {}
  return updated;
}

export async function deleteEvent(id: string) {
  const deleted = await prisma.event.delete({
    where: { id },
  });

  try {
    revalidateTag(EVENT_TAGS.all, { expire: 0 });
    if (deleted.slug) {
      revalidateTag(EVENT_TAGS.single(deleted.slug), { expire: 0 });
    }
  } catch {}
  return deleted;
}

export async function registerForEvent(
  eventId: string,
  attendeeData: {
    name: string;
    email: string;
    phone: string;
    institution: string;
    dept: string;
    studentId: string;
    year: string;
    paymentMethod: string;
    trxId: string;
  }
) {
  const registration = await prisma.eventRegistration.create({
    data: {
      eventId,
      ...attendeeData,
    },
  });

  try {
    revalidateTag(EVENT_TAGS.all, { expire: 0 });
  } catch {}
  return registration;
}
