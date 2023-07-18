import { React, useState } from 'react';

import StartConversation from './StartConversation.jsx';
import AllConversations from './AllConversations.jsx';

const Messages = (props) => {

  const [ view, updateView ] = useState(<AllConversations />);


  return (
    <div>
      <button onClick={() => { updateView(<AllConversations loggedIn={props.loggedIn} />); }}>all conversations</button>
      <button onClick={() => { updateView(<StartConversation loggedIn={props.loggedIn} />); }}>start conversation</button>
      { view }
    </div>
  );

};

export default Messages;
