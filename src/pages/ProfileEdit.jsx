import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import React from "react";
import { AuthContext } from '../context/auth.context';


function ProfileEdit() {
  const { logout } = useContext(AuthContext)
  const [profileVideos, setProfileVideos] = useState('');
  const [description, setDescription] = useState('');
  const [profileImage, setProfileImage] = useState('');
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
        setFileUrl(response.data.fileUrl);
        setLoading(false);
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
      setProfileImage(response.data.profileImg)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleDescription = (e) => setDescription(e.target.value);
  const handleProfileImage = (e) => setProfileImage(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();

    const body = { profileVideos, description, profileImage };
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
        setProfileImage('')
        navigate(`/main`);
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
    <div className="EditProfilePage">
      <h3>Edit Profile</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="fileUrl">videos</label>
        <input
          type="file"
          accept=".mp4, .mp3"
          name="fileUrl"
          onChange={handleFileUpload} />

        <label htmlFor="description"> Description</label>
        <label htmlFor="description"> Description</label>
        <input type="text" name="description" value={description} maxLength="180" onChange={handleDescription} />

        <input type="file" name="profileImage" onChange={handleProfileImage} />
        <button className="text-white font-bold" type="submit">Edit Profile</button>
      </form>

      <button onClick={deleteProfile}>Delete Profile</button>
    </div>
  );
}

export default ProfileEdit;