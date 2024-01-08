"use client"
import React, {useState, useEffect, use} from 'react'
import Link from 'next/link'
import "../styles.css";
import { usePersonStore } from '@/components/balance';
import { parseCookies } from "nookies";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
export default function Balance() {
    const [clientRender, setClientRender] = useState(false);
    const [user, setUser] = useState();
    const [userFetced, setUserFetched] = useState(false);
    const [selectedTab, setSelectedTab] = useState(0);
    const [game, setGame] = useState<String[]>([]);
    const savedBalance = typeof window !== 'undefined' ? localStorage.getItem('balance') : null;
    useEffect(() => {
        setClientRender(true);
      }, []);
      const handleTabSelect = (index: React.SetStateAction<number>) => {
        setSelectedTab(index);
      };

    useEffect(() => {
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
          console.log("user 1111", response);
    
          if (response.ok) {
            setUserFetched(true);
            // Handle response data if needed
            const userData = await response.json();
            console.log("User details:", userData.user);
            setUser(userData.user)
          } else {
            setUserFetched(false);
          }
        } catch (error) {
          console.error("Error getting user:", error);
        }
      };
      getUserDetails();
    }
    , [clientRender]);

    useEffect(() => {
      const game = async () => {
        try{
          const gameDetail = await fetch(`/api/getGame`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },

          });
          console.log("gameDetail", gameDetail);
          if(gameDetail.ok){
            const gameData = await gameDetail.json();
            console.log("gameData", gameData);
            setGame(gameData);
          }
          
        }
        catch(error){
          console.log("error", error);
        }
      }
        game();
    }, []);

    console.log("user", user);
    console.log("game", game);
  return (
    // <div className='app'>
    <div className="table-page">
    <Tabs selectedIndex={selectedTab} onSelect={handleTabSelect}>
      <TabList>
        <Tab style={{color:"red", cursor:"Pointer", background:"black", width:"100px", padding:"4px", borderRadius:"4px", marginBottom:"10px"}}>Withdrawal</Tab>
        <Tab style={{color:"green", cursor:"Pointer", background:"black", width:"100px", padding:"4px", borderRadius:"4px", marginBottom:"10px"}}>Deposit</Tab>
        <Tab style={{color:"white", cursor:"Pointer", background:"black", width:"100px", padding:"4px", borderRadius:"4px"}}>Bidding</Tab>
      </TabList>

      <TabPanel>
        <h2>All withdrawal History</h2>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Amount</th>
              <th>Date of Request</th>
            </tr>
          </thead>
          <tbody>
          {user && user.withdrawal && user.withdrawal.map((withdrawalItem, index) => (
        <tr key={index}>
          <td>{withdrawalItem.amount}</td>
          <td>{withdrawalItem.date}</td>
        </tr>
      ))}
          </tbody>
        </table>
      </TabPanel>

      <TabPanel>
        <h2>All Deposit History</h2>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Amount</th>
              <th>Transaction Id</th>
              <th>Date of Request</th>
            </tr>
          </thead>
          <tbody>
          {user && user.deposit && user.deposit.map((depositItem, index) => (
        <tr key={index}>
          <td>{depositItem.amount}</td>
          <td>{depositItem.utrNo}</td>
          <td>{depositItem.date}</td>
        </tr>
      ))}
          </tbody>
        </table>
      </TabPanel>

      <TabPanel>
        <h2>All Bidding History</h2>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Game Name</th>
              <th>Game type</th>
              <th>Amount</th>
              <th>Date of Request</th>
            </tr>
          </thead>
          <tbody>
          {game?.map((gameItem, index) => (
        <tr key={index}>
          <td>{gameItem.gameName}</td>
          <td>{gameItem.gameType}</td>
          <td>{gameItem.amount}</td>
          <td>{gameItem.createdAt}</td>
        </tr>
      ))}
          </tbody>
        </table>
      </TabPanel>
    </Tabs>
  </div>
  )
}

// export default Balance