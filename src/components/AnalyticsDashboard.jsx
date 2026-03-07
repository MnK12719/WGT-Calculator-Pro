import React from "react";
import { getShots } from "../analytics/shotHistory.js";

export default function AnalyticsDashboard() {
  const shots = getShots();
  return (
    <div className="card">
      <h2>Shot Analytics</h2>
      <ul>{shots.map((s,i)=><li key={i}>{s.selectedClub} - {s.distance} yd</li>)}</ul>
    </div>
  );
}
