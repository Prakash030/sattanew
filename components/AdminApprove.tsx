import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "../styles.css"


const TablePage = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [userDetails, setUserDetails] = useState<any[]>([]);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/getFullDetails`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          // Handle response data if needed
          const userData = await response.json();
          setUserDetails(userData.result);
        }
      } catch (error) {
        console.error("Error getting user:", error);
      }
    }
      fetchData();
  }, []);
  console.log("userDetails", userDetails);

  const handleTabSelect = (index: React.SetStateAction<number>) => {
    setSelectedTab(index);
  };

  const handleWithdrawalApprove = async (email: string, withdrawalId: string, amount: number) => {
    const formData = {
      email: email,
      withdrawalId: withdrawalId,
      status: "approved",
      amount: amount
    };
    console.log(formData);
    try {
      const response = await fetch(`/api/updateWithdrawal`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating withdrawal:", error);
    }
  };

  const handleWithdrawalReject = async (email: string, withdrawalId: string) => {
    const formData = {
      email: email,
      withdrawalId: withdrawalId,
      status: "rejected",
      amount: 0
    };
    console.log(formData);
    try {
      const response = await fetch(`/api/updateWithdrawal`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating withdrawal:", error);
    }
  };


  const handleDepositApprove = async (email: string, depositId: string, amount: number) => {
    const formData = {
      email: email,
      depositId: depositId,
      status: "approved",
      amount: amount
    };
    console.log(formData);
    try {
      const response = await fetch(`/api/updateDeposit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating withdrawal:", error);
    }
  };


  const handleDepositReject = async (email: string, depositId: string) => {
    const formData = {
      email: email,
      depositId: depositId,
      status: "rejected",
      amount: 0
    };
    console.log(formData);
    try {
      const response = await fetch(`/api/updateDeposit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.error("Error updating withdrawal:", error);
    }
  };


  return (
    <div className="table-page">
      <Tabs selectedIndex={selectedTab} onSelect={handleTabSelect}>
        <TabList>
          <Tab>Withdrawal Request</Tab>
          <Tab>Add Money Request</Tab>
        </TabList>

        <TabPanel>
          <h2>All withdrawal Requests from the Users</h2>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Amount</th>
                <th>UPI Id</th>
                <th>Date of Request</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {userDetails
                .filter((user) =>
                  user.withdrawal.some((withdrawal) => withdrawal.status === "pending")
                )
                .map((user, index) => (
                  <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.phoneNumber}</td>
                    <td style={{padding:"20px"}}>
                      {user.withdrawal
                        .filter((withdrawal) => withdrawal.status === "pending")
                        .map((withdrawal, wIndex) => (
                          <div key={wIndex}>
                            {withdrawal.amount} {/* Display withdrawal amount */}
                          </div>
                        ))}
                    </td>
                    <td>{user.bankDetails.upiId}</td>
                    <td>
                      {user.withdrawal
                        .filter((withdrawal) => withdrawal.status === "pending")
                        .map((withdrawal, wIndex) => (
                          <div key={wIndex}>
                            {withdrawal.date} {/* Display withdrawal date */}
                          </div>
                        ))}
                    </td>
                    <td>
                      {user.withdrawal
                        .filter((withdrawal) => withdrawal.status === "pending")
                        .map((withdrawal, wIndex) => (
                          <div key={wIndex}>
                            <button onClick={() => handleWithdrawalApprove(user.email, withdrawal._id, withdrawal.amount)} style={{margin:"2px"}}>
                              Approve
                            </button>
                            <button onClick={() => handleWithdrawalReject(user.email, withdrawal._id)}>
                              Reject
                            </button>
                          </div>
                        ))}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </TabPanel>

        <TabPanel>
          <h2>Adding Money Request to the wallet</h2>
          <table className="custom-table">
            <thead>
              <tr>
              <th>Name</th>
                <th>Phone</th>
                <th>Amount</th>
                <th>Transaction Id</th>
                <th>Date of Request</th>
              </tr>
            </thead>
            <tbody>
            {userDetails
                .filter((user) =>
                  user.deposit.some((deposits) => deposits.status === "pending")
                )
                .map((user, index) => (
                  <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.phoneNumber}</td>
                    <td>
                      {user.deposit
                        .filter((deposits) => deposits.status === "pending")
                        .map((deposits, wIndex) => (
                          <div key={wIndex}>
                            {deposits.amount} {/* Display withdrawal amount */}
                          </div>
                        ))}
                    </td>
                    <td>
                      {user.deposit
                        .filter((deposits) => deposits.status === "pending")
                        .map((deposits, wIndex) => (
                          <div key={wIndex}>
                            {deposits.utrNo} {/* Display withdrawal amount */}
                          </div>
                        ))}
                    </td>
                    <td>
                      {user.deposit
                        .filter((deposits) => deposits.status === "pending")
                        .map((deposits, wIndex) => (
                          <div key={wIndex}>
                            {deposits.date} {/* Display withdrawal date */}
                          </div>
                        ))}
                    </td>
                    <td>
                      {user.deposit
                        .filter((deposits) => deposits.status === "pending")
                        .map((deposits, wIndex) => (
                          <div key={wIndex}>
                            <button onClick={() => handleDepositApprove(user.email, deposits._id, deposits.amount)}>
                              Approve
                            </button>
                            <button onClick={() => handleDepositReject(user.email, deposits._id)}>
                              Reject
                            </button>
                          </div>
                        ))}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default TablePage;
