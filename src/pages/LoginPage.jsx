import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/auth.context';
import React from "react"
import "./bgImages.css"

/* const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=8ad602bcdc9a40f193a4aa29f7a50ba5&response_type=code&redirect_uri=http://localhost:3000&scope=user-top-read" */


function LoginPage(props) {

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


        storeToken(response.data.authToken);


        authenticateUser();
        navigate('/main');
      })
      .catch((err) => {
        setErrorMessage(err.response.data.errorMessage);
      })
  };

  return (

    <div className="login">
      <div className="h-screen w-screen box-border container flex flex-col items-center md:w-auto md:text-center md:items-center ">


        <form onSubmit={handleLoginSubmit} className="h-full w-full px-8 backdrop-blur-sm bg-white/20 rounded md:mt-12  md:w-2/5 md:h-4/5  box-border  ">
          <div className="flex flex-row justify-center mt-32 mb-8 box-border">
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleEmail}
              placeholder="Email"
              className="rounded text-center border-2 border-solid border-sky-700"
            />

          </div>
          <div className="flex flex-row justify-center mt-8 mb-8 box-border">
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePassword}
              placeholder="Password"
              className="rounded text-center border-2 border-solid border-sky-700"
            />
            {/*    <a href={AUTH_URL}>Login with spotify</a> */}
          </div>

          <div className="w-full flex flex-row items-center justify-center">
            <button type="submit" className="bg-white w-2/5 p-1 md:w-1/5 rounded mt-4 border-2 border-solid border-blue-900 shadow-2xl hover:bg-sky-700 hover:text-white hover:border-white">Login</button>
          </div>
          <div className="w-full flex flex-col items-center justify-center mt-4">

            {errorMessage && <p className=" bg-red-400 error-message">{errorMessage}</p>}
            <p className="bg-white/70">Don't have an account yet?</p>
            <Link to={"/signup"} className="bg-sky-700  text-white w-2/5 md:w-1/5 rounded text-center mt-2 p-1 border-2 border-solid border-white shadow-2xl hover:bg-white hover:text-sky-700 hover:border-blue-900"> Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage;