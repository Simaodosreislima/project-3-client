import React from "react"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";


function SignupPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleUserName = (e) => setUserName(e.target.value);
  const handleFirstName = (e) => setFirstName(e.target.value);
  const handleLastName = (e) => setLastName(e.target.value);


  const handleSubmit = (e) => {
    e.preventDefault();

    const body = { email, username, firstName, lastName, password };
    axios.post(`${process.env.REACT_APP_API_URL}/api/auth/signup`, body)
      .then(() => {
        navigate("/login")
      })
      .catch((err) => {
        console.log(err)
        setErrorMessage(err.response.data.errorMessage)
      })
  };


  return (
    <div className="h-3/5 m-auto box-border container flex flex-col  md:w-1/5 md:m-auto text-center">


      <form onSubmit={handleSubmit} className="h-4/5  bg-blue-300 rounded md:mt-6 w-screen border-solid border-blue-900 border-2 box-border border-opacity-75 shadow-2xl">
        <div className="flex flex-row justify-center mt-4 mb-8 box-border">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
            className="rounded"
          />
        </div>
        <div className="flex flex-row justify-center mt-4 mb-8 box-border">
          <label>Username:</label>
          <input
            type="text"
            name="name"
            value={username}
            onChange={handleUserName}
            className="rounded"
          />
        </div>
        <div className="flex flex-row justify-center mt-4 mb-8">
          <label>First Name:</label>
          <input
            type="text"
            name="name"
            value={firstName}
            onChange={handleFirstName}
            className="rounded"
          />
        </div>
        <div className="flex flex-row justify-center mt-4 mb-8">
          <label>Last Name:</label>
          <input
            type="text"
            name="name"
            value={lastName}
            onChange={handleLastName}
            className="rounded"
          />
        </div>
        <div className="flex flex-row justify-center mt-4 mb-8" >
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
            className="rounded"
          />
        </div>

        <button type="submit">Sign Up</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Already have account?</p>
      <Link to={"/login"}> Login</Link>
    </div>
  )
}

export default SignupPage;