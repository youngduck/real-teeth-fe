/**
 * 작성자: KYD
 * 기능: 즐겨찾기 카드 컴포넌트
 * 프로세스 설명: 즐겨찾기된 장소의 날씨 정보를 카드 형태로 표시
 */
import { Card, Input } from "@youngduck/yd-ui";
import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, Check, X } from "lucide-react";

import { useGetForecastByAddressSuspense, useGetWeatherByAddressSuspense } from "@entities/weather";
import { useFavoritesStore } from "@shared/store/favorites-store";

import type { IFavoriteLocation } from "@shared/types/favorites";

interface IFavoriteCardProps {
  favorite: IFavoriteLocation;
}

export const FavoriteCard = ({ favorite }: IFavoriteCardProps) => {
  const navigate = useNavigate();
  const { data: weatherData } = useGetWeatherByAddressSuspense(favorite.address);
  const { data: forecastData } = useGetForecastByAddressSuspense(favorite.address);
  const { removeFavorite, updateFavoriteAlias } = useFavoritesStore();

  const [isEditing, setIsEditing] = useState(false);
  const [editAlias, setEditAlias] = useState(favorite.alias);

  // favorite.alias가 변경되면 editAlias도 업데이트
  useEffect(() => {
    if (!isEditing) {
      setEditAlias(favorite.alias);
    }
  }, [favorite.alias, isEditing]);

  const { weather, addressName } = weatherData;
  const main = weather.main;

  // 오늘 날짜의 forecast 데이터 필터링 및 최저/최고 기온 계산
  const todayForecast = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayItems = forecastData.forecast.list.filter((item) => {
      const itemDate = new Date(item.dt * 1000);
      return itemDate >= today && itemDate < tomorrow;
    });

    if (todayItems.length === 0) return null;

    const temps = todayItems.map((item) => item.main.temp);
    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);

    return {
      minTemp,
      maxTemp,
    };
  }, [forecastData]);

  const handleCardClick = () => {
    navigate(`/weather/${encodeURIComponent(favorite.address)}`);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleSaveAlias = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (editAlias.trim()) {
      updateFavoriteAlias(favorite.id, editAlias.trim());
      setIsEditing(false);
    }
  };

  const handleCancelEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditAlias(favorite.alias);
    setIsEditing(false);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("즐겨찾기를 삭제하시겠습니까?")) {
      removeFavorite(favorite.id);
    }
  };

  return (
    <Card
      className="cursor-pointer transition-transform hover:scale-105"
      onClick={handleCardClick}
    >
      <div className="relative">
        {/* 편집/삭제 버튼 */}
        {!isEditing && (
          <div className="absolute right-0 top-0 flex gap-2">
            <button
              onClick={handleEditClick}
              className="rounded p-1 text-white hover:bg-white/20"
              aria-label="별칭 수정"
            >
              <Pencil size={16} />
            </button>
            <button
              onClick={handleDelete}
              className="rounded p-1 text-white hover:bg-red-500/50"
              aria-label="즐겨찾기 삭제"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )}

        {/* 별칭 표시/수정 */}
        {isEditing ? (
          <div className="mb-4 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            <Input
              type="text"
              value={editAlias}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditAlias(e.target.value)}
              autoFocus
              onClick={(e: React.MouseEvent<HTMLInputElement>) => e.stopPropagation()}
              size="md"
              color="primary-100"
            />
            <button
              onClick={handleSaveAlias}
              className="rounded p-1 text-white hover:bg-green-500/50"
              aria-label="수정 완료"
            >
              <Check size={16} />
            </button>
            <button
              onClick={handleCancelEdit}
              className="rounded p-1 text-white hover:bg-red-500/50"
              aria-label="수정 취소"
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <h3 className="mb-2 text-lg font-bold text-white">{favorite.alias}</h3>
        )}

        <p className="mb-4 text-sm text-gray-300">{addressName}</p>

        {/* 날씨 정보 */}
        <div className="flex items-center gap-4">
          <div>
            <p className="text-2xl font-bold text-white sm:text-3xl">{Math.round(main.temp)}°C</p>
          </div>
        </div>

        {/* 당일 최저/최고 기온 */}
        <div className="mt-4 grid grid-cols-2 gap-4 border-t border-white/20 pt-4">
          <div>
            <p className="mb-1 text-xs text-gray-400">최저</p>
            <p className="text-lg font-semibold text-white">
              {todayForecast ? Math.round(todayForecast.minTemp) : Math.round(main.temp_min)}°C
            </p>
          </div>
          <div>
            <p className="mb-1 text-xs text-gray-400">최고</p>
            <p className="text-lg font-semibold text-white">
              {todayForecast ? Math.round(todayForecast.maxTemp) : Math.round(main.temp_max)}°C
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};
