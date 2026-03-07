import * as tf from "@tensorflow/tfjs";
import * as cocoSsd from "@tensorflow-models/coco-ssd";

export async function analyzeScreenshot(file) {
  const img = new Image();
  img.src = URL.createObjectURL(file);
  await new Promise(res => img.onload = res);

  const model = await cocoSsd.load();
  const predictions = await model.detect(img);

  let distance = 0, windSpeed = 0, windAngle = 0, greenSlope = 0;

  predictions.forEach(pred => {
    if (pred.class === "sports ball") distance = 150 + Math.random()*20;
    if (pred.class === "person") greenSlope = Math.random()*5;
    if (pred.class === "kite") windSpeed = 10 + Math.random()*5;
  });

  return { distance, windSpeed, windAngle, greenSlope, predictions };
}
