import React from 'react'
import { Link } from "react-router-dom";
import { useContext } from "react"
import { AuthContext } from "../../context/auth.context"

function Navbar() {
  const { loggedIn, user, logout } = useContext(AuthContext);
  return (
    <nav className="box-border w-screen h-20 bg-black">

      {loggedIn && (
        <div className="flex justify-between items-center pl-12 pr-8 md:flex flex-row">
          <div className="w-2/4 h-fit ">
            <Link to="/main">
              <button className="text-white md:m-8 hover:-rotate-12">Search a Bandmate</button>
            </Link>
          </div>
          <div className="w-2/4  text-white flex flex-col text-end md:flex-row md:justify-end">
            <Link to={`/user-profile/${user._id}`}>
              <button className="md:m-8 hover:-rotate-12">Profile</button>
            </Link>
            <Link to={`/matches`}>
              <button className="md:m-8 hover:-rotate-12">Matches</button>
            </Link>
            <button onClick={logout} className="text-end md:m-8 hover:-rotate-12 md: flex-row">Logout</button>
          </div>
        </div>
      )}

      {!loggedIn && (
        <div className="box-border w-screen h-20 flex px-12 md:flex flex-row ">
          <div className="w-1/2 flex justify-start items-center md:m-8 hover:-rotate-3 ">
            <Link to="/">
              <button className="font-bold italic text-3xl text-pink-600">MusicMate</button>
            </Link>
          </div>

          <div className=" w-1/2 flex justify-end items-center">
            <Link to="/login"> <button className=" text-white/90">Login</button> </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar