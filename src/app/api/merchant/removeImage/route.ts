import { errorMapping } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { imagePath } = await request.json();
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
    return NextResponse.json({ data: "ok" });
  } catch (err) {
    const localError = err as Error;
    console.error(localError);
    return NextResponse.json(
      { error: localError.message },
      { status: errorMapping(localError.message) }
    );
  }
}
