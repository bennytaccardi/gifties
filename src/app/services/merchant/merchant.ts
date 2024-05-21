import { MerchantInfo } from "@/app/dto/merchant";
import { Merchant } from "@/app/models/merchant";
import { prisma } from "@/db/client";
import { ErrorValues } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";

export async function saveInfo(merchant: MerchantInfo): Promise<Merchant> {
  const loggedUser = await currentUser();
  if (!loggedUser) throw new Error(ErrorValues.UNHAUTHORIZED);
  try {
    const result: Merchant = await prisma.merchant.create({
      data: {
        id: loggedUser.id,
        ...merchant,
      },
    });
    return result;
  } catch (err) {
    if (
      err instanceof Prisma.PrismaClientKnownRequestError &&
      err.code === "SQLITE_CONSTRAINT"
    ) {
      throw new Error(ErrorValues.UNIQUE_CONSTRAINT_VIOLATION);
    }
    throw new Error(ErrorValues.INTERNAL_SERVER_ERROR);
  }
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
