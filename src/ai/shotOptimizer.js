export function recommendShot([distance, windSpeed, windAngle, slope, spin, clubAccuracy]) {
  const drift = (windSpeed / 10) * Math.sin((windAngle * Math.PI) / 180) * (1 - clubAccuracy);
  const spinEffect = spin * 0.05;
  return { aimOffset: drift.toFixed(1), spin: spinEffect.toFixed(1) };
}
