/**
 * 작성자: KYD
 * 기능: 장소 검색 입력 컴포넌트
 * 프로세스 설명: korea_districts.json을 활용한 자동완성 검색
 */
import { Input } from "@youngduck/yd-ui";
import { useEffect, useRef, useState } from "react";

import { useLocationSearch } from "../model/use-location-search";

interface ILocationSearchInputProps {
  onLocationSelect: (location: string) => void;
}

export const LocationSearchInput = ({ onLocationSelect }: ILocationSearchInputProps) => {
  //SECTION HOOK호출 영역
  const { searchQuery, filteredLocations, handleSearchChange, clearSearch } = useLocationSearch();
  //!SECTION HOOK호출 영역

  //SECTION 상태값 영역
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const listRef = useRef<HTMLUListElement>(null);
  //!SECTION 상태값 영역

  //SECTION 메서드 영역
  const handleSelectLocation = (location: string) => {
    onLocationSelect(location);
    clearSearch();
    setSelectedIndex(-1);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedIndex >= 0 && filteredLocations[selectedIndex]) {
      handleSelectLocation(filteredLocations[selectedIndex]);
    } else {
      onLocationSelect(searchQuery);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (filteredLocations.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => (prev < filteredLocations.length - 1 ? prev + 1 : prev));
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && filteredLocations[selectedIndex]) {
          handleSelectLocation(filteredLocations[selectedIndex]);
        }
        break;
      case "Escape":
        clearSearch();
        setSelectedIndex(-1);
        break;
      default:
        break;
    }
  };
  //!SECTION 메서드 영역

  // 검색어 변경 시 선택 인덱스 리셋
  useEffect(() => {
    setSelectedIndex(-1);
  }, [searchQuery]);

  // 선택된 항목으로 스크롤
  useEffect(() => {
    if (selectedIndex >= 0 && listRef.current) {
      const selectedElement = listRef.current.children[selectedIndex] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [selectedIndex]);

  return (
    <div className="relative w-full max-w-md">
      <form onSubmit={handleSubmit} className="relative">
        <Input
          type="text"
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSearchChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="장소를 검색하세요 (예: 서울특별시-종로구-청운동)"
          size="full"
          color="primary-100"
        />
      </form>
      {filteredLocations.length > 0 && (
        <div className="absolute z-10 mt-2 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
          <ul ref={listRef} className="max-h-60 overflow-y-auto" role="listbox">
            {filteredLocations.map((location, index) => (
              <li
                key={location}
                onClick={() => handleSelectLocation(location)}
                onMouseEnter={() => setSelectedIndex(index)}
                tabIndex={0}
                role="option"
                aria-selected={selectedIndex === index}
                className={`cursor-pointer px-4 py-2 ${
                  selectedIndex === index ? "bg-blue-100" : "hover:bg-gray-100"
                }`}
              >
                {location}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
