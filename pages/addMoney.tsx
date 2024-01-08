import React, { useEffect, useState, FormEvent } from 'react'
import "../styles.css";
import { parseCookies } from 'nookies';

function AddMoney() {
    const [bank, setBank] = useState<boolean>(false);
  const [clientRender, setClientRender] = useState(false);
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
    useEffect(() => {
        setClientRender(true);
      }, []);

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
            if (response.ok) {
              
              const userData = await response.json();
              console.log("User details:", userData.user.balance);
              setEmail(userData.user.email);
              setUser(userData.user);
              setBank(userData.user.bankDetails.details)
            } else {
              setBank(false);
            }
          } catch (error) {
            console.error("Error getting user:", error);
          }
        };
        getUserDetails();
      }
      , [clientRender]);

      const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const amount = parseInt((event.target as any).amount.value);
        const formData = {
          amount,
          status: "pending",
          email: email,
          date: new Date().toLocaleString(),
          utrNo: (event.target as any).utrNo.value,
        };
        console.log(formData);
        try {
          
          const response = await fetch('/api/addMoney', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData), // Sending form data in the request body
          });
      
          if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || "Failed to Update Details");
          }
    
          alert("Add Money request sent successfully!");
    
        } catch (error) {
          console.error('Error updating withdrawal details:', error);
        }
      }
    

  return (
    <div className='app '>
        <div className="login-form wallet">
            <div>
            <h3>Add Money to your wallet!!!</h3>
            <p>Money will be deposited within 24 hours!!!</p>
            <img src="/qrcode.png" alt="" height={120}/>
            </div>
        
        <div>
            <p>After depositing money enter the details for verification</p>
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Amount </label>
                    <input type="number" name="amount" required placeholder='Enter the amount'/>
                </div>
                <div className="input-container">
                    <label>Transaction Id </label>
                    <input type="text" name="utrNo" required placeholder='Enter the transaction Id'/>
                </div>
                <div className="button-container">
                    <input type="submit" />
                </div>
            </form>
            </div>
        </div>
    </div>
  )
}

export default AddMoney