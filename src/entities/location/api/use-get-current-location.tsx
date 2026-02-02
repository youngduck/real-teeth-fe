import { useQuery } from "@tanstack/react-query";

import { getAddressFromCoordinates } from "@shared/api/kakao";

import { LOCATION_QUERY_KEYS } from "./location-query-keys";

export interface ICurrentLocation {
  lat: number;
  lon: number;
  addressName: string;
}

export const useGetCurrentLocation = () => {
  return useQuery<ICurrentLocation | null, Error, string>({
    queryKey: LOCATION_QUERY_KEYS.CURRENT,
    queryFn: async () => {
      // 1. 위치 권한 요청 및 좌표 가져오기
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error("Geolocation이 지원되지 않습니다."));
          return;
        }

        navigator.geolocation.getCurrentPosition(
          resolve,
          (error) => {
            // 사용자가 권한을 거부한 경우
            if (error.code === error.PERMISSION_DENIED) {
              reject(new Error("위치 권한이 거부되었습니다."));
            } else if (error.code === error.POSITION_UNAVAILABLE) {
              reject(new Error("위치 정보를 사용할 수 없습니다."));
            } else if (error.code === error.TIMEOUT) {
              reject(new Error("위치 정보 요청 시간이 초과되었습니다."));
            } else {
              reject(new Error("위치 정보를 가져올 수 없습니다."));
            }
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          }
        );
      });

      const { latitude, longitude } = position.coords;

      // 2. 좌표 → 주소 변환
      const address = await getAddressFromCoordinates(latitude, longitude);

      if (!address) {
        throw new Error("주소를 찾을 수 없습니다.");
      }

      return address;
    },
    select: (data) => data?.addressName ?? "서울특별시",
    placeholderData: () => ({ lat: 0, lon: 0, addressName: "서울특별시" }), // 초기값으로 기본 주소 사용
    enabled: false, // 수동으로 실행
    retry: false,
  });
};
