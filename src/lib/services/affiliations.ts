import { unstable_cache, revalidateTag } from "next/cache";
import { prisma } from "@/lib/prisma";

export const AFFILIATIONS_TAG = "affiliations";

export const getCachedAffiliations = unstable_cache(
  async () => {
    const [partners, ambassadors] = await Promise.all([
      prisma.partner.findMany({ orderBy: { order: "asc" } }),
      prisma.ambassador.findMany({ orderBy: { order: "asc" } }),
    ]);
    return { partners, ambassadors };
  },
  ["affiliations-all"],
  { tags: [AFFILIATIONS_TAG], revalidate: 3600 }
);

export async function createAmbassador(data: {
  name: string;
  company: string;
  logoUrl?: string;
  photoUrl?: string;
  linkedin?: string;
  facebook?: string;
  order?: number;
}) {
  const created = await prisma.ambassador.create({ data });
  try {
    revalidateTag(AFFILIATIONS_TAG, { expire: 0 });
  } catch {}
  return created;
}

export async function deleteAmbassador(id: string) {
  const deleted = await prisma.ambassador.delete({ where: { id } });
  try {
    revalidateTag(AFFILIATIONS_TAG, { expire: 0 });
  } catch {}
  return deleted;
}
