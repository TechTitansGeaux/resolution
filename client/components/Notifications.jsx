import React, {useEffect} from 'react';
import io from 'socket.io-client';

const Notification = () => {

  useEffect(() => {
    //connect to socket.io server
    const socket = io('http://localhost:4000');

    //listen for incoming notifications
    socket.on('notification', (message) => {
      //preview message
      console.log('Received test notification', message);
    });
    //disconnect on unmount
    return () => socket.disconnect();

  }, []);

  return (
    <div>

    </div>
  );
}

export default Notification;
