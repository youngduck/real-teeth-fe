/**
 * 작성자: KYD
 * 기능: 즐겨찾기 카드 로딩 스켈레톤
 */
import { Card } from "@youngduck/yd-ui";

export const FavoriteCardSkeleton = () => {
  return (
    <Card>
      <div className="animate-pulse">
        <div className="mb-2 h-6 w-32 rounded bg-gray-300"></div>
        <div className="mb-4 h-4 w-24 rounded bg-gray-200"></div>
        <div className="mb-4 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-gray-300"></div>
          <div>
            <div className="mb-2 h-8 w-16 rounded bg-gray-300"></div>
            <div className="h-4 w-20 rounded bg-gray-200"></div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 border-t border-white/20 pt-4">
          <div>
            <div className="mb-1 h-3 w-8 rounded bg-gray-200"></div>
            <div className="h-6 w-12 rounded bg-gray-300"></div>
          </div>
          <div>
            <div className="mb-1 h-3 w-8 rounded bg-gray-200"></div>
            <div className="h-6 w-12 rounded bg-gray-300"></div>
          </div>
        </div>
      </div>
    </Card>
  );
};
