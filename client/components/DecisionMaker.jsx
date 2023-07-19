import { useState, useEffect } from 'react';
import axios from 'axios'; // make GET request to search users
// import '../../node_modules/socket.io';
// const http = require('http');
const socket = io();
//import { socket } from '../socket';

const DecisionMaker = () => {
  const [hand, setHand] = useState('none'); // rock, paper, scissors hands
  const [searchInput, setSearchInput] = useState(''); // search input to search users
  const [user, setUser] = useState(''); // set user (your opponent) state

  // create function to GET user by username
  const getUser = () => {
    axios.get(`/decisionmaker/user/${searchInput}`)
      .then((response) => {
        //console.log('response:', response);
        if (response.data === 'OK') {
          setUser(searchInput);
          setSearchInput('');
        }
      })
      .catch((err) => {
        console.error('error getting user:', err);
        setUser('User does not exist. Please enter a valid username');
      });
  };

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const sendHand = () => {
    socket.emit('hand', { message: hand });
  };

  useEffect(() => {
    socket.on('receive_hand', (data) => {
      console.log(data.message);
    });
  });

  return (
    <div className='section container'>
      <h1>Decision Maker</h1>
      <input type="text"
        placeholder='Search User'
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            getUser();
          }
        }}
        value={searchInput}/>
      <button type="button"
        onClick={getUser}
      >Search Users</button>
      <h2>Your Opponent: {user}</h2>
      <h2>You picked {hand}!</h2>
      <button type="button"
        onClick={() => setHand('rock')}
      >Rock</button>
      <button type="button"
        onClick={() => setHand('paper')}
      >Paper</button>
      <button type="button"
        onClick={() => setHand('scissors')}
      >Scissors</button>
      <button type="button"
        onClick={sendHand}
      >Send Hand</button>
    </div>
  );
};

export default DecisionMaker;
