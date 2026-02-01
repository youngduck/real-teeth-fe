// OpenWeatherMap API 호출 함수

import type { ICurrentWeather, IForecast } from "@shared/types/weather";

const API_BASE_URL = "https://api.openweathermap.org/data/2.5";
const GEO_API_URL = "https://api.openweathermap.org/geo/1.0";

const getApiKey = (): string => {
  const key = import.meta.env.VITE_OPENWEATHER_API_KEY;
  if (!key) {
    throw new Error("OpenWeatherMap API key is not set");
  }
  return key;
};

// 현재 날씨 조회 (도시명)
export const fetchCurrentWeather = async (city: string): Promise<ICurrentWeather> => {
  const apiKey = getApiKey();
  const response = await fetch(
    `${API_BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=ko`
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "날씨 정보를 가져올 수 없습니다.");
  }

  return response.json();
};

// 현재 날씨 조회 (좌표)
export const fetchWeatherByCoords = async (lat: number, lon: number): Promise<ICurrentWeather> => {
  const apiKey = getApiKey();
  const response = await fetch(
    `${API_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=ko`
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "날씨 정보를 가져올 수 없습니다.");
  }

  return response.json();
};

// 시간대별 기온 예보 (5일/3시간)
export const fetchForecast = async (city: string): Promise<IForecast> => {
  const apiKey = getApiKey();
  const response = await fetch(
    `${API_BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric&lang=ko`
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "예보 정보를 가져올 수 없습니다.");
  }

  return response.json();
};

// 위치 검색 (Geocoding)
export interface ILocationSearchResult {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export const searchLocation = async (query: string): Promise<ILocationSearchResult[]> => {
  const apiKey = getApiKey();
  const response = await fetch(
    `${GEO_API_URL}/direct?q=${encodeURIComponent(query)}&limit=5&appid=${apiKey}`
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "위치 검색에 실패했습니다.");
  }

  return response.json();
};
