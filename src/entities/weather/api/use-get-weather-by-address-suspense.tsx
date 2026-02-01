import { useSuspenseQuery } from "@tanstack/react-query";

import { getCoordinatesFromAddress } from "@shared/api/kakao";
import { fetchWeatherByCoords } from "@shared/api/openweather";
import { WEATHER_QUERY_KEYS } from "./weather-query-keys";

export const useGetWeatherByAddressSuspense = (address: string) => {
  const query = useSuspenseQuery({
    queryKey: ["weather", "by-address", address],
    queryFn: async () => {
      // 1. 주소 → 좌표 변환
      const coords = await getCoordinatesFromAddress(address);
      if (!coords) {
        throw new Error("해당 주소의 좌표를 찾을 수 없습니다.");
      }

      // 2. 좌표 → 날씨 조회
      const weather = await fetchWeatherByCoords(coords.lat, coords.lon);

      return {
        coords,
        weather,
        addressName: coords.addressName,
      };
    },
  });

  const { data } = query;

  return { data };
};
