import React from 'react'
import "../styles.css";
import ResultTable from './ResultTable';

interface Props{
    gameName:string;
    chartType:string;
    isAdmin:boolean;
}

const Chart = ({gameName,chartType,isAdmin}:Props) => {
  return (
    <div className='bg table'>
        <div >
        <div style={{ marginTop: "20px" }}>
          <span
            style={{
              backgroundColor: "red",
              padding: "10px",
              borderRadius: "20%",
              marginLeft: "44%",
              fontWeight: "bold",
              fontSize: "30px",
              color: "white",
              paddingLeft:"20px",
                paddingRight:"20px"
            }}
            className='chartType'
          >
           {chartType}
          </span>
          <div style={{ display: "flex", justifyContent: "center",marginTop:"30px" }}>
           
            <span
              style={{
                backgroundColor: "gray",
                padding: "10px",
                borderRadius: "20%",
                width: "400px",
                fontWeight: "bold",
                fontSize: "20px",
                textAlign: "center",
                paddingLeft:"20px",
                paddingRight:"20px"
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
      <ResultTable isAdmin={isAdmin} chartType={chartType} gameName={gameName}/>
      
    </div>
  )
}

export default Chart
