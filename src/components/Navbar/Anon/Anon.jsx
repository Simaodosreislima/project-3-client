import { useContext } from 'react';
import { AuthContext } from '../../../context/auth.context';
import { Navigate } from 'react-router-dom';
import React from "react"
function Anon({ children }) {
  const { loggedIn, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;

  if (loggedIn) return <Navigate to="/main" />;
  else return children;
}

export default Anon;