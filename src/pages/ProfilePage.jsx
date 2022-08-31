import React from 'react';
import { useEffect, useState, useContext } from "react"
import { useParams, Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
function ProfilePage() {

  const [userDetails, setUserDetails] = useState(null);
  const { id } = useParams();
  const { user } = useContext(AuthContext)


  const getUserDetails = async () => {
    try {
      const storedToken = localStorage.getItem('authToken');
      let response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/${id}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      /*   console.log(response.data) */
      setUserDetails(response.data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="h-screen box-border md:w-1/5 container flex  md:m-auto text-center ">
      {userDetails && (
        <div key={userDetails._id} className="h-screen flex-col bg-blue-300 rounded md:mt-6 w-screen border-solid border-blue-900 border-2 box-border border-opacity-75 shadow-2xl" >
          <span className="font-semibold text-lg">{userDetails.firstName} {userDetails.lastName}</span>
          <div className="mt-10 box-border h-2/5 w-full">
            <video className="flex justify-center h-full w-full" controls loop autoPlay>
              <source src={userDetails.profileVideos} width="200" />
            </video>
          </div>
          <span className="mt-4">{userDetails.description}</span>
          {user._id === id &&
            <Link to={`/user-profile/${id}/edit`}>
              <button className="bg-white w-2/5 items-center rounded mt-32 border-2 border-solid border-blue-900 shadow-2xl hover:bg-sky-700 hover:text-white hover:border-white">Edit Profile</button>
            </Link>
          }
        </div>


      )
      }
    </div >
  );
}
export default ProfilePage;