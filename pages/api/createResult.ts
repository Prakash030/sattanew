import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../db";
import createResult from "@/services/createResult.service";

dbConnect();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const {
      MILAN_MORNING,
      SIVAJI,
      KALYAN_MORNING,
      SRIDEVI,
      SIVA,
      MADHUR_DAY,
      MILAN_DAY,
      KALYAN,
      MAHARANI_DAY,
      SIVAJI_NIGHT,
      SRIDEVI_NIGHT,
      MADHUR_NIGHT,
      MILAN_NIGHT,
      MAIN_BAJAR,
      MAHARANI_NIGHT,
    } = req.query as {
      MILAN_MORNING: string;
      SIVAJI: string;
      KALYAN_MORNING: string;
      SRIDEVI: string;
      SIVA: string;
      MADHUR_DAY: string;
      MILAN_DAY: string;
      KALYAN: string;
      MAHARANI_DAY: string;
      SIVAJI_NIGHT: string;
      SRIDEVI_NIGHT: string;
      MADHUR_NIGHT: string;
      MILAN_NIGHT: string;
      MAIN_BAJAR: string;
      MAHARANI_NIGHT: string;
    };

    // console.log("query req",req.query);

    const result = await createResult({
      MILAN_MORNING,
      SIVAJI,
      KALYAN_MORNING,
      SRIDEVI,
      SIVA,
      MADHUR_DAY,
      MILAN_DAY,
      KALYAN,
      MAHARANI_DAY,
      SIVAJI_NIGHT,
      SRIDEVI_NIGHT,
      MADHUR_NIGHT,
      MILAN_NIGHT,
      MAIN_BAJAR,
      MAHARANI_NIGHT,
    });
    res.status(201).json({ success: true, result });
  } catch (error) {
    console.error("Error handling Result creation:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}
