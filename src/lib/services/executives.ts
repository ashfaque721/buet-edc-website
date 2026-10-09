import { unstable_cache, revalidateTag } from "next/cache";
import { prisma } from "@/lib/prisma";

export const EXECUTIVES_TAG = "executives";

export const getCachedExecutives = unstable_cache(
  async () => {
    return prisma.executive.findMany({
      orderBy: { order: "asc" },
    });
  },
  ["executives-all"],
  { tags: [EXECUTIVES_TAG], revalidate: 3600 }
);

export async function createExecutive(data: {
  name: string;
  designation: string;
  wing: string;
  term: string;
  photoUrl: string;
  facebook?: string;
  linkedin?: string;
  order?: number;
}) {
  const created = await prisma.executive.create({
    data,
  });
  try {
    revalidateTag(EXECUTIVES_TAG, { expire: 0 });
  } catch {}
  return created;
}

export async function updateExecutive(
  id: string,
  data: Partial<{
    name: string;
    designation: string;
    wing: string;
    term: string;
    photoUrl: string;
    facebook: string;
    linkedin: string;
    order: number;
  }>
) {
  const updated = await prisma.executive.update({
    where: { id },
    data,
  });
  try {
    revalidateTag(EXECUTIVES_TAG, { expire: 0 });
  } catch {}
  return updated;
}

export async function deleteExecutive(id: string) {
  const deleted = await prisma.executive.delete({
    where: { id },
  });
  try {
    revalidateTag(EXECUTIVES_TAG, { expire: 0 });
  } catch {}
  return deleted;
}
