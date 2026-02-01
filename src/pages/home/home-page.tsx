/**
 * 작성자: KYD
 * 기능: 홈페이지 - 현재 위치의 날씨 정보 표시
 * 프로세스 설명: ReactQueryBoundary로 감싸서 Suspense와 ErrorBoundary 처리
 */
import ReactQueryBoundary from "@shared/provider/react-query-boundary";
import { WeatherDisplay, WeatherErrorFallback, WeatherSkeleton } from "@widgets/weather-display";

const HomePage = () => {
  return (
    <ReactQueryBoundary skeleton={<WeatherSkeleton />} errorFallback={WeatherErrorFallback}>
      <WeatherDisplay />
    </ReactQueryBoundary>
  );
};

export default HomePage;
