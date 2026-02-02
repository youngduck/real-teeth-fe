// 카카오 Geocoding API 호출 함수

const KAKAO_API_URL = "https://dapi.kakao.com/v2/local";

const getKakaoApiKey = (): string => {
  const key = import.meta.env.VITE_KAKAO_REST_API_KEY;
  if (!key) {
    throw new Error("Kakao REST API key is not set");
  }
  return key;
};

// 카카오 주소 검색 결과 타입
export interface IKakaoAddressResult {
  address_name: string;
  y: string; // 위도 (lat)
  x: string; // 경도 (lon)
  address_type: string;
  road_address?: {
    address_name: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
    road_name: string;
    underground_yn: string;
    main_building_no: string;
    sub_building_no: string;
    building_name: string;
    zone_no: string;
  };
  address?: {
    address_name: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
    mountain_yn: string;
    main_address_no: string;
    sub_address_no: string;
  };
}

export interface IKakaoGeocodingResponse {
  documents: IKakaoAddressResult[];
  meta: {
    total_count: number;
    pageable_count: number;
    is_end: boolean;
  };
}

// 주소 검색 (Geocoding) - 여러 결과 반환
export const searchKakaoAddress = async (query: string): Promise<IKakaoGeocodingResponse> => {
  const apiKey = getKakaoApiKey();
  const response = await fetch(
    `${KAKAO_API_URL}/search/address.json?query=${encodeURIComponent(query)}`,
    {
      headers: {
        Authorization: `KakaoAK ${apiKey}`,
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "주소 검색에 실패했습니다.");
  }

  return response.json();
};

// 주소 → 좌표 변환 (단일 결과)
export const getCoordinatesFromAddress = async (
  address: string
): Promise<{ lat: number; lon: number; addressName: string } | null> => {
  const result = await searchKakaoAddress(address);

  if (result.documents.length === 0) {
    return null;
  }

  const firstResult = result.documents[0];
  return {
    lat: parseFloat(firstResult.y),
    lon: parseFloat(firstResult.x),
    addressName: firstResult.address_name,
  };
};

// 키워드로 장소 검색 (예: "서울특별시 종로구")
export interface IKakaoPlaceResult {
  place_name: string;
  address_name: string;
  road_address_name: string;
  x: string; // 경도
  y: string; // 위도
  place_url: string;
  distance: string;
}

export interface IKakaoPlaceSearchResponse {
  documents: IKakaoPlaceResult[];
  meta: {
    total_count: number;
    pageable_count: number;
    is_end: boolean;
  };
}

export const searchKakaoPlace = async (query: string): Promise<IKakaoPlaceSearchResponse> => {
  const apiKey = getKakaoApiKey();
  const response = await fetch(
    `${KAKAO_API_URL}/search/keyword.json?query=${encodeURIComponent(query)}&size=5`,
    {
      headers: {
        Authorization: `KakaoAK ${apiKey}`,
      },
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "장소 검색에 실패했습니다.");
  }

  return response.json();
};
