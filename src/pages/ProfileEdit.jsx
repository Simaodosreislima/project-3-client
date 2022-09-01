import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import React from "react";
import { AuthContext } from '../context/auth.context';


function ProfileEdit() {
  const { logout } = useContext(AuthContext)
  const [profileVideos, setProfileVideos] = useState('');
  const [description, setDescription] = useState('');
  const [profileImg, setProfileImg] = useState('');
  const [fileUrl, setFileUrl] = useState("");
  const [loading, setLoading] = useState(false);


  const handleFileUpload = (e) => {
    setLoading(true);

    const uploadData = new FormData();

    uploadData.append("fileUrl", e.target.files[0]);

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/upload`, uploadData)
      .then((response) => {
        console.log(response.data.fileUrl)

        setLoading(false);
        if (e.target.files[0].type.includes("video")) {
          setProfileVideos(response.data.fileUrl)
        } else {
          setProfileImg(response.data.fileUrl)
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("Error while uploading the file: ", err);
      });
  };





  const { id } = useParams();
  const navigate = useNavigate();

  const getProfile = async () => {
    const storedToken = localStorage.getItem('authToken');
    try {
      let response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/${id}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      setProfileVideos(response.data.profileVideos);
      console.log(response.data.profileVideos)
      setDescription(response.data.description);
      setProfileImg(response.data.profileImg)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleDescription = (e) => setDescription(e.target.value);
  const handleProfileImg = (e) => setProfileImg(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();

    const body = { profileVideos, description, profileImg };
    const storedToken = localStorage.getItem('authToken');
    let response = axios
      .put(`${process.env.REACT_APP_API_URL}/api/user/${id}`, body, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then(() => {
        setProfileVideos("");
        setDescription('');
        setProfileImg('')
        navigate(`/user-profile/${id}`);
      })
      .catch((err) => console.log(err));
  };

  const deleteProfile = async () => {
    const storedToken = localStorage.getItem('authToken');
    try {
    /*   let response =  */await axios.delete(`${process.env.REACT_APP_API_URL}/api/user/${id}`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });
      logout()
      navigate('/');

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="h-screen w-screen box-border container flex flex-col items-center md:w-auto md:text-center md:items-center ">

        <form onSubmit={handleSubmit} className="h-full w-full px-8 backdrop-blur-sm bg-white/20 rounded md:mt-12  md:w-2/5 md:h-3/5  box-border">
          <div className="flex flex-col items-center mt-32 mb-8 box-border">
            <label className="flex flex-col w-8 items-center" htmlFor="fileUrl"><b>Add a video</b>
              <input
                type="file"
                accept=".mp4, .mp3"
                name="fileUrl"
                onChange={handleFileUpload}
                placeholder="Add a video"
                className="w-8"
              />
            </label>
          </div>
          <div className="flex flex-col items-center mt-8 mb-8 box-border">
            <label htmlFor="description"><b>Add a description</b></label>
            <input
              type="text"
              size="100"
              name="description"
              value={description}
              maxLength="100"
              placeholder="Add a description (up to 100 characters)"
              className="rounded text-center border-2 border-solid border-sky-700"
              onChange={handleDescription} />
          </div>
          {/* <input type="file" name="fileUrl" onChange={handleProfileImg} /> */}
          <button className="text-black font-bold" type="submit">Edit Profile</button>
        </form>

        <button onClick={deleteProfile}>Delete Profile</button>
      </div>
    </div>
  );
}

export default ProfileEdit;