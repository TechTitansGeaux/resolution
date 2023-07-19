import { React, useState } from 'react';
import { Conversation } from './Conversation.jsx';
import axios from 'axios';

const AllConversations = (props) => {
  const { loggedIn } = props;

  const [ allConversations, setConversations ] = useState([]);

  const getAllConversations = () => {
    axios.get(`/messagesHandling/conversations${loggedIn.id}`)
      .then((res) => {
        setConversations(res.data);
      })
      .catch((err) => {
        console.log('failed to get all conversations: ', err);
      });
  };

  getAllConversations();

  return (
    <h1>
      all conversations
    </h1>
  );
};

export default AllConversations;
