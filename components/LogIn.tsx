import React, { useState } from "react";
import Link from "next/link";

import "../styles.css";
interface ErrorMessages {
  name: string;
  message: string;
}

function Login() {

  const [errorMessages, setErrorMessages] = useState<ErrorMessages>({
    name: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const uname = formData.get("uname") as string;
    const pass = formData.get("pass") as string;

    try {
      const response = await fetch("/api/authUser", {
        method: "POST",
        body: new URLSearchParams({ email: uname, password: pass }), // Use URLSearchParams for form data
      });

      console.log("response", response);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to authenticate user");
      }

      const userData = await response.json();

      if (userData) {
        setIsSubmitted(true);
      } else {
        setErrorMessages({ name: "uname", message: "Invalid username or password" });
      }
    } catch (error) {
      console.error("Error authenticating user:", error);
      setErrorMessages({ name: "uname", message: "Error authenticating user" });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name: string) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>

        <p className="mt-4 text-gray-600 text-center">
          Dont have an account?
          <Link href="/signIn"> Sign Up</Link>
        </p>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Log In your Account</div>
        <p className="description">Step into the world of satta matka by logging into your account today</p>
        <p className="description">Predict wisely, Join the game, and let the winning journey unlock!!!!!</p>
        <div className="title">Enter Your Credentials!!!</div>
        {isSubmitted ? (
          <div>
            User is successfully logged in
            <Link href="/" className="linkDecor">Go TO DASHBOARD</Link>
          </div>
        ) : (
          renderForm
        )}
      </div>
    </div>
  );
}

export default Login;
