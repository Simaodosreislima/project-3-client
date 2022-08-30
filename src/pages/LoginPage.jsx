import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/auth.context';
import React from "react"



function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  /*  UPDATE - get authenticateUser from the context */
  const { storeToken, authenticateUser } = useContext(AuthContext);


  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);


  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const body = { email, password };

    axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, body)
      .then((response) => {
        console.log('JWT token', response.data.authToken);

        // Save the token in the localStorage.      
        storeToken(response.data.authToken);

        // Verify the token by sending a request 
        // to the server's JWT validation endpoint. 
        authenticateUser();                     // <== ADD
        navigate('/main');
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
      })
  };

  return (
    <div className="h-screen w-screen box-border container flex flex-col items-center md:w-auto md:text-center md:items-center ">


      <form onSubmit={handleLoginSubmit} className="h-4/5 w-full bg-blue-300 rounded md:mt-6  md:w-2/5 md:h-3/5 border-solid border-blue-900 border-2 box-border border-opacity-75 shadow-2xl ">
        <div className="flex flex-row justify-center mt-8 mb-8 box-border">
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
            placeholder="Email"
            className="rounded text-center"
          />

        </div>
        <div className="flex flex-row justify-center mt-8 mb-8 box-border">
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
          <button type="submit" className="bg-white w-1/5 md:w-1/5 rounded mt-8 border-2 border-solid border-blue-900 shadow-2xl hover:bg-sky-700 hover:text-white hover:border-white">Login</button>
        </div>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Don't have an account yet?</p>
      <Link to={"/signup"}> Sign Up</Link>
    </div>
  )
}

export default LoginPage;