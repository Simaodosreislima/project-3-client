import React from 'react';
import { useEffect, useState, useContext } from "react"
import { useParams, Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "./signup.css"
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
    <div className="profile">
      <div className="h-screen box-border md:w-1/5 container flex  md:m-auto text-center  ">
        {userDetails && (
          <div key={userDetails._id} className=" h-full md:h-4/5 flex-col backdrop-blur-sm bg-white/10 rounded md:mt-6 w-screen box-border border-opacity-75 shadow-2xl" >
            <p className="uppercase mt-2 font-bold text-lg text-pink-600">{userDetails.firstName} {userDetails.lastName}</p>

            <video controls loop autoPlay className="h-2/5 w-screen mt-12 object-cover object-center border-solid box-border border-white border-1 rounded" >
              <source src={userDetails.profileVideos} />
            </video>

            <div>
              <p className="px-4 text-justify text-clip bg-white/70">{userDetails.description}</p>
            </div>
            {user._id === id &&
              <Link to={`/user-profile/${id}/edit`}>
                <button className="bg-white w-2/5 items-center rounded mt-14 border-2 border-solid border-blue-900 shadow-2xl hover:bg-sky-700 hover:text-white hover:border-white">Edit Profile</button>
              </Link>
            }
          </div>


        )
        }
      </div >
    </div>
  );
}
export default ProfilePage;