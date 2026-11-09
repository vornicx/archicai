// Public GET endpoint for ARCHIC LAB WEATHER. No DB, no auth, no secrets.
import { createLabWeatherHandler } from '../_shared/labWeather.ts'

Deno.serve(createLabWeatherHandler())
