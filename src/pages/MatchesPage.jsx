import React from 'react';
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { Link } from 'react-router-dom';
function MatchesPage() {
  const [matches, setMatches] = useState([]);
  const { user } = useContext(AuthContext)

  const getUserDetails = async () => {
    try {
      const storedToken = localStorage.getItem('authToken');
      let response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/${user._id}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      setMatches(response.data.matches)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div>
      {matches.map((match) =>
        <Link to="/conversation">
          <div key={user._id} className="flex flex-col justify-center bg-white">
            <p className="text-blue-900 text-center">{match.firstName} {match.lastName}</p>
          </div>
        </Link>
      )}
    </div>
  )
}

export default MatchesPage