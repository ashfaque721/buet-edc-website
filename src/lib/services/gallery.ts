import { unstable_cache, revalidateTag } from "next/cache";
import { prisma } from "@/lib/prisma";

export const GALLERY_TAG = "gallery";

export const getCachedGalleryPhotos = unstable_cache(
  async () => {
    return prisma.galleryPhoto.findMany({
      orderBy: { eventDate: "desc" },
    });
  },
  ["gallery-photos-all"],
  { tags: [GALLERY_TAG], revalidate: 3600 }
);

export async function createGalleryPhoto(data: {
  imageUrl: string;
  caption: string;
  eventDate: Date;
  eventName?: string;
  showOnHomepage?: boolean;
}) {
  const created = await prisma.galleryPhoto.create({
    data,
  });
  try {
    revalidateTag(GALLERY_TAG, { expire: 0 });
  } catch {}
  return created;
}

export async function updateGalleryPhoto(
  id: string,
  data: Partial<{
    imageUrl: string;
    caption: string;
    eventDate: Date;
    eventName: string;
    showOnHomepage: boolean;
  }>
) {
  const updated = await prisma.galleryPhoto.update({
    where: { id },
    data,
  });
  try {
    revalidateTag(GALLERY_TAG, { expire: 0 });
  } catch {}
  return updated;
}

export async function deleteGalleryPhoto(id: string) {
  const deleted = await prisma.galleryPhoto.delete({
    where: { id },
  });
  try {
    revalidateTag(GALLERY_TAG, { expire: 0 });
  } catch {}
  return deleted;
}
