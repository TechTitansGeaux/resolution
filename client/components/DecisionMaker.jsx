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
  const [room, setRoom] = useState(''); // create room for rps players
  const [handReceived, setHandReceived] = useState('...'); // hand received from socket server
  const [result, setResult] = useState(''); // result after playing hands
  const [joined, setJoined] = useState(false); // help visually confirm if user joined room
  const [full, setFull] = useState(false); // if room is full
  const [ready, setReady] = useState(false); // if both players are ready

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
    if (joined === false) {
      if (room === '') {
        setFull(false);
      }
      if (room !== '') {
        socket.emit('join_room', room);
        setJoined(true);
      }
    }
  };

  // win lose tie logic
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
    if (!full) {
      socket.emit('hand', { hand, room });
      displayResult();
    }
  };

  // refresh page to play again
  const refreshPage = () => {
    window.location.reload(false);
  };

  // if both players are ready
  useEffect(() => {
    socket.on('ready', (data) => {
      console.log(data);
      setReady(true);
      console.log(ready);
    });
  });

  // receive if room is full
  useEffect(() => {
    socket.on('full', (data) => {
      setFull(true);
      console.log(data);
    });
  });

  // receive socket server info
  useEffect(() => {
    socket.on('receive_hand', (data) => {
      // console.log(data.hand);
      setHandReceived(data.hand);
    });
  }, [socket]);

  // show result when handReceived changes
  useEffect(() => {
    displayResult();
  }, [handReceived]);

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
          if (e.target.value === '') {
            setFull(false);
            setHand('none');
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            joinRoom();
          }
        }}
      />
      <button onClick={joinRoom}> Join Room </button>
      <div>
        {!joined ? (<h2></h2>) : <h2>You are in room: {room}</h2>}
      </div>
      <div>{!full ? (<h2></h2>) : <h2>The room is full</h2>}</div>
      <h2>You picked {hand}!</h2>

      <div>
        {!result ? (<h2></h2>) : ( <div>
          <h2>Your opponent picked {handReceived}!</h2>
          <h2>{result}</h2>
          <button onClick={refreshPage}>Click to Play Again!</button>
        </div>)}
      </div>

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
