import { React, useState, useEffect } from 'react';
import ConversationListItem from './ConversationListItem.jsx';
import axios from 'axios';
import io from 'socket.io-client';
const socket = io();

const AllConversations = (props) => {
  const { loggedIn, updateView } = props;

  const [ allConversations, setConversations ] = useState([]);
  const [ message, setMessage ] = useState('');
  const [ refresh, setRefresh ] = useState(false);

  const getAllConversations = () => {
    axios.get(`/messagesHandling/conversations${loggedIn.id}`)
      .then((res) => {
        setConversations(res.data);
        if (allConversations.length === 0) {
          setMessage('You don\'t have any conversations yet click start conversation to start one up!');
          setRefresh(false);
        } else {
          setMessage('');
          setRefresh(false);
        }
      })
      .catch((err) => {
        console.log('failed to get all conversations: ', err);
      });
  };

  useEffect(() => {
    getAllConversations();
  }, [message, refresh]);

  useEffect(() => {
    socket.on('refresh', (data) => {
      console.log('data: ', data);
      setRefresh(true);
    });
  }, []);

  return (
    <div className='text-center'>
      <h1 className='text-primary'>All Conversations</h1>
      <h3>
        {message}
      </h3>
      <div style={{ width: '75%'}} className='scream-container bg-primary container ps-3 pt-3 pb-2'>
        {
          allConversations.map((conversation, i) => {
            return <ConversationListItem
              updateView={updateView}
              loggedIn={loggedIn}
              convo={conversation}
              key={conversation.createdAt + i} />;
          })
        }
      </div>
    </div>

  );
};

export default AllConversations;
