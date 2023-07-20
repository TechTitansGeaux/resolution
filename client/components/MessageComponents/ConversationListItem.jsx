import { React, useState, useEffect} from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
import relativeTime from 'dayjs/plugin/relativeTime';
import Conversation from './Conversation.jsx';


const ConversationListItem = (props) => {
  dayjs.extend(relativeTime);
  const { convo, loggedIn, updateView } = props;

  const [ otherUser, setOtherUser ] = useState('');



  useEffect(() => {
    const getOtherUser = async () => {
      if (loggedIn.id === convo.userOneId) {
        const request = await axios.get(`/users/${convo.userTwoId}`);
        setOtherUser(request.data.username);
      } else if (loggedIn.id === convo.userTwoId) {
        const request = await axios.get(`/users/${convo.userOneId}`);
        setOtherUser(request.data.username);
      }
    };
    getOtherUser();
  }, [loggedIn]);

  return (
    <div onClick={ () => { updateView(<Conversation loggedIn={loggedIn} convo={convo}/>); }}>
      <p className="scream modal-content  text-white pt-3">
        <span className="scream modal-content  text-sm-left">
          between you and { `${otherUser}` }
        </span>
        <span>
          created: {dayjs(`${convo.createdAt}`).fromNow()}
        </span>
      </p>
      <hr></hr>
    </div>
  );
};

export default ConversationListItem;
