/**
 * 작성자: KYD
 * 기능: 홈페이지 - 현재 위치의 날씨 정보 표시 및 즐겨찾기 관리
 * 프로세스 설명: 앱 첫 진입 시 사용자 현재 위치를 감지하여 날씨 정보 표시, 즐겨찾기 목록 표시
 */
import ReactQueryBoundary from "@shared/provider/react-query-boundary";
import { WeatherDisplay, WeatherErrorFallback, WeatherSkeleton } from "@widgets/weather-display";
import { FavoritesList } from "@widgets/favorites";
import { useGetCurrentLocation } from "@entities/location/api/use-get-current-location";

const HomePage = () => {
  const { data: address } = useGetCurrentLocation();

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 text-2xl font-bold text-white sm:text-3xl lg:text-4xl">날씨 정보</h1>

        {/* 그리드 레이아웃: 모바일은 1열, 데스크탑은 2열 */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-1">
          {/* 즐겨찾기 영역 */}
          <div className="lg:col-span-1">
            <ReactQueryBoundary skeleton={<div>로딩 중...</div>} errorFallback={WeatherErrorFallback}>
              <FavoritesList />
            </ReactQueryBoundary>
          </div>

          {/* 날씨 검색 및 표시 영역 */}
          <div className="lg:col-span-2">
            <ReactQueryBoundary skeleton={<WeatherSkeleton />} errorFallback={WeatherErrorFallback}>
              <WeatherDisplay initialAddress={address || "서울특별시"} />
            </ReactQueryBoundary>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
