import { MerchantInfo } from "@/app/dto/merchant";
import { Merchant } from "@/app/models/merchant";
import { prisma } from "@/db/client";
import { currentUser } from "@clerk/nextjs/server";

export async function saveInfo(merchant: MerchantInfo): Promise<Merchant> {
  const loggedUser = await currentUser();

  if (!loggedUser) throw new Error("Unauthorized");
  const result: Merchant = await prisma.merchant.create({
    data: {
      id: loggedUser.id,
      ...merchant,
    },
  });
  return result;
}

export async function saveImage(imageUrl: string): Promise<Merchant> {
  const loggedUser = await currentUser();
  if (!loggedUser) throw new Error("Unauthorized");
  const result: Merchant = await prisma.merchant.update({
    where: {
      id: loggedUser.id,
    },
    data: {
      profileImage: imageUrl,
    },
  });
  return result;
}
