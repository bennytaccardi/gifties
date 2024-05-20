"use server";

import { errorMapping } from "@/lib/utils";

export async function removePreview(imagePath: string | undefined) {
  if (!imagePath) return {};
  try {
    await fetch("https://uploadthing.com/api/deleteFile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Uploadthing-Api-Key": process.env.UPLOADTHING_SECRET!,
        "X-Uploadthing-Version": process.env.UPLOADTHING_VERSION!,
      },
      body: JSON.stringify({
        fileKeys: [imagePath],
      }),
    });
    return { data: "ok" };
  } catch (err) {
    const localError = err as Error;
    return {
      error: localError.message,
      status: errorMapping(localError.message),
    };
  }
}
