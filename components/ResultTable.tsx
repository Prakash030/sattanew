import React, { useEffect, useState } from "react";

interface Result {
  dayOfWeek: string;
  results: Record<string, number | null>;
}

type ResultsMap = Record<string, Result>;

interface ResultTableProps {
  isAdmin: boolean;
  gameName: string;
  chartType: string;
}

const formatDate = (date: Date): string => {
  const options = { year: "numeric", month: "numeric", day: "numeric" };
  return new Date(date).toLocaleDateString("en-US", options);
};

const ResultTable: React.FC<ResultTableProps> = ({
  isAdmin,
  gameName,
  chartType,
}) => {
  const today = new Date();
  const lastTwoMonths = new Date(today.getFullYear(), today.getMonth() - 4, 1);


  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(
          `/api/getChartData?gameName=${gameName}&chartType=${chartType}`, 
          {
            method: "GET",
          }
        );
  
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to get game data");
        }
  
        const resultData = await response.json();
        // console.log("resultData", resultData.table);
  
        // Convert the resultData array to the ResultsMap structure
        const formattedResults: ResultsMap = {};
  
        resultData.table.forEach((result: any) => {
          const formattedDate = formatDate(new Date(result.date));
  
          if (!(formattedDate in formattedResults)) {
            formattedResults[formattedDate] = {
              dayOfWeek: result.dayOfWeek,
              results: {},
            };
          }
  
          formattedResults[formattedDate].results[result.dayOfWeek] =
            result.value !== null ? parseInt(result.value, 10) : null;
        });
  
        setResults((prevResults) => ({
          ...prevResults,
          ...formattedResults,
        }));
  
        // console.log("formattedResults", formattedResults);
      } catch (error) {
        console.error("Error getting game data:", error);
      }
    };
  
    fetchResults();
  }, [gameName, chartType]);
  

  const generateInitialResults = (
    startDate: string,
    endDate: string,
    interval: number
  ): ResultsMap => {
    const initialResults: ResultsMap = {};
    let currentDate = new Date(startDate);
  
    while (currentDate <= new Date(endDate)) {
      const formattedDate = formatDate(currentDate);
      const dayOfWeek = new Intl.DateTimeFormat("en-US", {
        weekday: "short",
      }).format(currentDate);
      initialResults[formattedDate] = { dayOfWeek, results: {} };
      
      // Move to the next date with the specified interval (default is 6 days)
      currentDate.setDate(currentDate.getDate() + interval);
    }
  
    return initialResults;
  };
  
  const [results, setResults] = useState<ResultsMap>(() =>
  generateInitialResults(formatDate(lastTwoMonths), formatDate(today), 7)
);

