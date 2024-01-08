"use client"

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import "../styles.css";


const WalletButtonsWithImage = () => {
  const [userFetced, setUserFetched] = useState<boolean>(false);
  const handleWithdraw = () => {
    // Client-side logic for withdrawal
    alert("Contact 9876543210 for WithDrawl !!!");
  };

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


  // Use useEffect for client-side logic
  useEffect(() => {
    // Any client-side logic you want to perform when the component mounts

    // For example, you can add an event listener
    const handleClick = () => {
      console.log("Component clicked!");
    };

    document.addEventListener("click", handleClick);

    // Cleanup the event listener when the component is unmounted
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []); // Empty dependency array to run the effect only once on mount



  const renderButtons = (
    <div className="flex justify-between text-3xl bg-yellow-200 h-20">
      {/* Use dynamic import for client-side components */}
      <Link href="/addMoney" className="bg-red-800 hover:bg-blue-700 text-white font-bold  px-4 rounded-full m-2 pt-4 button">
        <button>
          Add To Wallet
        </button>
      </Link>
      <Link href="/balance" className="bg-red-800 hover:bg-blue-700 text-white font-bold  px-4 rounded-full m-2 pt-4 button">
        <button>
          Transactions
        </button>
      </Link>
      {typeof window !== "undefined" && (
         // Check if running on the client side
         <Link href='/walletPage' className="bg-red-800 hover:bg-blue-700 text-white font-bold  px-4 rounded-full m-2 flex button">
        <button
          
          // onClick={handleWithdraw}
        >
          Withdraw
        </button>
        </Link>
      )}
    </div>
  );

  return (
    <div style={{ position: "relative" }}>
      <Image
        src="/poster.jpeg"
        width={2000}
        height={50}
        alt="Picture of poster"
        className=""
      />
      {userFetced ? (renderButtons) : (
        <div className="flex justify-between text-3xl bg-yellow-200 h-20">
          {/* Use dynamic import for client-side components */}
          {/* <Link href="https://forms.gle/9umyNHsy4SMDdxrF6" className="bg-red-800 hover:bg-blue-700 text-white font-bold  px-4 rounded-full m-2 pt-4"> */}
          <button className="bg-red-800 hover:bg-blue-700 text-white font-bold  px-4 rounded-full m-2 pt-4 button" onClick={() => alert("Login to add money to your wallet")}>
            Add To Wallet
          </button>
          {/* </Link> */}
          <button className="bg-red-800 hover:bg-blue-700 text-white font-bold  px-4 rounded-full m-2 button" onClick={() => alert("Login to see your balance")} >
            Balance
          </button>
          {typeof window !== "undefined" && ( // Check if running on the client side
            <button
              className="bg-red-800 hover:bg-blue-700 text-white font-bold px-4 rounded-full m-2 button"
              onClick={() => alert("Login to withdraw money from your wallet")}
            >
              Withdraw
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default WalletButtonsWithImage;
