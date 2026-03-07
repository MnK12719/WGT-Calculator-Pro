import React, { useState, useEffect } from "react";
import { recommendShot } from "../ai/shotOptimizer.js";
import { analyzeScreenshot } from "../ai/screenshotAnalyzer.js";
import clubs from "../../data/clubs.json";

export default function ShotCalculator({ shotData, setShotData }) {
  const [distance, setDistance] = useState(shotData.distance);
  const [windSpeed, setWindSpeed] = useState(shotData.windSpeed);
  const [windAngle, setWindAngle] = useState(shotData.windAngle);
  const [greenSlope, setGreenSlope] = useState(shotData.greenSlope);
  const [selectedClub, setSelectedClub] = useState(shotData.selectedClub);
  const [aimOffset, setAimOffset] = useState(shotData.aimOffset);
  const [spin, setSpin] = useState(shotData.spin);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!clubs || clubs.length === 0) return;
    const suitableClubs = clubs
      .filter(c => c.maxDistance * c.accuracy >= distance)
      .sort((a,b) => b.maxDistance*a.accuracy - a.maxDistance*b.accuracy);
    setSelectedClub(suitableClubs.length>0 ? suitableClubs[0].name : clubs[0].name);
  }, [distance]);

  const handleCalculate = () => {
    const clubData = clubs.find(c => c.name === selectedClub);
    const clubMultiplier = clubData ? clubData.accuracy : 1;
    const result = recommendShot([distance, windSpeed, windAngle, greenSlope, 0, clubMultiplier]);
    setAimOffset(result.aimOffset);
    setSpin(result.spin);
    setShotData({
      distance, windSpeed, windAngle, greenSlope, selectedClub,
      aimOffset: result.aimOffset, spin: result.spin, predictions
    });
  };

  const handleScreenshotUpload = async (e) => {
    if (!e.target.files.length) return;
    setLoading(true);
    const result = await analyzeScreenshot(e.target.files[0]);
    setDistance(result.distance);
    setWindSpeed(result.windSpeed);
    setWindAngle(result.windAngle);
    setGreenSlope(result.greenSlope);
    setPredictions(result.predictions);
    setLoading(false);
  };

  return (
    <div className="card">
      <h2>Elite Shot Calculator</h2>
      <input type="number" value={distance} onChange={e=>setDistance(+e.target.value)} placeholder="Distance"/>
      <input type="number" value={windSpeed} onChange={e=>setWindSpeed(+e.target.value)} placeholder="Wind Speed"/>
      <input type="number" value={windAngle} onChange={e=>setWindAngle(+e.target.value)} placeholder="Wind Angle"/>
      <input type="number" value={greenSlope} onChange={e=>setGreenSlope(+e.target.value)} placeholder="Green Slope"/>
      <p>Selected Club: <strong>{selectedClub}</strong></p>
      <button onClick={handleCalculate}>Calculate Shot</button>
      <p>Aim Offset: {aimOffset}</p>
      <p>Spin: {spin}</p>
      <h3>Upload Screenshot</h3>
      <input type="file" accept="image/*" onChange={handleScreenshotUpload}/>
      {loading && <p>Analyzing screenshot...</p>}
    </div>
  );
}
