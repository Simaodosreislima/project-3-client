import { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../context/auth.context"
import axios from 'axios';
import { Link } from 'react-router-dom';
import React from "react"

function MainPage() {
  const [user, setUser] = useState([]);
  const { user: loggedUser } = useContext(AuthContext)

  const getUsers = async () => {
    try {
      const storedToken = localStorage.getItem('authToken');

      let response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      const filteredArr = response.data.filter(el => (el._id !== loggedUser._id) && !el.matchReceived.includes(loggedUser._id))
      /*  console.log(filteredArr) */
      setUser(filteredArr.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  //leave the dependency array empty so it only runs on the mounting phase
  useEffect(() => {
    getUsers();
  }, []);

  const handleLike = async (personId) => {
    setUser(user.slice(1))
    const storedToken = localStorage.getItem('authToken');

    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/match/${personId}`, {}, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });


    } catch (error) {
      console.log(error)
    }

  }


  const handleDislike = () => {

    setUser(user.slice(1))
  }
  return (
    <div className="container flex content-center">
      {!user.length && <p>No mores users left</p>}
      {user.length > 0 && (
        <div className="flex-col bg-red-500 rounded mt-12 w-42 h-96" key={user[0]._id}>
          <span>{user[0].firstName} {user[0].lastName}</span>
          <video>{user[0].profileVideos}</video>
          <span>{user[0].description}</span>
          <Link to={`/user-profile/${user[0]._id}`} className="bg-white rounded">
            <button>See Profile</button>
          </Link>
          <br /> {/* just to test */}
          <button onClick={() => handleLike(user[0]._id)} className="bg-white rounded">Like</button>
          <br /> {/* just to test */}
          <button onClick={() => handleDislike()} className="bg-white rounded">Dislike</button>
        </div>)}


    </div >
  );
}

export default MainPage;