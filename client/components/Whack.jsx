import { useState, useEffect } from "react";
import axios from 'axios';
import { setAuthUser } from './store/appSlice';
import Canvas from './Canvas.jsx';
import io from 'socket.io-client';
import Notification from "./Notifications.jsx";
const socket = io();

const Whack = ({changePoints}) => {

  const handleWhack = () => {

    socket.emit('test_notify');
  };

  
  return (
    <div className="pinata">

      <div className="canvas-component">
        <div>
          <Canvas/>
        </div>
      </div>
      <button
        id="whack-button"
        onClick={handleWhack}
      >Whack'em!</button>
      <Notification />
    </div>
    
  );
};

export default Whack;

