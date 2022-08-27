import React from "react"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";


function SignupPage() {
  /*   email, password, username, firstName, lastName */
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
    <div className="SignupPage">
      <h1>Sign Up</h1>

      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmail}
        />

        <label>Username:</label>
        <input
          type="text"
          name="name"
          value={username}
          onChange={handleUserName}
        />

        <label>First Name:</label>
        <input
          type="text"
          name="name"
          value={firstName}
          onChange={handleFirstName}
        />

        <label>Last Name:</label>
        <input
          type="text"
          name="name"
          value={lastName}
          onChange={handleLastName}
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <button type="submit">Sign Up</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Already have account?</p>
      <Link to={"/login"}> Login</Link>
    </div>
  )
}

export default SignupPage;