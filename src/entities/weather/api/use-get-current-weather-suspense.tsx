import { useSuspenseQuery } from "@tanstack/react-query";

import { fetchCurrentWeather } from "@shared/api/openweather";
import { WEATHER_QUERY_KEYS } from "./weather-query-keys";

export const useGetCurrentWeatherSuspense = (city: string) => {
  const query = useSuspenseQuery({
    queryKey: WEATHER_QUERY_KEYS.CURRENT_WEATHER(city),
    queryFn: async () => {
      return await fetchCurrentWeather(city);
    },
  });

  const { data } = query;

  return { data };
};
