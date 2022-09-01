import React from 'react'
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context"
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"


function Conversation() {
  const { id } = useParams() //getting the chat by its id
  const { user } = useContext(AuthContext)
  const [conversation, setConversation] = useState([]);
  const [content, setContent] = useState('')

  const navigate = useNavigate();
  const token = localStorage.getItem("authToken")

  const getConversation = async () => {
    try {
      let response = await axios.get(`${process.env.REACT_APP_API_URL}/api/chat/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setConversation(response.data.messages)
      console.log(response.data)

    } catch (error) {
      console.log(error)
    }
  }

  const handleMessage = (e) => {
    e.preventDefault();
    const body = { content };
    axios.post(`${process.env.REACT_APP_API_URL}/api/chat/${id}/message`, body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        setContent("")
        getConversation()
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getConversation();
  }, [user]);

  return (
    <div>
      <div>
        {conversation && conversation.map((message) => {
          return (
            <>
              <h1>{message.author.firstName}: {message.content}</h1>
            </>
          )
        })}
        <form onSubmit={handleMessage}>
          <input type="text" placeholder='chat' onChange={(e) => setContent(e.target.value)} value={content} />
        </form>
        <p>HELP</p>
      </div>


    </div>
  )
}

export default Conversation