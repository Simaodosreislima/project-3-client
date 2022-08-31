import React from 'react';
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { Link } from 'react-router-dom';
function MatchesPage() {
  const [conversations, setConversations] = useState([]);
  const { user } = useContext(AuthContext)
  const [userDetails, setUserDetails] = useState(null);

  const getUserDetails = async () => {
    try {
      const storedToken = localStorage.getItem('authToken');
      let response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/${user._id}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });


      setUserDetails(response.data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const getConversations = async () => {
    try {
      const storedToken = localStorage.getItem('authToken');
      let response = await axios.get(`${process.env.REACT_APP_API_URL}/api/chats`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      console.log(response.data)
      setConversations(response.data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getConversations();
  }, [userDetails]);


  return (
    <div>
      {conversations.map((chat) =>
        <Link to={`/conversation/${chat._id}`}>
          <div key={user._id} className="flex flex-col justify-center bg-white">
            {chat.participants.filter((user) => user._id !== userDetails._id).map((user) =>
              <p className="text-blue-900 text-center">{user.firstName} {user.lastName}</p>
            )}
          </div>
        </Link>
      )}
    </div>
  )
}

export default MatchesPage