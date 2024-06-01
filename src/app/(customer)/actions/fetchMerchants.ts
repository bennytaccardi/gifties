"use server";

import { fetchAllMerchants } from "@/app/services/merchant/merchant";
import { Merchant } from "@prisma/client";

export async function fetchMerchants(): Promise<Merchant[]> {
  try {
    return await fetchAllMerchants();
  } catch (e) {
    console.error("Lets see if there are error :) ");
    throw new Error("Internal server error");
  }
}
