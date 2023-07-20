import { React, useState, useEffect } from 'react';
import axios from 'axios';
import MessageItem from './ConvoMessageItem.jsx';

const Conversation = (props) => {
  const { convo, loggedIn } = props;

  const [ conversations, setConversations ] = useState([]);



  useEffect(() => {
    const fetchAllConvoMessages = async () => {
      const request = await axios.get(`/messagesHandling/messages${convo.id}`);
      setConversations(request.data);
      return request;
    };
    fetchAllConvoMessages();
  }, [convo]);

  return (
    <div>
      {
        conversations.map((message) => {
          return <MessageItem key={message.id + message.conversationId} message={message} />;
        })
      }
    </div>
  );

};

export default Conversation;
