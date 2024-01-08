import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../db";
import getTable from "@/services/getChartTable.service";

dbConnect();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    // Extract gameName and chartType from query parameters
    const { gameName, chartType } = req.query;

    // Call getTable function with gameName and chartType
    const table = await getTable({ gameName, chartType });

    res.status(200).json({ success: true, table });
  } catch (error) {
    console.error("Error handling table fetch:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}
