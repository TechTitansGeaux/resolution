import { React, useState, useEffect } from 'react';
import axios from 'axios';
import MessageItem from './ConvoMessageItem.jsx';
import ContinueConversation from './ContinueConversation.jsx';
import io from 'socket.io-client';
const socket = io();

const Conversation = (props) => {
  const { convoId, loggedIn, otherUser, updateView } = props;

  const [ conversations, setConversations ] = useState([]);
  const [ refresh, setRefresh ] = useState(false);

  useEffect(() => {
    const fetchAllConvoMessages = async () => {
      const request = await axios.get(`/messagesHandling/messages${convoId}`);
      setConversations(request.data);
      setRefresh(false);
      return request;
    };
    fetchAllConvoMessages();
  }, [convoId, refresh]);


  useEffect(() => {
    socket.on('refresh', (data) => {
      console.log('data: ', data);
      setRefresh(true);
    });
  }, []);

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
            return <MessageItem
              key={message.id + message.conversationId}
              loggedIn={loggedIn}
              otherUser={otherUser}
              message={message}
            />;
          })
        }
      </div>
    </div>
  );

};

export default Conversation;
