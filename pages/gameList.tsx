// pages/GameList.js

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import GameCard from "@/components/GameCard";
import "../styles.css";
import { useRouter } from 'next/router';
import "../styles.css";





const GameList = () => {

  const router = useRouter();
  const { gameName,gameTiming } = router.query;

  const games = [
    { id: 1, name: `/SingleAnk?gameName=${gameName}&gameType=SINGLE_ANK&gameTiming=${gameTiming}`, imageUrl: "/singleAnk.jpeg" },
    { id: 2, name: `/Jodi?gameName=${gameName}&gameType=JODI&gameTiming=${gameTiming}`, imageUrl: "/jodi.jpeg" },

  ];
  const games2 = [
    { id: 1, name: `/SinglePatti?gameName=${gameName}&gameType=SINGLE_PATTI&gameTiming=${gameTiming}`, imageUrl: "/singlePatti.jpeg" },
    { id: 2, name: `/DoublePatti?gameName=${gameName}&gameType=DOUBLE_PATTI&gameTiming=${gameTiming}`, imageUrl: "/doublePatti.jpeg" },
    { id: 3, name: `/TripplePatti?gameName=${gameName}&gameType=TRIPPLE_PATTI&gameTiming=${gameTiming}`, imageUrl: "/tripplePatti.jpeg" },
   
  ];

  return (
    <div className="container mx-auto my-8 .text">
      <h1 className="text-4xl font-bold mb-4">
        <span
          style={{
            backgroundColor: "yellow",
            padding: "10px",
            borderRadius: "20%",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "1.5rem",
            color: "black",
          }}
        >
          Select Bidding Option Here
        </span>
      </h1>
      <div className="game-list" style={{marginTop:"100px",marginLeft:"300px",marginRight:"300px"}}>
        {games.map((game) => (
          // <GameCard key={game.id} game={game} />
          <Link href={game.name} key={game.id}>
            <Image
              width={200}
              height={200}
              src={game.imageUrl}
              alt={game.name}
              className="w-full h-32 object-cover mb-2 rounded-md"
            />
          </Link>
        ))}
      </div>
      <div className="game-list" style={{marginTop:"100px"}}>
        {games2.map((game) => (
          <Link href={game.name} key={game.id}>
            <Image
              width={200}
              height={200}
              src={game.imageUrl}
              alt={game.name}
              className="w-full h-32 object-cover mb-2 rounded-md"
            />
          </Link>
        ))}

        
      </div >

    </div>
  );
};

export default GameList;

