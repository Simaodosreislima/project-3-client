import React from 'react';
import { useEffect, useState, useContext } from "react"
import { useParams, Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
function ProfilePage() {

  const [userDetails, setUserDetails] = useState(null);
  const { id } = useParams();

  const getUserDetails = async () => {
    try {
      const storedToken = localStorage.getItem('authToken');
      let response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/${id}`, {
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

  return (
    <div className="container flex content-center">
      {userDetails && (

        <div className="flex-col bg-red-500 rounded mt-12 w-42 h-96" key={userDetails._id}>
          <span>{userDetails.firstName} {userDetails.lastName}</span>
          <video>{userDetails.profileVideos}</video>
          <span>{userDetails.description}</span>
          <Link to={`/main`} className="bg-white rounded">
            <button>Edit Profile</button>
          </Link>
        </div>

      )}

    </div>
  )
}

export default ProfilePage