"use client";
import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { parseCookies } from "nookies";
import  getUserInfo  from "../pages/api/getUserInfo"
import "../styles.css";

const Dashboard = () => {
  const [userFetced, setUserFetched] = useState(false);
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState(""); 
  const [balance, setBalance] = useState(0);

  const getUserCredentials = async () => {
    try {
      const response = await fetch(`/api/getUser`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setUserFetched(true);
      } else {
        setUserFetched(false);
      }
    } catch (error) {
      console.error("Error getting user:", error);
    }
  };
  
  useEffect(() => {
    getUserCredentials();
    // console.log(userFetced)
  }, []);

  useEffect(() => {
    const getUser = () => {
      //parse the cookies to get the user details
      const cookies = parseCookies();
      const user = cookies.userCredentials
        ? JSON.parse(cookies.userCredentials)
        : "";
        console.log(user)
      const userEmail = user.email;
      setEmail(userEmail);
    };
    getUser();
  }, []);


  const logout = async () => {
    try {
      const response = await fetch(`/api/logoutUser`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      if (response.ok) {
        setUserFetched(false);
        window.location.reload();
      } else {
        setUserFetched(true);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };


  const getUserDetails = async () => {
    try {
      const cookies = parseCookies();
      const user = cookies.userCredentials ? JSON.parse(cookies.userCredentials) : "";
      const userEmail = user.email;

      const response = await fetch(`/api/getUserInfo?email=${userEmail}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });


      if (response.ok) {
        setUserFetched(true);
        // Handle response data if needed
        const userData = await response.json();
        setUserName(userData.user.name)
        setBalance(userData.user.balance)
      } else {
        setUserFetched(false);
      }
    } catch (error) {
      console.error("Error getting user:", error);
    }
  };

  useEffect(() => {
    if (email) {
      getUserDetails();
    }
  }, [email]);

  return (
    <div className="flex justify-between bg-gray-400 items-center">
      <div className="flex items-center dashboard">
      {userName? (
        <p className="text-blue-700 text-m ml-5 font-bold font-serif log">Hello!! {userName}</p>
      ):(
        <p></p>
      )}
        
      </div>
      <div className="text-black text-3xl font-bold pr-8 head">RRSATTA MATKA</div>
      {/* <button className=" text-blue-700 text-lg mr-8 font-bold font-serif" onClick={}>
        Sign In/Register
      </button> */}
      <div className="flex items-center">
      <Image
          src="/wallet.png"
          width={20}
          height={20}
          alt="Picture of the author"
          className="m-2"
        />
        <p className="text-green-700 text-xl font-bold log">₹{balance}</p>
      </div>
      {userFetced ? (
        <button
          className=" text-blue-700 text-lg mr-8 font-bold font-serif log"
          onClick={logout}
        >
          Logout
        </button>
      ) : (
        <Link href="/signIn">
          <button className=" text-blue-700 text-lg mr-8 font-bold font-serif">
            Sign In/Register
          </button>
        </Link>
      )}
    </div>
  );
};

export default Dashboard;
