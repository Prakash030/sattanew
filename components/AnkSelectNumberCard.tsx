import React from 'react'
import "../styles.css"

interface Props{
    number: number;
}

const AnkSelectNumberCard = ({number}:Props) => {
  return (
    <div className='AnkSelectNumberCard'>
       <p style={{fontWeight:"bolder",fontSize:"20px"}}> {number}</p>
      
    </div>
  )
}

export default AnkSelectNumberCard
