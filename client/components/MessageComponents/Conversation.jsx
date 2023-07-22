import { React, useState, useEffect } from 'react';
import axios from 'axios';
import MessageItem from './ConvoMessageItem.jsx';
import ContinueConversation from './ContinueConversation.jsx';

const Conversation = (props) => {
  const { convoId, loggedIn, otherUser, updateView } = props;
  const [ conversations, setConversations ] = useState([]);

  useEffect(() => {
    const fetchAllConvoMessages = async () => {
      const request = await axios.get(`/messagesHandling/messages${convoId}`);
      setConversations(request.data);
      return request;
    };
    fetchAllConvoMessages();
  }, [convoId]);

  return (
    <div className='text-center'>
      <div>
        <button
          className='btn btn-primary'
          onClick={ () => {
            updateView(<ContinueConversation
              convoId={convoId}
              loggedIn={loggedIn}
              otherUser={otherUser}
              updateView={updateView}/>);
          }}
        >send another meme</button>
      </div>
      <div>
        {
          conversations.map((message) => {
            return <MessageItem key={message.id + message.conversationId} message={message} />;
          })
        }
      </div>
    </div>
  );

};

export default Conversation;
