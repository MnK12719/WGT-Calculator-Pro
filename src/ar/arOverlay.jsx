import React, { useRef, useEffect } from "react";

export default function AROverlay({ predictions=[] }) {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,canvas.width,canvas.height);
    predictions.forEach(pred => {
      ctx.strokeStyle = "yellow";
      ctx.lineWidth = 2;
      ctx.strokeRect(...pred.bbox);
      ctx.fillStyle = "red";
      ctx.fillText(pred.class, pred.bbox[0], pred.bbox[1]-5);
    });
  }, [predictions]);

  return <canvas ref={canvasRef} width={500} height={250} style={{background:"#004d33",borderRadius:"10px"}}/>
}
