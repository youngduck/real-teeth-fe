/**
 * 작성자: KYD
 * 기능: 홈페이지 - 현재 위치의 날씨 정보 표시
 * 프로세스 설명: 앱 첫 진입 시 사용자 현재 위치를 감지하여 날씨 정보 표시
 */
import ReactQueryBoundary from "@shared/provider/react-query-boundary";
import { WeatherDisplay, WeatherErrorFallback, WeatherSkeleton } from "@widgets/weather-display";
import { useGetCurrentLocation } from "@entities/location/api/use-get-current-location";

const HomePage = () => {
  const { data: address, isFetching } = useGetCurrentLocation();

 

  // 위치 감지 중일 때는 스켈레톤 표시
  if (isFetching && !address) {
    return (
      <ReactQueryBoundary skeleton={<WeatherSkeleton />} errorFallback={WeatherErrorFallback}>
        <WeatherSkeleton />
      </ReactQueryBoundary>
    );
  }

  return (
    <ReactQueryBoundary skeleton={<WeatherSkeleton />} errorFallback={WeatherErrorFallback}>
      <WeatherDisplay initialAddress={address || "서울특별시"} />
    </ReactQueryBoundary>
  );
};

export default HomePage;
