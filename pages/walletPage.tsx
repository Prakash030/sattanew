import React, { useEffect, useState, FormEvent } from 'react'
import Link from 'next/link'
import "../styles.css";
import { parseCookies } from 'nookies';

function walletPage() {
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
  console.log("bank", user.balance);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    // event.preventDefault();
    const formData = {
      accountNumber: (event.target as any).accountNumber.value,
      ifscCode: (event.target as any).ifscCode.value,
      branch: (event.target as any).branch.value,
      bankName: (event.target as any).bankName.value,
      email: email,
      upiId: (event.target as any).upiId.value,
    };
    console.log(formData);
    try {
      const response = await fetch('/api/updateBank', {
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
      alert("Bank Details Updated successfully!");

    } catch (error) {
      console.error('Error updating bank details:', error);
    }
  }

  const handleWithdraw = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const amount = parseInt((event.target as any).amount.value);
    const formData = {
      amount,
      status: "pending",
      email: email,
      date: new Date().toLocaleString(),
    };
    console.log(formData);
    try {
      if (amount > user.balance) {
        alert('Withdrawal amount exceeds available balance');
        return;
      }
      const response = await fetch('/api/withdrawal', {
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

      alert("Withdrawal request sent successfully!");

    } catch (error) {
      console.error('Error updating withdrawal details:', error);
    }
  }
  return (
    <div className='app'>
        <div className='login-form wallet'>
          <h3>Withdraw the money from your wallet!!!</h3>
          <p>Money will be deposited within 24 hours!!!</p>
          {bank ? (
            <>
            <div>
              <p>Name: <i className='number'>{user.name}</i></p>
              <p>Account Number: <i className='number'>{user.bankDetails.accountNumber}</i></p>
              <p>IFSC Code: <i className='number'>{user.bankDetails.ifscCode}</i></p>
              <p>Branch: <i className='number'>{user.bankDetails.branch}</i></p>
              <p>Bank Name: <i className='number'>{user.bankDetails.bankName}</i></p>
              <p>UPI Id: <i className='number'>{user.bankDetails.upiId}</i></p>
            </div>
            <form onSubmit={handleWithdraw}>
              <div className="input-container">
                <label>Amount </label>
                <input type="number" name="amount" required placeholder='Enter the amount'/>
              </div>
              <div className="button-container">
                <input type="submit" />
              </div>
            </form>
            </>
          ):(
            <>
            <p>Please Update Your Bank Details</p>
            <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Account Number </label>
          <input type="text" name="accountNumber" required />
          
        </div>
        <div className="input-container">
          <label>IFSC Code </label>
          <input type="text" name="ifscCode" required />
          
        </div>
        <div className="input-container">
          <label>Branch </label>
          <input type="text" name="branch" required />
        </div>
        <div className="input-container">
          <label>Bank Name </label>
          <input type="text" name="bankName" required />
        </div>
        <div className="input-container">
          <label>UPI Id </label>
          <input type="text" name="upiId" required />
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
        
      </form>
      </>
          )}
          <p>Go to <Link href='/'>DASHBOARD</Link></p>
          
          
        </div>
    </div>
  )
}

export default walletPage