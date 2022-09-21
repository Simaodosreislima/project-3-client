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
    <div className="conversation h-screen">
      <h1 className="text-center">Enjoy your conversation at MusicMate</h1>
      <div className="flex flex-col justify-center items-center border-2 border-solid border-sky-700 bg-sky-600/40 h-full">

        <div className="bg-white/20">
          {conversation && conversation.map((message) => {
            return (
              <>
                <h1 className="bg-white/50 shadow-blur-xl m-6">{message.author.firstName}: {message.content}</h1>
              </>
            )
          })}

          <form onSubmit={handleMessage} className="flex flex-col">
            <input type="text" placeholder='Type your message' onChange={(e) => setContent(e.target.value)} value={content} className="w-full text-center pb-2" />
            <button className="bg-slate-400">Send</button>
          </form>
        </div>
      </div>


    </div>
  )
}

export default Conversation