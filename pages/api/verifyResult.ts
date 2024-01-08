import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../db";
import verifyResult from "@/services/verifyResult.service";
import { parseCookies } from "nookies";

dbConnect();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { userCredentials } = parseCookies({ req });
    const user = JSON.parse(userCredentials);

    console.log("player",user?.email);
    const player = user?.email

    const result = await verifyResult({
      player
    });
    res.status(201).json({ success: true, result });
  } catch (error) {
    console.error("Error handling user creation:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}
