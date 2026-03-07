import React, { useState } from "react";
import ShotCalculator from "./components/ShotCalculator.jsx";
import Trajectory3DVisualizer from "./components/Trajectory3DVisualizer.jsx";
import AROverlay from "./ar/arOverlay.jsx";
import AnalyticsDashboard from "./components/AnalyticsDashboard.jsx";

export default function App() {
  const [shotData,setShotData] = useState({
    distance:150, aimOffset:0, spin:0,
    selectedClub:null, windSpeed:10, windAngle:0,
    greenSlope:0, predictions:[]
  });

  return (
    <div>
      <h1>Ultimate WGT Pro AI</h1>
      <ShotCalculator shotData={shotData} setShotData={setShotData}/>
      <h2>Trajectory Preview</h2>
      <Trajectory3DVisualizer {...shotData}/>
      <h2>AR Overlay</h2>
      <AROverlay predictions={shotData.predictions}/>
      <AnalyticsDashboard/>
    </div>
  );
}
