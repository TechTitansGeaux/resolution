import { React, useState } from 'react';

import StartConversation from './StartConversation.jsx';
import AllConversations from './AllConversations.jsx';
import Landing from './Landing.jsx';

const Messages = (props) => {
  const {loggedIn, changePoints} = props;

  const [ view, updateView ] = useState(<Landing/>);


  return (
    <div className='section container'>
      <div className='text-center'>
        <button className='btn btn-primary' onClick={() => {
          updateView(<AllConversations updateView={updateView} loggedIn={loggedIn} />);
        }}>all conversations</button>{' '}

        <button className='btn btn-primary' onClick={() => {
          updateView(<StartConversation changePoints={changePoints} updateView={updateView} loggedIn={loggedIn} />);

        }}>start conversation</button>
      </div>
      { view }
    </div>
  );

};

export default Messages;
