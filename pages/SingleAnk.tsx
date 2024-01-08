import React, { FormEvent } from "react";
import "../styles.css";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";

const SingleAnk = () => {
  const [openAnk, setOpenAnk] = React.useState("");
  const [closeAnk, setCloseAnk] = React.useState("");

  const router = useRouter();
  const { gameName, gameType, gameTiming } = router.query;
  const cookies = parseCookies();
  const user = cookies.userCredentials
    ? JSON.parse(cookies.userCredentials)
    : "";
  const userEmail = user.email;

  interface FormData {
    [key: string]: string;
  }

  interface GameOdds {
    [key: string]: number;
  }

  const gameOdds: GameOdds = {
    SINGLE_ANK: 9,
    JODI: 15,
    SINGLE_PATTI: 90,
    DOUBLE_PATTI: 300,
    TRIPPLE_PATTI: 900,
  };

  const isPlayButtonEnabled = (gameTiming: string): boolean => {
    const matchResult = gameTiming?.match(
      /(\d+):(\d+)\s(AM|PM)\sto\s(\d+):(\d+)\s(AM|PM)/i
    );

    if (!matchResult) {
      return false;
    }

    const [
      ,
      startHour,
      startMinute,
      startPeriod,
      endHour,
      endMinute,
      endPeriod,
    ] = matchResult;
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

  const isButtonEnabled = isPlayButtonEnabled(gameTiming as string);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData: FormData = {};

    formData["amount"] = String(
      Number(event.target.openAnk.value ? event.target.openAmount.value : 0) +
        Number(event.target.closeAnk.value ? event.target.closeAmount.value : 0)
    );
    formData["digits"] =
      (openAnk == "" ? "-" : openAnk) + (closeAnk == "" ? "-" : closeAnk);
    formData["gameType"] = gameType as string;
    formData["gameName"] = gameName as string;
    formData["player"] = userEmail;
    formData["odds"] = gameOdds[gameType as string].toString();

    try {
      const queryString = new URLSearchParams(formData).toString();

      console.log("querystring", queryString);

      const response = await fetch(`/api/gameSubmit?${queryString}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create game");
      }

      console.log("Game created successfully!");
      alert("Bidding done!!!");
    } catch (error) {
      if ((error as Error)?.message === "Insufficient balance") {
        alert("Insufficient balance. Please add funds before placing your bid.");
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div style={{ marginTop: "20px" }}>
          <span
            style={{
              backgroundColor: "red",
              padding: "10px",
              borderRadius: "20%",
              marginLeft: "45%",
              fontWeight: "bold",
              fontSize: "30px",
              color: "white",
            }}
          >
            Single Ank
          </span>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span
              style={{
                backgroundColor: "gray",
                padding: "10px",
                borderRadius: "20%",
                width: "200px",
                fontWeight: "bold",
                fontSize: "20px",
                textAlign: "center",
              }}
            >
              {gameTiming}
            </span>
            <span
              style={{
                backgroundColor: "gray",
                padding: "10px",
                borderRadius: "20%",
                width: "200px",
                fontWeight: "bold",
                fontSize: "20px",
                textAlign: "center",
              }}
            >
              {gameName}
            </span>
          </div>
        </div>
      </div>
      <div
        className="hrStyle"
        style={{
          marginTop: "50px",
          marginBottom: "50px",
          height: "2px",
          width: "100%",
          background: "#333",
        }}
      ></div>
      <div>
        <div
          className="AnkCardList"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "10px",
            marginLeft: "350px",
          }}
        >
          <div>
            <p
              style={{
                fontWeight: "bold",
                fontSize: "30px",
                marginBottom: "20px",
              }}
            >
              {" "}
              Open Ank{" "}
            </p>
            <input
              type="text"
              style={{
                backgroundColor: "#d0d6d1",
                borderRadius: "10%",
                width: "200px",
                padding: "10px",
              }}
              name="openAnk"
              maxLength={1}
              onChange={(e) => setOpenAnk(e.target.value)}
            />
          </div>

          <div>
            <p
              style={{
                fontWeight: "bold",
                fontSize: "30px",
                marginBottom: "20px",
              }}
            >
              {" "}
              Enter Amount{" "}
            </p>
            <input
              type="text"
              style={{
                backgroundColor: "#d0d6d1",
                borderRadius: "10%",
                width: "200px",
                padding: "10px",
              }}
              name="openAmount"
              disabled={!openAnk}
            />
          </div>

          <div>
            <p
              style={{
                fontWeight: "bold",
                fontSize: "30px",
                marginBottom: "20px",
              }}
            >
              {" "}
              Close Ank{" "}
            </p>
            <input
              type="text"
              style={{
                backgroundColor: "#d0d6d1",
                borderRadius: "10%",
                width: "200px",
                padding: "10px",
              }}
              name="closeAnk"
              maxLength={1}
              onChange={(e) => setCloseAnk(e.target.value)}
            />
          </div>

          <div>
            <p
              style={{
                fontWeight: "bold",
                fontSize: "30px",
                marginBottom: "20px",
              }}
            >
              {" "}
              Enter Amount{" "}
            </p>
            <input
              type="text"
              style={{
                backgroundColor: "#d0d6d1",
                borderRadius: "10%",
                width: "200px",
                padding: "10px",
              }}
              name="closeAmount"
              disabled={!closeAnk}
            />
          </div>
        </div>
      </div>
      <div
        className="hrStyle"
        style={{
          marginTop: "50px",
          marginBottom: "50px",
          height: "2px",
          width: "100%",
          background: "#333",
        }}
      ></div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          marginTop: "50px",
        }}
      >
        <div>
          <input type="reset" />
        </div>
        <div>
          <input type="submit" disabled={!isButtonEnabled} />
        </div>
      </div>
    </form>
  );
};

export default SingleAnk;
