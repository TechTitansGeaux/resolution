import { useState, useEffect } from "react";
import axios from 'axios';

const Whack = ({changePoints}) => {

  const draw = () => {
    const canvas = document.getElementById("canvas");
    if (canvas.getContext) {
      const ctx = canvas.getContext("2d");

      ctx.fillRect(25, 25, 100, 100);
      ctx.clearRect(45, 45, 60, 60);
      ctx.strokeRect(50, 50, 50, 50);
    } 
  };

  useEffect(() => {
    draw();
  }, []);

  return (
    <div class="pinata">
  
      <div class="canvas-component">
        <div>
          <canvas id="canvas" width="500" height="400" role="presentation">circles</canvas>
        </div>
      </div>
      <button id="whack-button">Whack'em!</button>
    </div>
  );
};

export default Whack;

