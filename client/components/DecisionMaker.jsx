import { useState } from 'react';
import axios from 'axios'; // make GET request to search users

const DecisionMaker = () => {
  const [hand, setHand] = useState('none'); // rock, paper, scissors hands
  const [searchInput, setSearchInput] = useState(''); // search input to search users

  // create function to GET all users
  const getAllUsers = () => {
    axios.get('/user', {
      params: {
        username: searchInput
      }
    })
      .then((response) => {
        console.log('response:', response);
      })
      .catch((err) => {
        console.log('error getting user:', err);
      });
  };

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  return (
    <div>
      <h1>Decision Maker</h1>
      <input type="text"
        placeholder='Search User'
        onChange={handleChange}
        value={searchInput}/>
      <button type="button"
      >Search Users</button>
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
    </div>
  );
};

export default DecisionMaker;
