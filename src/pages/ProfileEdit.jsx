/* import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import React from "react";

function ProfileEdit() {
  const [videos, setVideos] = useState('');
  const [description, setDescription] = useState('');
  const [profileImage, setProfileImage] = useState('');

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
      console.log(response.data)
      setVideos(response.data.profileVideos);
      setDescription(response.data.description);
      setProfileImage(response.data.profileImg)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleVideos = (e) => setVideos(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleProfileImage = (e) => setProfileImage(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();

    const body = { videos, description, profileImage };
    const storedToken = localStorage.getItem('authToken');
    axios
      .put(`${process.env.REACT_APP_API_URL}/api/user/${id}`, body, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then(() => {
        setVideos('');
        setDescription('');
        setProfileImage('')
        navigate(`api/user`);
      })
      .catch((err) => console.log(err));
  };

  const deleteProfile = async () => {
    const storedToken = localStorage.getItem('authToken');
    try {
      let response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/user/${id}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    deleteProfile();
  }, [])

  return (
    <div className="EditProfilePage">
      <h3>Edit Profile</h3>

      <form onSubmit={handleSubmit}>
        <label htmlFor="videos">videos</label>
        <input type="file" name="videos" value={videos} onChange={handleVideos} />

        <label htmlFor="description"> Description</label>
        <input type="text" name="description" value={description} onChange={handleDescription} />
        <label htmlFor="description"> Description</label>

        <input type="file" name="profileImage" value={profileImage} onChange={handleProfileImage} />
        <button type="submit">Edit Profile</button>
      </form>

      <button onClick={deleteProfile}>Delete Profile</button>
    </div>
  );
}

export default ProfileEdit; */