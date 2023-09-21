import { useState, useEffect } from "react";
import axios from 'axios';
import { setAuthUser } from './store/appSlice';
import Canvas from './Canvas.jsx';

const Whack = ({changePoints}) => {

  
  return (
    <div className="pinata">
  
      <div className="canvas-component">
        <div>
          <Canvas/>
        </div>
      </div>
      <button id="whack-button">Whack'em!</button>
    </div>
  );
};

export default Whack;

