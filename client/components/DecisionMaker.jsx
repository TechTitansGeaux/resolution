import { useState, useEffect } from 'react';
import axios from 'axios'; // make GET request to search users
// import '../../node_modules/socket.io';
// const http = require('http');
// const socket = io();
//import { socket } from '../socket';

const DecisionMaker = () => {
  const [hand, setHand] = useState('none'); // rock, paper, scissors hands
  const [searchInput, setSearchInput] = useState(''); // search input to search users
  const [user, setUser] = useState(''); // set user (your opponent) state
  const [room, setRoom] = useState(''); // create room for rps players
  const [handReceived, setHandReceived] = useState('...'); // hand received from socket server
  const [result, setResult] = useState(''); // result after playing hands

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

  // value to search username
  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  // join room
  const joinRoom = () => {
    if (room !== '') {
      socket.emit('join_room', room);
    }
  };

  // win lose tie logic (HANDLE THIS SERVER SIDE??)
  const displayResult = () => {
    if (hand === handReceived) {
      setResult('Tie!');
    } else if (hand === 'rock' && handReceived === 'scissors') {
      setResult('You win!');
    } else if (hand === 'rock' && handReceived === 'paper') {
      setResult('You lose!');
    } else if (hand === 'paper' && handReceived === 'rock') {
      setResult('You win!');
    } else if (hand === 'paper' && handReceived === 'scissors') {
      setResult('You lose!');
    } else if (hand === 'scissors' && handReceived === 'paper') {
      setResult('You win!');
    } else if (hand === 'scissors' && handReceived === 'rock') {
      setResult('You lose!');
    }
  };

  // send rock, paper, or scissors to socket server
  const sendHand = () => {
    socket.emit('hand', { hand, room });
    displayResult();
    //socket.emit('checkResults', {hand, room, p1});
    // console.log('result', result);
    // console.log('p1:', p1);
  };

  // receive socket server info
  useEffect(() => {
    socket.on('receive_hand', (data) => {
      console.log(data.hand);
      setHandReceived(data.hand);
      displayResult();
      console.log('handReceived:', handReceived);
      console.log('result:', result);
    });
  }, [socket]);


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

      <input placeholder='Enter Room Number'
        onChange={(e) => {
          setRoom(e.target.value);
        }}
      />
      <button onClick={joinRoom}> Join Room </button>
      <h2>Room Number: {room}</h2>

      <h2>You picked {hand}!</h2>
      <h2>Your opponent picked {handReceived}!</h2>
      <h2>{result}</h2>

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
        onClick={() => sendHand()}
      >Send Hand</button>
    </div>
  );
};

export default DecisionMaker;
