import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


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
      {user.map((user) => {
        return (
          <div className="UserCard" key={user._id}>
            <span>{user.firstName}</span>
            <span>{user.lastName}</span>
            <video>{user.profileVideos}</video>
            <span>{user.description}</span>
            <Link to={`/user-profile/${user._id}`}>
              <button>See Profile</button>
            </Link>

          </div>
        )
      })}
    </div >
  );
}

export default MainPage;