import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  gameName: string;
  gameNumber: string;
  gameTiming: string;
}

const isPlayButtonEnabled = (gameTiming: string): boolean => {
  const matchResult = gameTiming.match(
    /(\d+):(\d+)\s(AM|PM)\sto\s(\d+):(\d+)\s(AM|PM)/i
  );

  if (!matchResult) {
    return false;
  }

  const [, startHour, startMinute, startPeriod, endHour, endMinute, endPeriod] =
    matchResult;
  const isAM = (period: string) => period.toLowerCase() === "am";

  const currentDateTime = new Date();
  

  const convertTo24HourFormat = (hour: string, period: string) => {
    let resultHour = parseInt(hour, 10);
    if (!isAM(period) && resultHour !== 12) {
      resultHour += 12;
    }
    return resultHour;
  };

  const startTime = new Date();
  startTime.setHours(
    convertTo24HourFormat(startHour, startPeriod),
    parseInt(startMinute, 10),
    0,
    0
  );

  const endTime = new Date();
  endTime.setHours(
    convertTo24HourFormat(endHour, endPeriod),
    parseInt(endMinute, 10),
    0,
    0
  );

  return currentDateTime >= startTime && currentDateTime <= endTime;
};


const GameBar = ({ gameName, gameNumber, gameTiming }: Props) => {
  const customGames = ["SIVAJI", "SIVA", "SIVAJI_NIGHT"];
  const isButtonEnabled = isPlayButtonEnabled(gameTiming);
  const [isAdmin,setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/getUser`, {
          method: "GET",
        });

        if (!response.ok) {
          console.error("Error fetching user data:");
          return;
        }

        const user = await response.json();

        if (user.result.role == "admin") {
          setIsAdmin(true);
          
        }
      } catch (error) {
        console.error("Error handling result fetch:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div
        className={`bg-${
          customGames.includes(gameName) ? "yellow-200" : "white"
        } flex justify-between my-2`}
      >
        <div className="flex">
          <Link
            href={`http://localhost:3000/ResultCharts?gameName=${gameName}&chartType=PANEL CHART&isAdmin=${isAdmin}`}
          >
            <div className="bg-red-800 mx-4 my-4 p-4 rounded-full text-2xl font-extrabold font-serif button">
              Panel
            </div>
          </Link>
          <Link
            href={`http://localhost:3000/ResultCharts?gameName=${gameName}&chartType=JODI CHART&isAdmin=${isAdmin}`}
          >
            <div className="bg-red-800  my-4 p-4 rounded-full text-2xl font-extrabold font-serif button">
              Jodi
            </div>
          </Link>
        </div>
        <div className="flex flex-col text-black font-extrabold text-2xl log">
          <p>{gameName}</p>
          <p>{gameNumber}</p>
          <p>{gameTiming}</p>
        </div>
        <div className="flex  items-center">
          <p className="text-lg font-semibold text-gray-500 log">
            {isButtonEnabled
              ? "Betting is running !!!"
              : "Betting is closed !!!"}
          </p>

          <Link href={`/gameList?gameName=${gameName}&gameTiming=${gameTiming}`}>
            <button
              className={`bg-red-800 mx-4 my-4 p-4 rounded-full text-2xl font-extrabold font-serif flex ${
                isButtonEnabled ? "button" : "cursor-not-allowed opacity-50 button"
              }`}
              disabled={!isButtonEnabled}
            >
              Play
              <Image
                src="/vector3.svg"
                width={35}
                height={35}
                alt="Arrow Icon"
                className="p-2 bg-white rounded-full ml-2 text-red-700"
              />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GameBar;
