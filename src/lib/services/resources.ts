import { unstable_cache, revalidateTag } from "next/cache";
import { prisma } from "@/lib/prisma";

export const RESOURCES_TAG = "resources";

export const getCachedResources = unstable_cache(
  async () => {
    return prisma.resource.findMany({
      orderBy: { createdAt: "desc" },
    });
  },
  ["resources-all"],
  { tags: [RESOURCES_TAG], revalidate: 3600 }
);

export async function createResource(data: {
  title: string;
  category: string;
  type: string;
  readingTime: string;
  description: string;
  link: string;
}) {
  const created = await prisma.resource.create({ data });
  try {
    revalidateTag(RESOURCES_TAG, { expire: 0 });
  } catch {}
  return created;
}

export async function updateResource(
  id: string,
  data: Partial<{
    title: string;
    category: string;
    type: string;
    readingTime: string;
    description: string;
    link: string;
  }>
) {
  const updated = await prisma.resource.update({
    where: { id },
    data,
  });
  try {
    revalidateTag(RESOURCES_TAG, { expire: 0 });
  } catch {}
  return updated;
}

export async function deleteResource(id: string) {
  const deleted = await prisma.resource.delete({
    where: { id },
  });
  try {
    revalidateTag(RESOURCES_TAG, { expire: 0 });
  } catch {}
  return deleted;
}
