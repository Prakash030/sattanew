import { NextApiRequest, NextApiResponse } from "next";
import { parseCookies } from "nookies";
import getGame from "@/services/getGame.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  try {
    const { userCredentials } = parseCookies({ req });
    const user = userCredentials && JSON.parse(userCredentials);
    const email = user.email as string;
    const result = await getGame(email);
    console.log("result", result);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error handling result fetch:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}
