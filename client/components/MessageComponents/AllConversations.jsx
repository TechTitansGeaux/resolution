import { React, useState, useEffect } from 'react';
import Conversation from './Conversation.jsx';
import axios from 'axios';

const AllConversations = (props) => {
  const { loggedIn } = props;

  const [ allConversations, setConversations ] = useState([]);

  const [ message, setMessage ] = useState('');

  const getAllConversations = () => {
    axios.get(`/messagesHandling/conversations${loggedIn.id}`)
      .then((res) => {
        // console.log(res.data);
        setConversations(res.data);
        if (allConversations.length === 0) {
          setMessage('You don\'t have any conversations yet click start conversation to start one up!');
        } else {
          setMessage('');
        }
      })
      .catch((err) => {
        console.log('failed to get all conversations: ', err);
      });
  };

  useEffect(() => {
    getAllConversations();
  }, [message]);





  return (
    <div>
      <h3>
        {message}
      </h3>
      {
        allConversations.map((el, i) => {
          return <Conversation key={el.id + i} />;
        })
      }
    </div>

  );
};

export default AllConversations;
