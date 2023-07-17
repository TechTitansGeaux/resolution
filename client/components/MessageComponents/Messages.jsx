import { React, useState } from 'react';

import StartConversation from './StartConversation.jsx';
import AllConversations from './AllConversations.jsx';

const Messages = () => {

  const [ view, updateView ] = useState(<AllConversations />);


  return (
    <div>
      <button onClick={() => { updateView(<AllConversations />); }}>all conversations</button>
      <button onClick={() => { updateView(<StartConversation />); }}>start conversation</button>
      { view }
    </div>
  );

};

export default Messages;
