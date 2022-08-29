import React from 'react'
import { Link } from "react-router-dom";
import { useContext } from "react"
import { AuthContext } from "../../context/auth.context"

function Navbar() {
  const { loggedIn, user, logout } = useContext(AuthContext);
  return (
    <nav className="flex flex-row content-center p-8 bg-black text-white">
      <Link to="/">
        <button>Home</button>
      </Link>

      {loggedIn && (
        <>
          <Link to="/main">
            <button>Main page</button>
          </Link>
          <Link to={`/user-profile/${user._id}`}>
            <button>Profile</button>
          </Link>
          <Link to={`/matches`}>
            <button>matches</button>
          </Link>
          <span>Hi {user.firstName}</span>
          <button onClick={logout}>Logout</button>
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