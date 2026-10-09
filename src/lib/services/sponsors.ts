import { unstable_cache, revalidateTag } from "next/cache";
import { prisma } from "@/lib/prisma";

export const SPONSORS_TAG = "sponsors";

export const getCachedSponsors = unstable_cache(
  async () => {
    return prisma.sponsor.findMany({
      orderBy: { order: "asc" },
    });
  },
  ["sponsors-all"],
  { tags: [SPONSORS_TAG], revalidate: 3600 }
);

export async function createSponsor(data: {
  name: string;
  logoUrl: string;
  tier: string;
  websiteUrl?: string;
  order?: number;
}) {
  const created = await prisma.sponsor.create({
    data,
  });
  try {
    revalidateTag(SPONSORS_TAG, { expire: 0 });
  } catch {}
  return created;
}

export async function updateSponsor(
  id: string,
  data: Partial<{
    name: string;
    logoUrl: string;
    tier: string;
    websiteUrl: string;
    order: number;
  }>
) {
  const updated = await prisma.sponsor.update({
    where: { id },
    data,
  });
  try {
    revalidateTag(SPONSORS_TAG, { expire: 0 });
  } catch {}
  return updated;
}

export async function deleteSponsor(id: string) {
  const deleted = await prisma.sponsor.delete({
    where: { id },
  });
  try {
    revalidateTag(SPONSORS_TAG, { expire: 0 });
  } catch {}
  return deleted;
}
