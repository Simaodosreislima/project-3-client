import React from 'react';
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { Link } from 'react-router-dom';
import "./signup.css"

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

      setConversations(response.data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getConversations();
  }, [userDetails]);


  return (
    <div className="matches">
      <div className="border-2 border-solid border-sky-900 h-full">
        {conversations.map((chat) =>
          <Link to={`/chat/${chat._id}/message`}>
            <div className="flex justify-end md:justify-center items-start mt-2 ">
              {chat.participants.filter((user) => user._id !== userDetails._id).map((user) =>
                <div className="flex justify-end mr-5 md:justify-center text-center flex-row rounded">
                  <p className="text-pink-600 underline text-lg decoration-black items-center">{user.firstName} {user.lastName}</p>
                </div>
              )}
            </div>
          </Link>
        )}
      </div>
    </div>
  )
}

export default MatchesPage