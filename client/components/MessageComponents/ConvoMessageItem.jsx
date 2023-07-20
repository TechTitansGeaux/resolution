import { React, useState } from 'react';


const MessageItem = (props) => {
  const { message } = props;
  console.log(message);

  return (
    <div>
      <img src={message.img}></img>
    </div>
  );

};

export default MessageItem;
