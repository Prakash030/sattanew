import React from "react";
import Chart from "../components/Chart";
import { useRouter } from "next/router";

const ResultCharts = () => {

  const router = useRouter();
  const { gameName, chartType, isAdmin } = router.query;
  const isAdminVal = isAdmin == 'true' ? true : false;
  const gameNameVal = gameName as string;
  const chartTypeVal = chartType as string;

  return (
    <div style={{backgroundColor:"orange"}}>
      <Chart gameName={gameNameVal} chartType={chartTypeVal} isAdmin={isAdminVal} />
    </div>
  );
};

export default ResultCharts;
