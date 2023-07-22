import { React, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const MessageItem = (props) => {
  const { message, loggedIn, otherUser } = props;
  console.log(props);

  const [messageData, setMessageData] = useState('');

  useEffect(() => {
    if (message.senderId === loggedIn.id) {
      setMessageData(
        <div>
          <span>
            from you to {otherUser.username}
          </span>
          <br></br>
          <span>
            created: {dayjs(`${message.createdAt}`).fromNow()}
          </span>
        </div>
      );
    } else if (message.senderId === otherUser.id) {
      setMessageData(
        <div>
          <span>
            from {otherUser.username} to you
          </span>
          <span>
            created: {dayjs(`${message.createdAt}`).fromNow()}
          </span>
        </div>
      );
    }
  }, []);

  return (
    <div>
      <br></br>
      <img className='img-thumbnail' src={message.img}></img>
      <div>
        {messageData}
      </div>
    </div>
  );

};

export default MessageItem;
