import { useSuspenseQuery } from "@tanstack/react-query";

import { fetchWeatherByCoords } from "@shared/api/openweather";
import { WEATHER_QUERY_KEYS } from "./weather-query-keys";

export const useGetCurrentWeatherByCoordsSuspense = (lat: number, lon: number) => {
  const query = useSuspenseQuery({
    queryKey: WEATHER_QUERY_KEYS.CURRENT_WEATHER_BY_COORDS(lat, lon),
    queryFn: async () => {
      return await fetchWeatherByCoords(lat, lon);
    },
  });

  const { data } = query;

  return { data };
};
