import { saveInfo } from "@/app/services/merchant/merchant";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { merchant } = await request.json();
    const result = await saveInfo(merchant);

    return NextResponse.json({ data: result });
  } catch (err) {
    return NextResponse.error();
  }
}
