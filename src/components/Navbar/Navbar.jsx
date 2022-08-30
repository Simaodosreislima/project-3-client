import React from 'react'
import { Link } from "react-router-dom";
import { useContext } from "react"
import { AuthContext } from "../../context/auth.context"

function Navbar() {
  const { loggedIn, user, logout } = useContext(AuthContext);
  return (
    <nav className="box-border w-full h-20 px-8 bg-black text-white container flex justify-between items-center md:w-screen md:px-12 md:flex flex-row md:justify-">

      {loggedIn && (
        <>
          <div className="w-2/4 h-fit ">
            <Link to="/">
              <button className="md:m-8 hover:-rotate-12">MusicMates</button>
            </Link>
            <Link to="/main">
              <button className=" md:m-8 hover:-rotate-12">Search a Bandmate</button>
            </Link>
          </div>
          <div className="w-2/4  flex flex-col text-end md:flex-row md:justify-end">
            <Link to={`/user-profile/${user._id}`}>
              <button className="md:m-8 hover:-rotate-12">Profile</button>
            </Link>
            <Link to={`/matches`}>
              <button className="md:m-8 hover:-rotate-12">Matches</button>
            </Link>
            <button onClick={logout} className="text-end md:m-8 hover:-rotate-12 md: flex-row">Logout</button>
          </div>
        </>
      )}

      {!loggedIn && (
        <>
          <Link to="/signup"> <button>Sign Up</button> </Link>
          <Link to="/login"> <button>Login</button> </Link>
        </>
      )}
    </nav>
  )
}

export default Navbar