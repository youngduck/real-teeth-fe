/**
 * 작성자: KYD
 * 기능: 날씨 정보 로딩 스켈레톤 컴포넌트
 * 프로세스 설명: ReactQueryBoundary의 Suspense fallback으로 사용
 */

import { Card } from "@youngduck/yd-ui"

export const WeatherSkeleton = () => {
  return (
    <section className="flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 text-white">
      <h1 className="mb-6 text-2xl font-bold sm:text-3xl lg:text-4xl">Loading...</h1>
      <Card className="w-full max-w-md sm:max-w-lg lg:max-w-xl">
        <div className="mb-4 h-8 w-48 rounded bg-gray-300"></div>
        <div className="mb-2 h-6 w-32 rounded bg-gray-200"></div>
        <div className="h-6 w-40 rounded bg-gray-200"></div>
      </Card>
    </section>
  );
};
