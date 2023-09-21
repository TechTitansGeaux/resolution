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
  
  const drawPinata = (ctx, x, y) => {
    const img = new Image();
    img.onload = () => {
      //ctx.rotate(Math.PI / 4);
      ctx.drawImage(img, x, y);
      ctx.beginPath();
      ctx.arc(x + 150, y + 150, 45, 0, Math.PI * 2, true);
      ctx.fillStyle = 'black';
      ctx.fill();
    };
    img.src = 'https://imgs.search.brave.com/xAtlwyYP3sgceJ7EQHnJ9uAKH74l9KiqENdk-y50VI0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL3RodW1icy81/YzYxZTM4OWU0Yjhk/ZDAyOWZmMjViMDMu/cG5n';
  };  

  const drawStick = (ctx, x, y) => {
    const img = new Image();
    img.onload = () => {
      ctx.save();
      ctx.rotate((2 * Math.PI) / 4);
      ctx.drawImage(img, x, y, 250, 250);
    };
    img.src = 'https://imgs.search.brave.com/qdhZqbxoGLwfireOZZwwK_kFqJ8ha0KYpE4Mzj1WF4E/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL3RodW1icy81/ODUyZGQ4MjM5NGUy/ODAyNzFmM2I0OGIu/cG5n'
  };

  
  useEffect(() => {
    const ctx = canvas.current.getContext('2d'); 
    draw(ctx);
    drawPinata(ctx, 0, 0);
    drawStick(ctx, 100, 100);
    // const getPosition = (event) => {
    //   const mouseX = event.clientX - 300;
    //   const mouseY = event.clientY - 300;
    //   drawStick(ctx, mouseX, mouseY);
    // };
    // canvas.current.addEventListener("mouseover", getPosition, false);
    // return function cleanup() {
    //   canvas.current.removeEventListener("mouseover", getPosition);
    // };
  });

  // useEffect(() => {
  //   const ctx = canvas.current.getContext('2d');
  //   canvas.current.addEventListener("mouseover", getPosition, false);
  //   return function cleanup() {
  //     canvas.current.removeEventListener("mouseover", getPosition);
  //   };
  // }, []);

  return (
    <canvas
      ref={canvas} // ADDED
      width='500'
      height='400'
    />
  );
};

export default Canvas;
