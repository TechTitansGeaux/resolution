import { React, useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';


const Conversation = (props) => {
  dayjs.extend(relativeTime);
  const { conversation } = props;

  return (
    <p className="scream modal-content  text-white pt-3">
      <span>
        created: {dayjs(`${conversation.createdAt}`).fromNow()}
      </span>
      <hr></hr>
    </p>
  );
};

export default Conversation;
