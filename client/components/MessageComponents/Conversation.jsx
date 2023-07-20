import { React, useState, useEffect} from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
import relativeTime from 'dayjs/plugin/relativeTime';


const Conversation = (props) => {
  dayjs.extend(relativeTime);
  const { conversation, loggedIn } = props;

  const [ otherUser, setOtherUser ] = useState('guy');

  const getOtherUser = () => {
    if (loggedIn.id === conversation.userOneId) {
      axios.get(`/users/${conversation.userTwoId}`)
        .then((res) => {
          console.log(res.data.username);
          setOtherUser(res.data.userName);
        })
        .catch((err) => {
          console.log('error getting other conversation participant', err);
        });

    } else if (loggedIn.id === conversation.userTwoId) {
      axios.get(`/users/${conversation.userOneId}`)
        .then((res) => {
          console.log(res.data.username);
          setOtherUser(res.data.userName);
        })
        .catch((err) => {
          console.log('error getting other conversation participant', err);
        });

    }

  };

  useEffect(() => {
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

export default Conversation;
