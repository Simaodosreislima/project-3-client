import { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../context/auth.context"
import axios from 'axios';
import { Link } from 'react-router-dom';
import React from "react"
import "./signup.css"

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
    <div className="mainpage">
      <div className="h-screen box-border md:w-1/5 container flex  md:m-auto text-center  ">
        {!user.length && <p>No mores users left</p>}
        {user.length > 0 && (
          <div key={user[0]._id} className=" h-full md:h-4/5 flex-col backdrop-blur-sm bg-white/10 rounded md:mt-6 w-screen box-border border-opacity-75 shadow-2xl" >
            <p className=" uppercase mt-2 font-bold text-lg text-pink-600">{user[0].firstName} {user[0].lastName}</p>

            <video controls loop autoPlay className="h-2/5 w-screen mt-12 object-cover object-center border-solid box-border border-white border-1 rounded">
              <source src={user[0].profileVideos} />
            </video>
            <div>
              <p className="px-4 text-justify text-clip bg-white/70">{user[0].description}</p>
            </div>
            <Link to={`/user-profile/${user[0]._id}`} >
              <button className="bg-white w-2/5 rounded mt-8 border-2 border-solid border-blue-900 shadow-2xl hover:bg-sky-700 hover:text-white hover:border-white">See Profile</button>
            </Link>
            <div className=" mt-8 flex container justify-evenly">

              <button onClick={() => handleDislike()} className="bg-white border-2 border-solid border-blue-900 rounded w-3/12 shadow-2xl hover:bg-sky-700 hover:text-white hover:border-white">Dislike</button>
              <button onClick={() => handleLike(user[0]._id)} className="bg-white border-2 border-solid border-blue-900 w-3/12 rounded shadow-2xl  hover:bg-sky-700 hover:text-white hover:border-white">Like</button>
            </div>
          </div>
        )}


      </div >
    </div>
  );
}

export default MainPage;