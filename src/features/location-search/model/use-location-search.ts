import { useMemo, useState } from "react";

import { koreaDistricts } from "@shared/data";

export const useLocationSearch = () => {
  //SECTION 상태값 영역
  const [searchQuery, setSearchQuery] = useState("");
  //!SECTION 상태값 영역

  //SECTION 메서드 영역
  const filteredLocations = useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }

    const query = searchQuery.trim().toLowerCase();
    return koreaDistricts
      .filter((location) => location.toLowerCase().includes(query))
      .slice(0, 10); // 최대 10개만 표시
  }, [searchQuery]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };
  //!SECTION 메서드 영역

  return {
    searchQuery,
    filteredLocations,
    handleSearchChange,
    clearSearch,
  };
};
