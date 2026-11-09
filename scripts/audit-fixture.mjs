// Deterministic MET-shaped forecast fixture for local audits (Cloud function rejects localhost via CORS).
export function fixture({ night = false } = {}) {
  const start = new Date(); start.setUTCMinutes(0, 0, 0)
  const codes = night ? ['clearsky_night', 'rain', 'heavyrainandthunder', 'cloudy'] : ['clearsky_day', 'partlycloudy_day', 'lightrain', 'heavyrainandthunder']
  const points = Array.from({ length: 48 }, (_, i) => ({
    time: new Date(start.getTime() + i * 3600e3).toISOString(),
    temperatureC: 14 + Math.round(Math.sin(i / 4) * 5), feelsLikeC: 13, humidityPct: 70, dewPointC: 8,
    pressureHpa: 1014, cloudPct: 60, fogPct: 0, uvClearSky: 1, windKmh: 12, gustKmh: 20, windFromDegrees: 220,
    precipitationMm: i % 5 === 0 ? 1.2 : i % 7 === 0 ? 0.3 : 0, precipitationProbabilityPct: null, periodHours: 1,
    symbolCode: codes[Math.floor(i / 3) % codes.length],
  }))
  // Long range like MET: 6 h blocks after the hourly series, aligned to 00/06/12/18 UTC.
  const first6 = Math.ceil((start.getTime() + 48 * 3600e3) / (6 * 3600e3)) * 6 * 3600e3
  for (let k = 0; k < 28; k++) points.push({ ...points[0], time: new Date(first6 + k * 6 * 3600e3).toISOString(), temperatureC: 9 + (k % 4) * 3 + (k % 7),
    precipitationMm: k % 3 === 0 ? 2.4 : 0, periodHours: 6, symbolCode: k % 4 === 2 ? 'rain' : 'partlycloudy_day' })
  return { source: { name: 'MET Norway', url: 'https://api.met.no/', type: 'model_forecast' }, updatedAt: start.toISOString(), points,
    limitations: { observedStationData: false, officialAlerts: false, radar: false, timesAreUtc: true } }
}

