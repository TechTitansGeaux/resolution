import { useState, useEffect } from "react";
import axios from 'axios';
import { setAuthUser } from './store/appSlice';
import Canvas from './Canvas.jsx';

const Whack = () => {
  const [searchInput, setSearchInput] = useState(''); // search input to search users
  const [user, setUser] = useState(''); // set user (your opponent) state
  const [userPhoto, setUserPhoto] = useState(''); //set user photo src

  const getUser = () => {
    axios.get(`/users/search/${searchInput}`)
      .then((response) => {
        setUser(response.data.username);
        setUserPhoto(response.data.picture);
      })
      .catch((err) => {
        console.error('error getting user:', err);
        setUser('User does not exist. Please enter a valid username');
      });
  };
  
  // value to search username
  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };
  
  return (
    <div className="pinata">
      <input type="text"
        placeholder='Who would you like to Whack?'
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            getUser();
          }
        }}
        value={searchInput}/>

      <button type="button"
        onClick={getUser}
      >Search</button>
      <h2>Your Opponent: {user}</h2>
      <img src={userPhoto} />
      <div className="canvas-component">
        <div>
          <Canvas/>
        </div>
      </div>
      <button id="whack-button">Whack'em!</button>
    </div>
  );
};

export default Whack;

