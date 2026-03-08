import React, { useState } from "react";
import ShotCalculator from "./components/ShotCalculator.jsx";
import Trajectory3DVisualizer from "./components/Trajectory3DVisualizer.jsx";
import AROverlay from "./ar/arOverlay.jsx";
import AnalyticsDashboard from "./components/AnalyticsDashboard.jsx";
import ClubBag from "./components/ClubBag.jsx";
import PuttCalculator from "./components/PuttCalculator.jsx";

export default function App() {
  const [shotData, setShotData] = useState({
    distance: 150,
    aimOffset: 0,
    spin: 0,
    selectedClub: null,
    windSpeed: 10,
    windAngle: 0,
    greenSlope: 0,
    predictions: []
  });

  return (
    <div className="app-container">
      <header>
        <h1>Ultimate WGT Pro AI</h1>
      </header>

      <main className="main-grid">
        {/* Shot Controls */}
        <div className="controls">
          <ShotCalculator shotData={shotData} setShotData={setShotData}/>
          <ClubBag selectedClub={shotData.selectedClub} setSelectedClub={club => setShotData({...shotData, selectedClub: club})}/>
          <PuttCalculator
            distance={shotData.distance}
            greenSlope={shotData.greenSlope}
            windSpeed={shotData.windSpeed}
            windAngle={shotData.windAngle}
            setAimOffset={val => setShotData({...shotData, aimOffset: val})}
            setSpin={val => setShotData({...shotData, spin: val})}
          />
        </div>

        {/* Visualization */}
        <div className="visualization">
          <h2>Trajectory Preview</h2>
          <Trajectory3DVisualizer {...shotData}/>
          <h2>AR Overlay</h2>
          <AROverlay predictions={shotData.predictions}/>
        </div>

        {/* Analytics */}
        <div className="analytics">
          <AnalyticsDashboard/>
        </div>
      </main>

      <footer>
        <p>© 2026 WGT Pro AI Simulator | Elite Shot Analysis</p>
      </footer>
    </div>
  );
}
