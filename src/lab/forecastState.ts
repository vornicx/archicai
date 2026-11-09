// Forecast request state. Every payload is stored with the key of the place it was fetched for,
// and only the latest request may write. The view never returns data for a different place.
import type { WeatherPayload } from './weatherClient'

export const placeKey = (lat: number, lon: number) => `${lat.toFixed(3)},${lon.toFixed(3)}`

export type ForecastState = {
  requestKey: string
  requestId: number
  status: 'loading' | 'ready' | 'error'
  data: { key: string; payload: WeatherPayload; receivedAt: number } | null
}

export const initialForecast = (key: string): ForecastState => ({ requestKey: key, requestId: 0, status: 'loading', data: null })

export type ForecastAction =
  | { type: 'start'; key: string; id: number }
  | { type: 'resolve'; key: string; id: number; payload: WeatherPayload; at: number }
  | { type: 'fail'; key: string; id: number }

export function forecastReducer(s: ForecastState, a: ForecastAction): ForecastState {
  if (a.type === 'start') return { ...s, requestKey: a.key, requestId: a.id, status: 'loading' }
  // Late or superseded responses are dropped, whatever order they arrive in.
  if (a.id !== s.requestId || a.key !== s.requestKey) return s
  if (a.type === 'resolve') return { ...s, status: 'ready', data: { key: a.key, payload: a.payload, receivedAt: a.at } }
  return { ...s, status: 'error' }
}

// `currentKey` is the place being rendered right now. On the render right after a place change the
// effect has not yet dispatched `start`, so state still belongs to the old place: show nothing for it.
export function forecastView(s: ForecastState, currentKey: string = s.requestKey) {
  if (s.requestKey !== currentKey) return { data: null, refreshing: false, loadingFresh: true, error: false, loading: true }
  const own = s.data && s.data.key === s.requestKey ? s.data : null
  return {
    // Same-place refresh keeps the previous forecast, flagged; a new place shows nothing until its own data arrives.
    data: s.status === 'error' ? null : own,
    refreshing: s.status === 'loading' && own !== null,
    loadingFresh: s.status === 'loading' && own === null,
    error: s.status === 'error',
    loading: s.status === 'loading',
  }
}
