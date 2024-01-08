import React, { FormEvent, useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { NextApiRequest, NextApiResponse } from "next";
import "../styles.css";
import getUser from "./api/getUser";

interface FormData {
  [key: string]: string;
}

function AdminPanel() {
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

        if (user.result.role !== "admin") {
          window.location.href = "/";
        }
      } catch (error) {
        console.error("Error handling result fetch:", error);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   if (role !== "admin") {
  //     window.location.href = "/";
  //   }
  // }, [role]);

  const games = [
    "MILAN_MORNING",
    "SIVAJI",
    "KALYAN_MORNING",
    "SRIDEVI",
    "SIVA",
    "MADHUR_DAY",
    "MILAN_DAY",
    "KALYAN",
    "MAHARANI_DAY",
    "SIVAJI_NIGHT",
    "SRIDEVI_NIGHT",
    "MADHUR_NIGHT",
    "MILAN_NIGHT",
    "MAIN_BAJAR",
    "MAHARANI_NIGHT",
  ];

  const handleVerify = async () => {
    try {
      const response = await fetch(`/api/verifyResult`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to get game data");
      }

      console.log("Check done!!!!");
      alert("Check done!!!!");
    } catch (error) {
      console.error("Error getting game data:", error);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData: FormData = {};

    games.forEach((game) => {
      const gameKey = game.replace(/\s/g, "_");
      formData[gameKey] = (event.target as any)[game].value;
    });

    try {
      const queryString = new URLSearchParams(formData).toString();

      const response = await fetch(`/api/createResult?${queryString}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create user");
      }

      console.log("Result created successfully!");
      alert("Result created successfully!");
    } catch (error) {
      console.error("Error creating Result:", error);
    }
  };

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        {games.map((game, index) => (
          <div className="input-container" key={index}>
            <label>{game}</label>
            <input type="text" name={game} />
          </div>
        ))}

        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form" style={{ overflow: "scroll" }}>
        <div className="title">Results</div>
        {renderForm}
        <div>
          <button onClick={handleVerify}>Check</button>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
