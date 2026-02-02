/**
 * 작성자: KYD
 * 기능: 날씨 상세 페이지
 * 프로세스 설명: 특정 장소의 상세 날씨 정보를 표시
 */
import { useParams, useNavigate } from "react-router-dom";
import ReactQueryBoundary from "@shared/provider/react-query-boundary";
import { WeatherDisplay, WeatherErrorFallback, WeatherSkeleton } from "@widgets/weather-display";

const WeatherDetailPage = () => {
  const { address } = useParams<{ address: string }>();
  const navigate = useNavigate();

  if (!address) {
    navigate("/");
    return null;
  }

  const decodedAddress = decodeURIComponent(address);

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl">
        <button
          onClick={() => navigate("/")}
          className="mb-6 text-white hover:text-gray-300"
        >
          ← 뒤로가기
        </button>
        <ReactQueryBoundary skeleton={<WeatherSkeleton />} errorFallback={WeatherErrorFallback}>
          <WeatherDisplay initialAddress={decodedAddress} />
        </ReactQueryBoundary>
      </div>
    </div>
  );
};

export default WeatherDetailPage;
