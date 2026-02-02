/**
 * 작성자: KYD
 * 기능: 즐겨찾기 목록 위젯
 * 프로세스 설명: 즐겨찾기된 장소들을 카드 형태로 표시
 */
import ReactQueryBoundary from "@shared/provider/react-query-boundary";
import { useFavoritesStore } from "@shared/store/favorites-store";
import { FavoriteCard } from "./favorite-card";
import { FavoriteCardSkeleton } from "./favorite-card-skeleton";

export const FavoritesList = () => {
  const { favorites } = useFavoritesStore();

  if (favorites.length === 0) {
    return (
      <div className="rounded-lg border border-white/20 bg-white/5 p-6 text-center">
        <p className="text-white">즐겨찾기된 장소가 없습니다.</p>
        <p className="mt-2 text-sm text-gray-400">장소를 검색하여 즐겨찾기에 추가해보세요.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white sm:text-2xl">즐겨찾기</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
        {favorites.map((favorite) => (
          <ReactQueryBoundary
            key={favorite.id}
            skeleton={<FavoriteCardSkeleton />}
            errorFallback={({ error, resetErrorBoundary }) => (
              <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-4">
                <p className="text-sm text-red-400">{error.message}</p>
                <button
                  onClick={resetErrorBoundary}
                  className="mt-2 rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
                >
                  다시 시도
                </button>
              </div>
            )}
          >
            <FavoriteCard favorite={favorite} />
          </ReactQueryBoundary>
        ))}
      </div>
    </div>
  );
};
