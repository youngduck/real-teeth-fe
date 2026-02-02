// 즐겨찾기 타입 정의

export interface IFavoriteLocation {
  id: string; // 고유 ID
  address: string; // 실제 주소 (예: "서울특별시")
  alias: string; // 별칭 (사용자가 지정한 이름)
  createdAt: number; // 생성 시간 (timestamp)
}
