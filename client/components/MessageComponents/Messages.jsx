import { React, useState } from 'react';

import StartConversation from './StartConversation.jsx';
import AllConversations from './AllConversations.jsx';
import Landing from './Landing.jsx';

const Messages = (props) => {

  const [ view, updateView ] = useState(<Landing/>);


  return (
    <div className='section container'>
      <button className='btn btn-primary' onClick={() => {
        updateView(<AllConversations updateView={updateView} loggedIn={props.loggedIn} />);
      }}>all conversations</button>
      <button className='btn btn-primary' onClick={() => {
        updateView(<StartConversation updateView={updateView} loggedIn={props.loggedIn} />);
      }}>start conversation</button>
      { view }
    </div>
  );

};

export default Messages;
