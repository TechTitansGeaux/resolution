import React, {useEffect} from 'react';
import io from 'socket.io-client';

const Notification = () => {

  const [notifications, setNotification] = useState([]);

  useEffect(() => {
    //connect to socket.io server
    const socket = io('http://localhost:4000');

    //listen for incoming notifications
    socket.on('notification', (message) => {
      //add incoming notifications to state
      setNotification((prevNotifications) => [...prevNotifications, message]);
      //preview message
      console.log('Received test notification', message);
    });
    //disconnect on unmount
    return () => socket.disconnect();

  }, []);

  return (
    <div className='notify-container'>
      <h3> Notification</h3>
      <ul>
        {notifications.map((notification, index) => {
          return <li
            key={index}
          >
            {notification}
          </li>;
        })}
      </ul>

    </div>
  );
};

export default Notification;
