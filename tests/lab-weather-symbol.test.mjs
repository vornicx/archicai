import { test } from 'node:test'
import assert from 'node:assert/strict'
import { parseSymbol, conditionLabel, skyTone } from '../src/lab/weatherSymbol.ts'

test('clear sky by day and by night keeps the MET day/night suffix', () => {
  assert.deepEqual(parseSymbol('clearsky_day'), { family: 'clear', intensity: 'normal', showers: false, thunder: false, period: 'day' })
  assert.equal(parseSymbol('clearsky_night').period, 'night')
  assert.equal(parseSymbol('fair_polartwilight').period, 'twilight')
  assert.equal(parseSymbol('cloudy').period, null)
})

test('honest ES/EN labels for base sky states', () => {
  assert.equal(conditionLabel(parseSymbol('clearsky_day'), 'es'), 'Despejado')
  assert.equal(conditionLabel(parseSymbol('partlycloudy_night'), 'en'), 'Partly cloudy')
  assert.equal(conditionLabel(parseSymbol('fog'), 'es'), 'Niebla')
})

test('precipitation: intensity, showers and thunder are composed, not invented', () => {
  assert.equal(conditionLabel(parseSymbol('lightrain'), 'es'), 'Lluvia débil')
  assert.equal(conditionLabel(parseSymbol('heavyrain'), 'en'), 'Heavy rain')
  assert.equal(conditionLabel(parseSymbol('rainshowers_day'), 'es'), 'Chubascos de lluvia')
  assert.equal(conditionLabel(parseSymbol('lightsnowshowers_night'), 'en'), 'Light snow showers')
  assert.equal(conditionLabel(parseSymbol('heavysleetandthunder'), 'es'), 'Aguanieve fuerte y tormenta')
  assert.equal(conditionLabel(parseSymbol('rainandthunder'), 'en'), 'Rain and thunder')
})

test("MET's own 'lightssleet…' / 'lightssnow…' spellings are recognised", () => {
  const p = parseSymbol('lightssleetshowersandthunder_day')
  assert.equal(p.family, 'sleet'); assert.equal(p.intensity, 'light'); assert.equal(p.showers, true); assert.equal(p.thunder, true)
  assert.equal(parseSymbol('lightssnowshowersandthunder_night').family, 'snow')
})

test('unknown or missing codes return null instead of guessing', () => {
  assert.equal(parseSymbol(null), null)
  assert.equal(parseSymbol(''), null)
  assert.equal(parseSymbol('tornado_day'), null)
  assert.equal(conditionLabel(null, 'es'), null)
})

test('sky tone follows family and the day/night suffix only', () => {
  assert.equal(skyTone(parseSymbol('clearsky_day')), 'clear')
  assert.equal(skyTone(parseSymbol('fair_night')), 'night')
  assert.equal(skyTone(parseSymbol('cloudy')), 'overcast')
  assert.equal(skyTone(parseSymbol('rain')), 'wet')
  assert.equal(skyTone(parseSymbol('snow')), 'snow')
  assert.equal(skyTone(parseSymbol('rainandthunder')), 'storm')
  assert.equal(skyTone(null), 'neutral')
})
