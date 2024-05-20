import { saveInfo } from "@/app/services/merchant/merchant";
import { errorMapping, ErrorValues } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { merchant } = await request.json();
    const result = await saveInfo(merchant);

    return NextResponse.json({ data: result });
  } catch (err) {
    const localError = err as Error;
    return NextResponse.json(
      { error: localError.message },
      { status: errorMapping(localError.message) }
    );
  }
}
