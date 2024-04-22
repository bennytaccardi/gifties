import { MerchantInfo } from "@/app/dto/merchant";
import { Merchant } from "@/app/models/merchant";
import { prisma } from "@/db/client";

export async function saveInfo(merchant: MerchantInfo): Promise<Merchant> {
  const result: Merchant = await prisma.merchant.update({
    where: {
      id: 1,
    },
    data: {
      storeDescription: merchant.storeDescription,
    },
  });
  return result;
}
