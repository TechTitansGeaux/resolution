import { useRef, useEffect } from "react";
// import Pinata from '../img/Pinata.jpeg';
const Canvas = () => {
  const canvas = useRef(); 

  const draw = (ctx) => {     
    // //create clipping path
    // ctx.beginPath();
    // ctx.arc(100, 100, 60, 0, Math.PI * 2, true);
    // ctx.clip();

    const gradient = ctx.createLinearGradient(10, 0, 500, 0);
    gradient.addColorStop(0, 'red');
    gradient.addColorStop(1 / 6, 'orange');
    gradient.addColorStop(2 / 6, 'yellow');
    gradient.addColorStop(3 / 6, 'green');
    gradient.addColorStop(4 / 6, 'blue');
    gradient.addColorStop(5 / 6, 'indigo');
    gradient.addColorStop(1, 'violet');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 500, 400);      
  };
  
  const drawImage = (ctx, x, y) => {

    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, x, y);
      ctx.beginPath();
      ctx.arc(x + 150, y + 150, 45, 0, Math.PI * 2, true);
      ctx.clip();
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, 500, 400);
    };
    img.src = 'https://imgs.search.brave.com/xAtlwyYP3sgceJ7EQHnJ9uAKH74l9KiqENdk-y50VI0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL3RodW1icy81/YzYxZTM4OWU0Yjhk/ZDAyOWZmMjViMDMu/cG5n';
  };  
    
  
  useEffect(() => {
    const ctx = canvas.current.getContext('2d'); 
    draw(ctx);
    drawImage(ctx, -50, 0);
  });
  return (
    <canvas
      ref={canvas} // ADDED
      width='500'
      height='400'
    />
  );
};

export default Canvas;
