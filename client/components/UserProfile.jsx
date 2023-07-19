import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthUser } from './store/appSlice';

const UserProfile = () => {
  const authUser = useSelector((state) => state.app.authUser);
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');

  useEffect(() => {
    if (authUser) {
      setUsername(authUser.username);
    }
  }, [authUser]);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleUpdateUser = async () => {
    try {
      const updatedUser = { ...authUser, username };
      const response = await axios.patch(`/users/${authUser.id}`, updatedUser);
      if (response && response.data) {
        dispatch(setAuthUser(response.data));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const response = await axios.delete(`/users/${authUser.id}`);
      if (response && response.data) {
        // Handle the successful deletion of the user, e.g., redirect to another page
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!authUser) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>Username: {authUser.username}</p>
      <p>Points: {authUser.points}</p>
      <p>Trophy: {authUser.trophy}</p>
      <img src={authUser.picture} alt="User Picture" />
      <div>
        <label htmlFor="usernameInput">Change Username:</label>
        <input
          type="text"
          id="usernameInput"
          value={username}
          onChange={handleUsernameChange}
        />
        <button onClick={handleUpdateUser}>Update Username</button>
      </div>
      <button onClick={handleDeleteUser}>Delete Profile</button>
    </div>
  );
};

export default UserProfile;
