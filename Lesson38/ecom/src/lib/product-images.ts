/** Vercel Blob server upload limit — https://vercel.com/docs/vercel-blob/server-upload */
export const MAX_IMAGE_BYTES = 4.5 * 1024 * 1024;

export const MAX_IMAGE_MB = MAX_IMAGE_BYTES / 1024 / 1024;

export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
] as const;

export const ACCEPTED_IMAGE_TYPES_SET = new Set<string>(ACCEPTED_IMAGE_TYPES);

export const ACCEPTED_IMAGE_ACCEPT_ATTR = ACCEPTED_IMAGE_TYPES.join(",");
