import { NextApiRequest } from "next";

import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export const currentProfilePages = async (req: any, res: any) => {
  console.log("hahwa hna ");
  const session = await getServerSession(req, res, authOptions);

  console.log("daz hna");
  if (!session) {
    return null;
  }

  //@ts-ignore
  console.log("session", session?.user.walletId);
  //@ts-ignore
  const walletId = session?.user.walletId;

  if (!walletId) {
    return null;
  }

  const profile = await db.profile.findUnique({
    where: {
      userId: walletId,
    },
  });

  return profile;
};
