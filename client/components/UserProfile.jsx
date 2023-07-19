import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthUser } from './store/appSlice';

const UserProfile = () => {
  const authUser = useSelector((state) => state.app.authUser);
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [updatedUsername, setUpdatedUsername] = useState('');

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
      const updatedUser = { ...authUser, username: updatedUsername };
      const response = await axios.patch(`/users/${authUser.id}`, updatedUser);
      if (response && response.data) {
        dispatch(setAuthUser(response.data));
        setUpdatedUsername(''); // clear the input field after successful update
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const response = await axios.delete(`/users/${authUser.id}`);
      if (response && response.data) {
        
        window.location.href = 'http://127.0.0.1:4000';
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (!authUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container section'>
      <h2>User Profile</h2>
      <img src={authUser.picture} alt="User Picture" />
      <p>Username: {authUser.username}</p>
      <div>
        <label htmlFor="usernameInput">Edit Username:</label>
        <input
          type="text"
          id="usernameInput"
          value={updatedUsername}
          onChange={(event) => setUpdatedUsername(event.target.value)}
        />
        <button onClick={handleUpdateUser}>Save</button>
      </div>
      <p>Points: {authUser.points}</p>
      <p>Trophy: {authUser.trophy}</p>
      <button onClick={handleDeleteUser}>Delete Profile</button>
    </div>
  );
};

export default UserProfile;
