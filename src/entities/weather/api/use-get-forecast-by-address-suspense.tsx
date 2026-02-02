import { useSuspenseQuery } from "@tanstack/react-query";

import { getCoordinatesFromAddress } from "@shared/api/kakao";
import { fetchForecastByCoords } from "@shared/api/openweather";

export const useGetForecastByAddressSuspense = (address: string) => {
  const query = useSuspenseQuery({
    queryKey: ["forecast", "by-address", address],
    queryFn: async () => {
      // 1. 주소 → 좌표 변환
      const coords = await getCoordinatesFromAddress(address);
      if (!coords) {
        throw new Error("해당 주소의 좌표를 찾을 수 없습니다.");
      }

      // 2. 좌표 → 예보 조회
      const forecast = await fetchForecastByCoords(coords.lat, coords.lon);

      return {
        coords,
        forecast,
        addressName: coords.addressName,
      };
    },
  });

  const { data } = query;

  return { data };
};
