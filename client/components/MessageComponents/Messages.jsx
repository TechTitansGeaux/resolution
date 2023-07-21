import { React, useState } from 'react';

import StartConversation from './StartConversation.jsx';
import AllConversations from './AllConversations.jsx';

const Messages = (props) => {

  const [ view, updateView ] = useState(<AllConversations updateView={updateView} loggedIn={props.loggedIn}/>);


  return (
    <div className='section container'>
      <button onClick={() => {
        updateView(<AllConversations updateView={updateView} loggedIn={props.loggedIn} />);
      }}>all conversations</button>
      <button onClick={() => {
        updateView(<StartConversation updateView={updateView} loggedIn={props.loggedIn} addPoints={props.addPoints}/>);
      }}>start conversation</button>
      { view }
    </div>
  );

};

export default Messages;
