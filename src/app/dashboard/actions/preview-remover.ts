"use server";

import { REMOVE_IMAGE_UPLOADTHING } from "@/lib/constants";
import { errorMapping } from "@/lib/utils";

export async function removePreview(imagePath: string | undefined) {
  if (!imagePath) return {};
  try {
    await fetch(REMOVE_IMAGE_UPLOADTHING, {
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
