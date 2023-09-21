import { useRef, useEffect } from "react";
// import Pinata from '../img/Pinata.jpeg';
const Canvas = () => {
  const canvas = useRef(); 

  const draw = (ctx) => {     

    const gradient = ctx.createLinearGradient(10, 0, 500, 0);
    gradient.addColorStop(0, 'red');
    gradient.addColorStop(1 / 6, 'orange');
    gradient.addColorStop(2 / 6, 'yellow');
    gradient.addColorStop(3 / 6, 'green');
    gradient.addColorStop(4 / 6, 'blue');
    gradient.addColorStop(5 / 6, 'indigo');
    gradient.addColorStop(1, 'violet');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.current.width, canvas.current.height);      
  };
  
  const drawPinata = (ctx, x, y, vx, vy) => {
    const img = new Image();
    img.onload = () => {
      let direction = true;
      ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);
      draw(ctx);
      ctx.drawImage(img, 105, 70, 300, 300, x, y, 300, 300);
      ctx.beginPath();
      ctx.arc(x + 45, y + 80, 45, 0, Math.PI * 2, true);
      ctx.fillStyle = 'black';
      ctx.fill();

      if (x + vx > canvas.current.width - 200 || x + vx < 0) {
        vx = -vx;
      }
      if (y + vy > canvas.current.height - 200 || y + vy < 0) {
        vy = -vy;
      }
      x += vx;
      y += vy;

      requestAnimationFrame(() => drawPinata(ctx, x, y, vx, vy));
    };
    img.src = 'https://imgs.search.brave.com/xAtlwyYP3sgceJ7EQHnJ9uAKH74l9KiqENdk-y50VI0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL3RodW1icy81/YzYxZTM4OWU0Yjhk/ZDAyOWZmMjViMDMu/cG5n';
  };  

  
  useEffect(() => {
    const ctx = canvas.current.getContext('2d'); 
    drawPinata(ctx, 0, 0, 1, 1);

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
