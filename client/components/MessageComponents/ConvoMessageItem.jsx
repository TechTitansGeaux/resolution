import { React, useState } from 'react';


const MessageItem = (props) => {
  const { message } = props;

  return (
    <div>
      <img className='rounded' src={message.img}></img>
    </div>
  );

};

export default MessageItem;
