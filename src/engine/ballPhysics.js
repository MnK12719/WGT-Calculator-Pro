export function calculateFlight(distance, launchAngle, clubSpeed, windSpeed=0, windAngle=0, spin=0) {
  const g = 32.174; // ft/s² gravity
  const drag = 0.02; // simple air resistance
  const radians = (launchAngle * Math.PI) / 180;

  // Initial velocity
  let vx = clubSpeed * Math.cos(radians);
  let vy = clubSpeed * Math.sin(radians);
  
  // Convert wind into x/y
  const windRad = (windAngle * Math.PI) / 180;
  const wx = windSpeed * Math.cos(windRad);
  const wy = windSpeed * Math.sin(windRad);

  // Flight simulation step
  const dt = 0.1; // time step in seconds
  let x=0, y=0, z=0;
  let positions = [];

  while (y >= 0) {
    vx -= vx * drag * dt;
    vy -= g * dt;
    x += vx*dt + wx*dt;
    y += vy*dt + wy*dt;
    z = y; // vertical position
    positions.push({x, y: Math.max(0, y), z});
    if (y <= 0) break; // ball hit ground
  }

  return positions;
}
