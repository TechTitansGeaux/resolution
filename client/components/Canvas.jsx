import { useRef, useEffect } from "react";
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
    ctx.fillRect(0, 0, 500, 400);       
  };

  useEffect(() => {
    const ctx = canvas.current.getContext('2d'); 
    draw(ctx);
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
