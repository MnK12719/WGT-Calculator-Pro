import React, { useState, useEffect } from "react";

export default function PuttCalculator({ distance, greenSlope, windSpeed, windAngle, setAimOffset, setSpin }) {
  const [strokePower, setStrokePower] = useState(0);
  const [aimAdjustment, setAimAdjustment] = useState(0);

  // Basic putting physics calculation
  useEffect(() => {
    if (distance <= 0) return;

    // Adjust aim based on green slope (simple linear approx)
    const slopeEffect = greenSlope * 0.5;

    // Adjust for wind (minor effect on putts)
    const windEffect = (windSpeed / 10) * Math.sin((windAngle * Math.PI) / 180);

    const totalAimOffset = slopeEffect + windEffect;
    setAimAdjustment(totalAimOffset.toFixed(1));

    // Approximate stroke power
    const power = Math.min(distance * 0.9, 100); // cap at 100
    setStrokePower(power.toFixed(1));

    // Update parent state for trajectory visualization
    if (setAimOffset) setAimOffset(totalAimOffset);
    if (setSpin) setSpin(0); // putts usually no spin
  }, [distance, greenSlope, windSpeed, windAngle, setAimOffset, setSpin]);

  return (
    <div className="card">
      <h2>Putt Calculator</h2>
      <p>Distance to hole: <strong>{distance} yd</strong></p>
      <p>Green slope: <strong>{greenSlope.toFixed(2)}</strong></p>
      <p>Wind speed: {windSpeed} mph, angle: {windAngle}°</p>
      <hr />
      <p><strong>Aim Adjustment:</strong> {aimAdjustment}°</p>
      <p><strong>Stroke Power:</strong> {strokePower}%</p>
      <p>Tip: Adjust your club face to aim {aimAdjustment}° off center and use {strokePower}% power.</p>
    </div>
  );
}
