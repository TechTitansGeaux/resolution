import { React, useState, useEffect} from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
import relativeTime from 'dayjs/plugin/relativeTime';


const ConversationListItem = (props) => {
  dayjs.extend(relativeTime);
  const { conversation, loggedIn } = props;

  const [ otherUser, setOtherUser ] = useState('');



  useEffect(() => {
    const getOtherUser = async () => {
      if (loggedIn.id === conversation.userOneId) {
        const request = await axios.get(`/users/${conversation.userTwoId}`);
        setOtherUser(request.data.username);
      } else if (loggedIn.id === conversation.userTwoId) {
        const request = await axios.get(`/users/${conversation.userOneId}`);
        setOtherUser(request.data.username);
      }
    };
    getOtherUser();
  }, []);

  return (
    <div>
      <p className="scream modal-content  text-white pt-3">
        <span className="scream modal-content  text-sm-left">
          between you and { `${otherUser}` }
        </span>
        <span>
          created: {dayjs(`${conversation.createdAt}`).fromNow()}
        </span>
      </p>
      <hr></hr>
    </div>
  );
};

export default ConversationListItem;
