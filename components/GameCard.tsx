import React from 'react';
import Image from 'next/image';
import "../styles.css"
import Link from 'next/link';

interface Props {
    game: {
        id: number;
        name: string;
        imageUrl: string;
    };

}

const GameCard = ({ game }:Props) => {

    const url = `/${game.name}`
  return (
   <Link
   href={url}
   className='link'
   >
     <div className="game-card" >
      <Image
        width={50}
        height={50}
        src={game.imageUrl}
        alt={game.name}
        className="w-full h-32 object-cover mb-2 rounded-md"
        />
      <p>{game.name}</p>
    </div>
   </Link>
  );
};

export default GameCard;
