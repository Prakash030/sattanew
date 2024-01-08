import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../db";
import updateBalance from "@/services/updateBalance.service";
import getUser from "@/services/getUser.service";

dbConnect();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { player, gameName, gameType, amount, digits,odds } = req.query as unknown as {
      player: string;
      gameName: string;
      gameType: string;
      amount: number;
      digits: string;
      odds:number;
    };

    const user = await getUser(player);
    const userBalance = user.balance;

    console.log("testapi",player,amount,digits);

    if (userBalance < amount) {
      return res.status(400).json({ success: false, error: "Insufficient balance" });
    }

    const result = await updateBalance({
      player,
      gameName,
      gameType,
      amount,
      digits,
      odds,
      isVerified:false,
    });
    res.status(201).json({ success: true, result });
  } catch (error) {
    console.error("Error handling user creation:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}
