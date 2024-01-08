import { tableModel } from "@/models/table.model";

interface Props {
  gameName?: string;
  chartType?: string;
}

const getTable = async ({ gameName, chartType }: Props) => {
  // Build the query based on the provided parameters
  const query = {
    gameName: "",
    chartType: "",
  };
  if (gameName) {
    query.gameName = gameName;
  }
  if (chartType) {
    query.chartType = chartType;
  }

  // Execute the query with the provided parameters
  const res = await tableModel().find(query);

  if (!res) {
    throw new Error("Table does not exist");
  }

  return res;
};

export default getTable;
