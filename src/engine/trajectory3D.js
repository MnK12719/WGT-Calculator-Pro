import { calculateFlight } from "./ballPhysics.js";
import { rolloutModel } from "./rolloutModel.js";

export function simulateShot(clubSpeed, launchAngle, distance, windSpeed, windAngle, spin, greenSlope) {
  // Step 1: Ball flight
  const flightPositions = calculateFlight(distance, launchAngle, clubSpeed, windSpeed, windAngle, spin);

  // Step 2: Ball landing coordinates
  const lastPos = flightPositions[flightPositions.length - 1];

  // Step 3: Ball rollout on green
  const rolloutPositions = rolloutModel(lastPos.x, lastPos.y, lastPos.z, greenSlope);

  // Combine flight and roll
  return [...flightPositions, ...rolloutPositions];
}
