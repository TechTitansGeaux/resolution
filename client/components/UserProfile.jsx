import React, { useState, useEffect } from 'react';
import axios from 'axios';
import fakeData from '../../server/database/fakeData';

const UserProfile = () => {

  return (
    <div>
      <h2>User Profile</h2>
      <p>Username: {user.username}</p>
      <p>Points: {user.points}</p>
      <p>Trophy: {user.trophy}</p>
      <p>Email: {user.email}</p>
      <p>Picture: {user.picture}</p>
      <p>Google ID: {user.googleId}</p>
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
