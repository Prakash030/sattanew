"use client";

import React, { useEffect, useState } from "react";
import Dashboard from "@/components/Dashboard";
import WalletButtonsWithImage from "@/components/WalletButtonsWithImage";
import GameBar from "@/components/GameBar";
import Image from "next/image";
import "../styles.css";

interface GameResult {
  gameName: string;
  gameNumber: string;
}


const gamesTimings: { [key: string]: string } = {
  "MILAN_MORNING": "10:15 am to 11:15 am",
  "SIVAJI": "11:30 am to 12:30 pm", //highlight
  "KALYAN_MORNING": "11:00 am to 12:00 pm",
  "SRIDEVI": "11:35 am to 12:35 pm",
  "SIVA": "12:30 pm to 01:30 pm",// – Highlight with yellow
  "MADHUR_DAY": "1:30 pm to 2:30 pm",
  "MILAN_DAY": "2:15 pm to 04:15 pm",
  "KALYAN": "3:45 pm to 5:45 pm",
  "MAHARANI_DAY": "5:15 pm to 7:15 pm",
  "SIVAJI_NIGHT": "7:00 pm to 8:00 pm",// – Highlight with yellow
  "SRIDEVI_NIGHT": "7:00 pm to 8:00 pm",
  "MADHUR_NIGHT": "8:30 pm to 10:30 pm",
  "MILAN_NIGHT": "9:00 pm to 11:00 pm",
  "MAIN_BAJAR": "9:35 pm to 12:05 am",
  "MAHARANI_NIGHT": "10:15 pm to 12:15 am"
};

export default function HomePage() {
  const [gameResults, setGameResults] = useState<{ [gameName: string]: string }>({});

  useEffect(() => {
    const fetchResults = async () => {
      // console.log("yes, I am called");
      try {
        const response = await fetch(`/api/getResult`, {
          method: "GET",
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to get game data");
        }

        const resultData = await response.json();
        // console.log("resultData", resultData.result);

        // Convert the result object into an array
        const resultArray: GameResult[] = Object.entries(resultData.result).map(
          ([gameName, gameNumber]) => ({
            gameName,
            gameNumber: gameNumber as string,
          })
        );

        // Map from the 2nd element to the 3rd last element
        const mappedResults = resultArray.slice(1, -3);

        // Convert the array of objects to an object with game names as keys
        const newGameResults = mappedResults.reduce((acc, { gameName, gameNumber }) => {
          acc[gameName] = gameNumber;
          return acc;
        }, {} as { [gameName: string]: string });

        setGameResults(newGameResults);
      } catch (error) {
        console.error("Error getting game data:", error);
      }
    };

    fetchResults();
  }, []);

  function padGameNumber(gameNumber: string): string {
    const paddedGameNumber = gameNumber.padEnd(8, "x");
    return `${paddedGameNumber.slice(0, 3)}-${paddedGameNumber.slice(3, 5)}-${paddedGameNumber.slice(5)}`;
  }

  return (
    <div className="bg-red-800">
      <Dashboard />
      <WalletButtonsWithImage />
      <div className="bg-red-800">
        <div className="bg-purple-600 rounded-full flex items-center justify-center h-16 text-yellow-300 text-3xl font-extrabold mt-2">
          Live Results !!!
        </div>

        {Object.keys(gameResults).length > 0 ? (
        Object.entries(gameResults).map(([gameName, gameNumber]) => (
          <GameBar
            key={gameName}
            gameName={gameName}
            gameNumber={padGameNumber(gameNumber)}
            gameTiming={gamesTimings[gameName]}
          />
        ))
      ) : (
        <p>Loading...</p>
      )}
      <div className=" flex items-center justify-center flex-col mt-4">
        <div className="w-1/2 bg-white text-3xl font-extrabold text-black rounded-full flex items-center justify-center py-2 log">
          FREQUENTLY ANSWERED QUESTIONS ??
        </div>
        <div className="bg-blue-900 my-4 h-auto w-full">
          <p className="m-0 flex items-center justify-center">
            {" "}
            Q1: How can I win Matka ?
          </p>
          <p className="m-0">
            Ans: Satta matka is the game of numbers where we choose a number to
            bid on and earn better. There are some set rules which we need to
            follow like start betting with fewer amounts, this will keep you at
            low risk. Second is, control your temptation when you are losing
            continuously.
          </p>
        </div>
        <div className="bg-blue-900 my-4 h-auto w-full">
          <p className="m-0 flex items-center justify-center">
            {" "}
            Q2: How can I get Satta number ?
          </p>
          <p className="m-0">Ans: Satta numbers are chosen like</p>
          <ul className="m-0 pl-[29px]">
            <li className="mb-0">
              3 random numbers are chosen from 0 to 9 which are called OPEN. Let
              say we got 2, 5 and 9
            </li>
            <li className="mb-0">
              These numbers are added then like 2 + 5 + 9 = 16
            </li>
            <li className="mb-0">
              If addition goes above 10 then last digit is considered. Here 6
            </li>
            <li className="mb-0">
              In same way another number is calculated which is called CLOSE.
              Let say we got 8, 0 and 3. So 8 + 0 + 3 = 11. Then close digit is
              1
            </li>
            <li>Final number will be 61</li>
          </ul>
        </div>
        <div className="bg-blue-900 my-4 h-auto w-full">
          <p className="m-0 flex items-center justify-center">
            {" "}
            Q3: How Satta Matka Works ?
          </p>
          <p className="m-0">{`Ans: There are so many Satta companies running Satta Matka games & drawing results / day. A random number drawn by Satta Company persons and if you are lucky & this is the same number on which you bet then you will be paid multiple times of your actual money.`}</p>
        </div>
        <div className="bg-blue-900 my-4 h-auto w-full">
          <p className="m-0 flex items-center justify-center">
            {" "}
            Q4: What is Satta Matka ?
          </p>
          <p className="m-0">
            Ans: If you ever heard this word SATTA, you must be aware about the
            complete phrase satta matka. Actually Satta Matka is a form of
            gambling originated in India before independence. Modern days Satta
            Mtka is based on numbers which has been gueesed by player to win.
            The winning player is known as Satta King.
          </p>
        </div>
      </div>

      <div className="bg-red-950 my-4 h-auto w-full">
        <p className="m-0 flex items-center justify-center">
          <b> DISCLAIMER:-</b>
        </p>
        <p className="m-0 font-itim">
          Viewing This WebSite Is On Your Own Risk.. All The information Shown
          On Website Is Based on Numerology and Astrology for Information
          Purposes .. We Are Not Associated with Any Illegal Matka Business or
          Gamblers.. We Warn You That Matka Gambling in Your Country May be
          Banned or Illegal... We Are Not Responsible For Any Issues or Scam...
          We Respect All Country Rules/Laws... If You Not Agree With Our Site
          Disclaimer... Please Quit Our Site Right Now.
          Copying/Promoting/Publishing Any of Our Content in Any Type Of Media
          or Other Source is Illegal and against Law.
        </p>
        <Image
          src="/bottomBar.jpeg"
          width={2000}
          height={50}
          alt="Picture of the author"
        />
      </div>
      </div>
      <div></div>
    </div>
  );
}
