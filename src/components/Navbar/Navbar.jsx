import React from 'react'
import { Link } from "react-router-dom";
import { useContext } from "react"
import { AuthContext } from "../../context/auth.context"

function Navbar() {
  const { isLoggedIn, user, logout } = useContext(AuthContext);
  return (
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>

      {isLoggedIn && (
        <>
          <Link to="/main">
            <button>Main page</button>
          </Link>
          <span>{user.firstName}</span>
          <button onClick={logout}>Logout</button>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/signup"> <button>Sign Up</button> </Link>
          <Link to="/login"> <button>Login</button> </Link>
        </>
      )}
    </nav>
  )
}

export default Navbar