console.log("results",results);


  const handleResultChange = (
    date: string,
    dayOfWeek: string,
    newValue: number | null
  ) => {
    setResults((prevResults) => ({
      ...prevResults,
      [date]: {
        ...prevResults[date],
        results: {
          ...prevResults[date].results,
          [dayOfWeek]: newValue,
        },
      },
    }));
  };

  const handleButtonClick = async (date: string, dayOfWeek: string) => {
    const value = String(results[date].results[dayOfWeek]);
    console.log(`Value for ${date} - ${dayOfWeek}: ${value}`);

    try {
      const formData = {
        gameName,
        chartType,
        date,
        dayOfWeek,
        value,
      };
      const queryString = new URLSearchParams(formData).toString();

      const response = await fetch(`/api/updateChart?${queryString}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update table");
      }

      console.log("Table Updated successfully!");
    } catch (error) {
      console.error("Error Updating Table:", error);
    }
  };

  const renderDateRange = (startDate: string): string => {
    const start = new Date(startDate);
    const end = new Date(start);
    end.setDate(end.getDate() + 6); // 7 days later

    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return `${start.toLocaleDateString(
      "en-in",
      options
    )} - ${end.toLocaleDateString("en-in", options)}`;
  };

  return (
    <table border="1" className="bg">
      <thead>
        <tr>
          <th>Date Range</th>
          <th>Mon</th>
          <th>Tue</th>
          <th>Wed</th>
          <th>Thu</th>
          <th>Fri</th>
          <th>Sat</th>
          <th>Sun</th>
        </tr>
      </thead>
      <tbody>
      {Object.entries(results).reverse().map(
          ([startDate, { dayOfWeek, results: dayResults }]) => (
            <tr key={startDate}>
              <td>{renderDateRange(startDate)}</td>
              <td>
                <input
                  type="number"
                  value={dayResults.Mon !== undefined ? dayResults.Mon : ""}
                  onChange={(e) =>
                    handleResultChange(
                      startDate,
                      "Mon",
                      e.target.value !== ""
                        ? parseInt(e.target.value, 10)
                        : null
                    )
                  }
                  disabled={!isAdmin} 
                  style={{color:'black', fontWeight:"bold", textAlign:"center"}}
                  
                />
                {isAdmin && (
                  <button onClick={() => handleButtonClick(startDate, "Mon")}>
                    Get Value
                  </button>
                )}
              </td>
              <td>
                <input
                  type="number"
                  value={dayResults.Tue !== undefined ? dayResults.Tue : ""}
                  onChange={(e) =>
                    handleResultChange(
                      startDate,
                      "Tue",
                      e.target.value !== ""
                        ? parseInt(e.target.value, 10)
                        : null
                    )
                  }
                  disabled={!isAdmin} 
                  style={{color:'black', fontWeight:"bold", textAlign:"center"}}
                />
                {isAdmin && (
                  <button onClick={() => handleButtonClick(startDate, "Tue")}>
                    Get Value
                  </button>
                )}
              </td>
              <td>
                <input
                  type="number"
                  value={dayResults.Wed !== undefined ? dayResults.Wed : ""}
                  onChange={(e) =>
                    handleResultChange(
                      startDate,
                      "Wed",
                      e.target.value !== ""
                        ? parseInt(e.target.value, 10)
                        : null
                    )
                  }
                  disabled={!isAdmin} 
                  style={{color:'black', fontWeight:"bold", textAlign:"center"}}
                />
                {isAdmin && (
                  <button onClick={() => handleButtonClick(startDate, "Wed")}>
                    Get Value
                  </button>
                )}
              </td>
              <td>
                <input
                  type="number"
                  value={dayResults.Thu !== undefined ? dayResults.Thu : ""}
                  onChange={(e) =>
                    handleResultChange(
                      startDate,
                      "Thu",
                      e.target.value !== ""
                        ? parseInt(e.target.value, 10)
                        : null
                    )
                  }
                  disabled={!isAdmin} 
                  style={{color:'black', fontWeight:"bold", textAlign:"center"}}
                />
                {isAdmin && (
                  <button onClick={() => handleButtonClick(startDate, "Thu")}>
                    Get Value
                  </button>
                )}
              </td>
              <td>
                <input
                  type="number"
                  value={dayResults.Fri !== undefined ? dayResults.Fri : ""}
                  onChange={(e) =>
                    handleResultChange(
                      startDate,
                      "Fri",
                      e.target.value !== ""
                        ? parseInt(e.target.value, 10)
                        : null
                    )
                  }
                  disabled={!isAdmin} 
                  style={{color:'black', fontWeight:"bold", textAlign:"center"}}
                />
                {isAdmin && (
                  <button onClick={() => handleButtonClick(startDate, "Fri")}>
                    Get Value
                  </button>
                )}
              </td>
              <td>
                <input
                  type="number"
                  value={dayResults.Sat !== undefined ? dayResults.Sat : ""}
                  onChange={(e) =>
                    handleResultChange(
                      startDate,
                      "Sat",
                      e.target.value !== ""
                        ? parseInt(e.target.value, 10)
                        : null
                    )
                  }
                  disabled={!isAdmin} 
                  style={{color:'black', fontWeight:"bold", textAlign:"center"}}
                />
                {isAdmin && (
                  <button onClick={() => handleButtonClick(startDate, "Sat")}>
                    Get Value
                  </button>
                )}
              </td>
              <td>
                <input
                  type="number"
                  value={dayResults.Sun !== undefined ? dayResults.Sun : ""}
                  onChange={(e) =>
                    handleResultChange(
                      startDate,
                      "Sun",
                      e.target.value !== ""
                        ? parseInt(e.target.value, 10)
                        : null
                    )
                  }
                  disabled={!isAdmin} 
                  style={{color:'black', fontWeight:"bold", textAlign:"center"}}
                />
                {isAdmin && (
                  <button onClick={() => handleButtonClick(startDate, "Sun")}>
                    Get Value
                  </button>
                )}
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};

export default ResultTable;
