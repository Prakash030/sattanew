import React, { FormEvent } from "react";
import Link from "next/link";
import "../styles.css";

function SignIn() {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
 
    event.preventDefault();

  
    const formData = {
      name: (event.target as any).uname.value,
      phoneNumber: (event.target as any).mobileNumber.value,
      email: (event.target as any).email.value,
      password: (event.target as any).pass.value,
    };

    console.log(formData);

    try {
      
      const queryString = new URLSearchParams(formData).toString();

      const response = await fetch(`/api/createUser?${queryString}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create user");
      }


      console.log("User created successfully!");
      alert("User created successfully!");
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>FullName </label>
          <input type="text" name="uname" required />
        </div>
        <div className="input-container">
          <label>MobileNumber </label>
          <input type="number" name="mobileNumber" required />
        </div>
        <div className="input-container">
          <label>Email </label>
          <input type="email" name="email" required />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
        <p className="mt-4 text-gray-600 text-center">
          Already have an account?
          <Link href="/logIn"> Sign In</Link>
        </p>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign Up</div>
        <p className="description">
          Step into the world of satta matka by loggin into your account today
        </p>
        <p className="description">
          Predict wisely, Join the game, and let the winning journey unlock!!!!!
        </p>
        {isSubmitted ? (
          <div>
            User is successfully Created
            <Link href="/logIn" className="linkDecor"> Sign In</Link>
          </div>
        ) : (
          renderForm
          
        )}
      </div>
    </div>
  );
}

export default SignIn;
