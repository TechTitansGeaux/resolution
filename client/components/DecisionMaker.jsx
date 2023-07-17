import { useState } from 'react';

const DecisionMaker = () => {
  const [hand, setHand] = useState('none');

  return (
    <div>
      <h1>Decision Maker</h1>
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
