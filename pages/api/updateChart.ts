import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../db";
import chartTable from "@/services/chartTable.service";

dbConnect();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { date, chartType, gameName, value,dayOfWeek } = req.query as {
      date: string;
      chartType: string;
      gameName: string;
      value: string;
      dayOfWeek:string;
    };

    console.log("query req",req.query);

    const result = await chartTable({
      date,
      chartType,
      gameName,
      value,
      dayOfWeek,
    });
    res.status(201).json({ success: true, result });
  } catch (error) {
    console.error("Error handling Result creation:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}
