/**
 * 작성자: KYD
 * 기능: 날씨 정보 에러 폴백 컴포넌트
 * 프로세스 설명: ReactQueryBoundary의 ErrorFallback으로 사용
 */
import { Card } from "@youngduck/yd-ui";

import type { ErrorFallbackProps } from "@shared/provider/react-query-boundary";

export const WeatherErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  return (
    <Card className="mx-auto my-8 max-w-md w-full p-6 text-center">
      <h2 className="mb-4 text-xl font-bold text-red-600">날씨 정보를 불러올 수 없습니다</h2>
      <p className="mb-4 text-gray-600">{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        다시 시도
      </button>
    </Card>
  );
};
