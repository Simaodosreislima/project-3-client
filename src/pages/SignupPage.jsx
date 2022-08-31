import React from "react"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";
import "./signup.css"

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
    <div className="signup">

      <div className="h-screen w-screen box-border  container flex flex-col items-center md:w-auto md:text-center md:items-center ">


        <form onSubmit={handleSubmit} className="h-4/5 bg-transparent w-full opacity-75 backdrop-blur-xl backdrop-contrast-125 drop-shadow-md rounded md:mt-12  md:w-2/5 md:h-3/5  box-border  ">
          <div className="flex flex-row justify-center mt-8 mb-8 box-border md:mb-6">
            {/*   <label>Email:</label> */}
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleEmail}
              placeholder="Email"
              className="rounded text-center"
            />
          </div>
          <div className="flex flex-row justify-center mt-4 mb-8 box-border md:mb-6">
            {/*    <label>Username:</label> */}
            <input
              type="text"
              name="name"
              value={username}
              onChange={handleUserName}
              placeholder="Username"
              className="rounded text-center"
            />
          </div>
          <div className="flex flex-row justify-center mt-4 mb-8 md:mb-6">
            {/*  <label>First Name:</label> */}
            <input
              type="text"
              name="name"
              value={firstName}
              onChange={handleFirstName}
              placeholder="First Name"
              className="rounded text-center"
            />
          </div>
          <div className="flex flex-row justify-center mt-4 mb-8 md:mb-6">
            {/* <label>Last Name:</label> */}
            <input
              type="text"
              name="name"
              value={lastName}
              onChange={handleLastName}
              placeholder="Last Name"
              className="rounded text-center"
            />
          </div>
          <div className="flex flex-row justify-center mt-4 mb-8 md:mt-2 md:mb-6" >
            {/*        <label>Password:</label> */}
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePassword}
              placeholder="Password"
              className="rounded text-center"
            />
          </div>
          <div className="w-full flex flex-row items-center justify-center">
            <button type="submit" className=" font-bold bg-white w-1/5 md:w-1/5 rounded p-1 mt-4 md:mt-2 border-2 border-solid border-blue-900 shadow-2xl hover:bg-sky-700 hover:text-white hover:border-white">Sign Up</button>
          </div>
          <div className="w-full flex flex-col mt-8 items-center justify-center text-white font-bold">
            <p >Already have account?</p>
            <Link to={"/login"} className="bg-sky-700  text-white w-1/5 md:w-1/5 rounded text-center mt-2 p-1 border-2 border-solid border-white shadow-2xl hover:bg-white hover:text-sky-700 hover:border-blue-900"> Login</Link>
          </div>
        </form>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

      </div>
    </div>
  )
}

export default SignupPage;