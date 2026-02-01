/**
 * 작성자: KYD
 * 기능: 장소 검색 입력 컴포넌트
 * 프로세스 설명: korea_districts.json을 활용한 자동완성 검색
 */
import { Input } from "@youngduck/yd-ui";

import { useLocationSearch } from "../model/use-location-search";

interface ILocationSearchInputProps {
  onLocationSelect: (location: string) => void;
  selectedLocation?: string;
}

export const LocationSearchInput = ({ onLocationSelect, selectedLocation }: ILocationSearchInputProps) => {
  //SECTION HOOK호출 영역
  const { searchQuery, filteredLocations, handleSearchChange, clearSearch } = useLocationSearch();
  //!SECTION HOOK호출 영역

  //SECTION 상태값 영역

  //!SECTION 상태값 영역

  //SECTION 메서드 영역
  const handleSelectLocation = (location: string) => {
    onLocationSelect(location);
    clearSearch();
  };
  //!SECTION 메서드 영역

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Input
          type="text"
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearchChange(e.target.value)}
          placeholder="장소를 검색하세요 (예: 서울특별시, 종로구, 청운동)"
          size="full"
          color="primary-100"
        />
      </div>

      {filteredLocations.length > 0 && (
        <div className="absolute z-10 mt-2 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
          <ul className="max-h-60 overflow-y-auto">
            {filteredLocations.map((location) => (
              <li
                key={location}
                onClick={() => handleSelectLocation(location)}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
              >
                {location}
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedLocation && (
        <div className="mt-2 text-sm text-gray-600">
          선택된 장소: <span className="font-semibold">{selectedLocation}</span>
        </div>
      )}
    </div>
  );
};
