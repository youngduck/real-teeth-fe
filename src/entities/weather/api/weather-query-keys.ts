// Weather Query Keys

export const WEATHER_QUERY_KEYS = {
  CURRENT_WEATHER: (city: string) => ["weather", "current", city] as const,
  CURRENT_WEATHER_BY_COORDS: (lat: number, lon: number) => ["weather", "current", lat, lon] as const,
  FORECAST: (city: string) => ["weather", "forecast", city] as const,
  LOCATION_SEARCH: (query: string) => ["weather", "location-search", query] as const,
} as const;
