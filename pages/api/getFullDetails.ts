import { NextApiRequest, NextApiResponse } from "next";
import { parseCookies } from "nookies";
import getDetails from "@/services/getDetails.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
  try {
    
    const result = await getDetails();

    res.status(200).json({ result });
  } catch (error) {
    console.error("Error handling result fetch:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}
