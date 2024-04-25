import { MerchantInfo } from "@/app/dto/merchant";
import { Merchant } from "@/app/models/merchant";
import { prisma } from "@/db/client";

export async function saveInfo(merchant: MerchantInfo): Promise<Merchant> {
  // const userID = clerkClient.users.getUser()
  const result: Merchant = await prisma.merchant.create({
    data: {
      ...merchant,
    },
  });
  return result;
}
