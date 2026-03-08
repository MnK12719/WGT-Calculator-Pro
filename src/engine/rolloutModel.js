export function rolloutModel(landingX, landingY, landingZ, greenSlope=0, friction=0.05) {
  let x = landingX;
  let y = landingY;
  let z = landingZ;
  let positions = [];

  let vx = 20 * Math.cos(greenSlope); // horizontal speed after landing
  let vy = 20 * Math.sin(greenSlope); // slope effect

  const dt = 0.1;

  while (vx > 0.1 || vy > 0.1) {
    vx -= vx * friction * dt;
    vy -= vy * friction * dt;

    x += vx * dt;
    y += vy * dt;
    z = 0; // on green
    positions.push({x, y, z});
  }

  return positions;
}
