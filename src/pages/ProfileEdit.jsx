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

  //using an external api 
  const [joke, setJoke] = useState("");
  const jokes = async () => {
    let response = await axios.get("https://geek-jokes.sameerkumar.website/api?format=json")
    setJoke(response.data)
    response.json(response.data)
  }
  useEffect(() => {
    jokes();
  }, []);





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
    <div className="profile">
      <div className="h-screen w-screen box-border container flex flex-col items-center md:h-screen md:w-auto md:text-center md:items-center ">

        <form onSubmit={handleSubmit} className="h-full w-full px-8 backdrop-blur-sm bg-white/20 rounded md:mt-12  md:w-2/5 md:h-4/5  box-border">
          <div className="flex flex-col items-center mt-32 mb-8 box-border">
            <label className="flex flex-col w-52 items-center text-pink-600" htmlFor="fileUrl"><b>Add a video</b>
              <input
                type="file"
                accept=".mp4, .mp3"
                name="fileUrl"
                onChange={handleFileUpload}
                placeholder="Add a video"
                className="w-52"
              />
            </label>
          </div>
          <div className="flex flex-col items-center mt-8 mb-8 box-border">
            <label htmlFor="description" className=" text-pink-600"><b>Add a description</b></label>
            <input
              type="text"
              size="100"
              name="description"
              value={description}
              maxLength="100"
              placeholder="Add a description (up to 100 characters)"
              className="rounded text-center border-2 border-solid border-sky-700 w-72"
              onChange={handleDescription} />
          </div>

          <div className="flex flex-row justify-around">
            <button className="font-bold bg-white border-2 border-solid border-blue-900 rounded w-3/12 shadow-2xl hover:bg-sky-700 hover:text-white hover:border-white" type="submit">Edit Profile</button>
            <button onClick={deleteProfile} className="font-bold  bg-white border-2 border-solid border-blue-900 rounded w-3/12 shadow-2xl hover:bg-sky-700 hover:text-white hover:border-white">Delete Profile</button>
          </div>
          <p className="mt-32">{joke.joke}</p>
        </form>


      </div>
    </div>
  );
}

export default ProfileEdit;