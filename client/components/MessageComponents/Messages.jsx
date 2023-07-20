import { React, useState } from 'react';

import StartConversation from './StartConversation.jsx';
import AllConversations from './AllConversations.jsx';
import Conversation from './Conversation.jsx';

const Messages = (props) => {

  const [ view, updateView ] = useState(<AllConversations loggedIn={props.loggedIn}/>);


  return (
    <div className='section container'>
      <button onClick={() => {
        updateView(<AllConversations loggedIn={props.loggedIn} />);
      }}>all conversations</button>
      <button onClick={() => {
        updateView(<StartConversation updateView={updateView} loggedIn={props.loggedIn} />);
      }}>start conversation</button>
      { view }
    </div>
  );

};

export default Messages;
