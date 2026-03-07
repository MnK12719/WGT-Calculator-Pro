import React from "react";
import clubs from "../../data/clubs.json";

export default function ClubBag({ selectedClub, setSelectedClub }) {
  return (
    <div className="card">
      <h2>Club Bag</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {clubs.map(club => (
          <button
            key={club.name}
            onClick={() => setSelectedClub(club.name)}
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: selectedClub === club.name ? "2px solid #ffcc00" : "1px solid #ccc",
              background: selectedClub === club.name ? "#004d33" : "#fff",
              color: selectedClub === club.name ? "#fff" : "#000",
              cursor: "pointer",
              minWidth: "100px"
            }}
          >
            <strong>{club.name}</strong>
            <br />
            {club.maxDistance} yd
            <br />
            Acc: {(club.accuracy * 100).toFixed(0)}%
          </button>
        ))}
      </div>
    </div>
  );
}
