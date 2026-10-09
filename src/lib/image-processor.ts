import sharp from "sharp";

export interface ProcessedImageResult {
  buffer: Buffer;
  width?: number;
  height?: number;
  fileSize: number;
  mimeType: "image/webp";
}

/**
 * Compresses an image buffer, auto-orients, resizes to max width, strips metadata,
 * and converts to WebP format.
 */
export async function processAndCompressImage(
  inputBuffer: Buffer,
  maxWidth = 1920
): Promise<ProcessedImageResult> {
  const image = sharp(inputBuffer);
  const metadata = await image.metadata();

  let pipeline = image.rotate(); // auto-rotate based on EXIF orientation

  // Downscale only if larger than maxWidth to avoid degrading smaller icons/logos
  if (metadata.width && metadata.width > maxWidth) {
    pipeline = pipeline.resize({
      width: maxWidth,
      withoutEnlargement: true,
      fit: "inside",
    });
  }

  // Convert to WebP with balanced quality & compression effort
  const outputBuffer = await pipeline
    .webp({
      quality: 80,
      effort: 4,
    })
    .toBuffer();

  const finalMeta = await sharp(outputBuffer).metadata();

  return {
    buffer: outputBuffer,
    width: finalMeta.width,
    height: finalMeta.height,
    fileSize: outputBuffer.length,
    mimeType: "image/webp",
  };
}
