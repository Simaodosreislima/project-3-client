import { useState, useEffect } from 'react';
import axios from 'axios';
/* import { Link } from 'react-router-dom';
import AddProject from '../../components/AddProject/AddProject'; */

function MainPage() {
  const [user, setUser] = useState([]);

  const getUsers = async () => {
    try {
      const storedToken = localStorage.getItem('authToken');

      let response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });
      setUser(response.data.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  //leave the dependency array empty so it only runs on the mounting phase
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="UserListPage">
      <>
        return (
        <div className="UserCard">
          <h3>{user.firstName}</h3>
          <video width="100%" height="10%">{user.profileVideos}</video>
          <p>{user.description}</p>
          <button>See Profile</button>
          <br />
          <button>Nah</button>
          <button>yeah</button>
        </div>
        )
      </>
    </div>
  );
}

export default MainPage;