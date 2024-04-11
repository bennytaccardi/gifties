import { client } from "@/db/client";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest): Promise<boolean> {
  const { action, payload } = await request.json();
  console.log(JSON.stringify(payload));
  if (action === "add") {
    try {
      const result = await client.execute("SELECT * from users");
      console.log(result);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
  return true;
}
