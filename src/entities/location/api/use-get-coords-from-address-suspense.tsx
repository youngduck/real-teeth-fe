import { useSuspenseQuery } from "@tanstack/react-query";

import { getCoordinatesFromAddress } from "@shared/api/kakao";
import { LOCATION_QUERY_KEYS } from "./location-query-keys";

export const useGetCoordsFromAddressSuspense = (address: string) => {
  const query = useSuspenseQuery({
    queryKey: LOCATION_QUERY_KEYS.COORDS_FROM_ADDRESS(address),
    queryFn: async () => {
      const coords = await getCoordinatesFromAddress(address);
      if (!coords) {
        throw new Error("해당 주소의 좌표를 찾을 수 없습니다.");
      }
      return coords;
    },
  });

  const { data } = query;

  return { data };
};
