import { useState, useEffect } from 'react';
//import axios from 'axios'; // make GET request to search users STRETCH GOAL
import io from 'socket.io-client';
const socket = io();
import PAPER from "../img/PAPER.png";
import SCISSORS from "../img/SCISSORS.png";
import ROCK from "../img/ROCK.png";

const DecisionMaker = () => {
  const [hand, setHand] = useState('none'); // rock, paper, scissors hands
  //const [searchInput, setSearchInput] = useState(''); // search input to search users
  //const [user, setUser] = useState(''); // set user (your opponent) state
  const [room, setRoom] = useState(''); // create room for rps players
  const [handReceived, setHandReceived] = useState('...'); // hand received from socket server
  const [result, setResult] = useState(''); // result after playing hands
  const [joined, setJoined] = useState(false); // help visually confirm if user joined room
  const [full, setFull] = useState(false); // if room is full
  const [ready, setReady] = useState(false); // if both players are ready

  // create function to GET user by username
  // STRETCH GOAL find user and create connection on user search
  // const getUser = () => {
  //   axios.get(`/decisionmaker/user/${searchInput}`)
  //     .then((response) => {
  //       //console.log('response:', response);
  //       if (response.data === 'OK') {
  //         setUser(searchInput);
  //         setSearchInput('');
  //       }
  //     })
  //     .catch((err) => {
  //       console.error('error getting user:', err);
  //       setUser('User does not exist. Please enter a valid username');
  //     });
  // };

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

  // send rock, paper, or scissors to socket server and opponent
  const sendHand = () => {
    if (!full) {
      socket.emit('hand', { hand, room });
      displayResult();
    }
  };

  // refresh page to play again
  const refreshPage = () => {
    window.location.reload(false);
    // setHand('none');
    // setRoom('');
    // setHandReceived('...');
    // setResult('');
    // setJoined('false');
    // setFull('false');
    // setReady('false');
  };

  // if one player is ready, send READY to other player
  useEffect(() => {
    socket.on('ready', (data) => {
      //console.log(data);
      setReady(true);
      //console.log('ready:', ready);
      socket.emit('other_ready', {ready: 'READY', room: room});
    });
  });

  // see if other player is ready
  useEffect(() => {
    socket.on('other_ready', (data) => {
      setReady(true);
      //console.log('other_ready:', ready);
    });
  }, [ready]);

  // receive if room is full
  useEffect(() => {
    socket.on('full', (data) => {
      setFull(true);
      //console.log(data);
    });
  });

  // receive opponent's hand data
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
      <h1 className="text-primary">Decision Maker: Rock, Paper, Scissors</h1>

      {/* <input type="text"
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

      <h2>Your Opponent: {user}</h2> */}

      <input placeholder='Enter Room Number'
        onChange={(e) => {
          setRoom(e.target.value);
          if (e.target.value === '') {
            setFull(false);
            setJoined(false);
            setReady(false);
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
        {!joined ? (<h2></h2>) : <h2 className="text-primary">You are in room: {room}</h2>}
      </div>
      <div>
        {!full ? (<h2></h2>) : <h2 className="text-primary">Room {room} is full</h2>}
      </div>

      <div>{!ready ? (<h2 className="text-primary">Waiting</h2>) :
        (<div>

          <h2 className="text-primary">Let's play!</h2>

          <button
          ><img src={ROCK} alt='ROCK' onClick={() => setHand('rock')}/>
          </button>

          <button
          ><img src={PAPER} alt='PAPER' onClick={() => setHand('paper')}/>
          </button>

          <button
          ><img src={SCISSORS} alt='SCISSORS' onClick={() => setHand('scissors')}/>
          </button>

          <button type="button"
            onClick={() => sendHand()}
          >Send Hand</button>
          <h2 className="text-primary">You picked {hand}!</h2>
        </div>)}
      </div>

      <div>
        {!result ? (<h2></h2>) : ( <div>
          <h2 className="text-primary">Your opponent picked {handReceived}!</h2>
          <h2 className="text-primary">{result}</h2>
          <button onClick={refreshPage}>Click to Play Again!</button>
        </div>)}
      </div>
    </div>
  );
};

export default DecisionMaker;
