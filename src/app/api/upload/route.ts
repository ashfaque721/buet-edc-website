import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { processAndCompressImage } from "@/lib/image-processor";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate mime type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "File must be an image" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const inputBuffer = Buffer.from(arrayBuffer);

    // Optional maxWidth parameter from query or form
    const maxWidth = Number(formData.get("maxWidth")) || 1920;

    // Process & compress to WebP using Sharp
    const processed = await processAndCompressImage(inputBuffer, maxWidth);

    // Persist binary WebP buffer to Neon Postgres
    const imageRecord = await prisma.uploadedImage.create({
      data: {
        fileName: file.name.replace(/\.[^/.]+$/, "") + ".webp",
        mimeType: processed.mimeType,
        fileSize: processed.fileSize,
        width: processed.width,
        height: processed.height,
        data: new Uint8Array(processed.buffer),
      },
      select: {
        id: true,
        fileName: true,
        fileSize: true,
        width: true,
        height: true,
        mimeType: true,
        createdAt: true,
      },
    });

    const imageUrl = `/api/images/${imageRecord.id}`;

    return NextResponse.json({
      success: true,
      url: imageUrl,
      image: imageRecord,
    });
  } catch (error) {
    console.error("Image upload/compression error:", error);
    return NextResponse.json(
      { error: "Failed to process and compress image" },
      { status: 500 }
    );
  }
}
