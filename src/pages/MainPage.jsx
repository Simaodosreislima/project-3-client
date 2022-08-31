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
    <div className="mainpage">
      <div className="h-screen box-border md:w-1/5 container flex  md:m-auto text-center  ">
        {!user.length && <p>No mores users left</p>}
        {user.length > 0 && (
          <div key={user[0]._id} className="h-4/5 flex-col bg-blue-300 rounded md:mt-6 w-screen border-solid border-blue-900 border-2 box-border border-opacity-75 shadow-2xl" >
            <span className="font-semibold text-lg ">{user[0].firstName} {user[0].lastName}</span>
            <video width="200" height="200" controls loop autoPlay>
              <source src={user[0].profileVideos} width="200" className=" w-full mt-4 h-52 border-1 border-solid border-blue-900 shadow-2xl" />
            </video>
            <p className="mt-4">{user[0].description}</p>
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