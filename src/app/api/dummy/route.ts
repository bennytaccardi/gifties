import { client } from "@/db/client";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest): Promise<Response> {
  const { action, payload } = await request.json();
  if (action === "add") {
    const result = await client.execute("SELECT * from gifter");
    return new Response(JSON.stringify(result.rows), {
      status: 200,
    });
  }
  return new Response("Action not supported", {
    status: 500,
  });
}
