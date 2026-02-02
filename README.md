# Real Teeth 채용과제

## 프로젝트 실행 방법

### 설치

```bash
pnpm install
```

### 개발 서버 실행

```bash
# 개발 모드
pnpm dev:dev

# 프로덕션 모드
pnpm dev:prod
```

### 빌드

```bash
# 개발 빌드
pnpm build:dev

# 프로덕션 빌드
pnpm build:prod
```

### 테스트

```bash
# 테스트 실행
pnpm test

# 테스트 감시 모드
pnpm test:watch

# 커버리지
pnpm test:coverage
```

## 구현한 기능에 대한 설명

### Feature/A-1-프로젝트기본세팅
**주요 작업 / 변경사항:**
- **React 19** - UI 라이브러리
- **Vite 7** - 빌드 도구
- **TypeScript** - 타입 안정성
- **Tailwind CSS 4, YD-UI** - 스타일링
- **React Query** - 서버 상태 관리
- **React Router** - 라우팅
- **Vitest** - 테스팅
- **Zustand** - 클라이언트 상태 관리
- **ESLint + Prettier** - 코드 품질 관리
- **Husky** - Git 훅 관리
- **FSD** - 프로젝트 아키텍처
- **스쿼시 머지**- GIT 워크플로우

**사용한 기술 및 이유:**

- 과제요구사항에 부합하면서 과제를 시간안에 처리하기 위해 익숙한 기술을 선택하였습니다.


### Feature/A-2-날씨-Open-API-가져오기
**주요 작업 / 변경사항:**
- **OpenWeatherMap API** - 날씨 정보 조회 (현재 날씨, 예보)
- **카카오 Geocoding API** - 한국 주소 → 위도/경도 변환
- **주소 검색 기능** - korea_districts.json 기반 자동완성 검색
- **날씨 표시 위젯** - React Query + Suspense 패턴 적용
- **FSD 구조 적용** - entities, features, widgets 레이어 분리

**구현 세부사항:**

1. **OpenWeatherMap API 연동**
   - 현재 날씨 조회 (도시명, 좌표 기반)
   - 5일/3시간 예보 조회
   - React Query Suspense hooks 구현
   - 에러 처리 및 로딩 상태 관리

2. **카카오 Geocoding API 연동**
   - 주소 검색 (searchKakaoAddress)
   - 주소 → 좌표 변환 (getCoordinatesFromAddress)
   - 장소 키워드 검색 (searchKakaoPlace)
   - 한국 행정구역(시/군/구/동) 지원

3. **주소 검색 기능**
   - korea_districts.json 데이터 활용
   - 실시간 자동완성 필터링
   - LocationSearchInput 컴포넌트 구현
   - 최대 10개 결과 표시

4. **날씨 표시 위젯**
   - WeatherDisplay: 날씨 정보 카드 UI
   - WeatherSkeleton: 로딩 스켈레톤
   - WeatherErrorFallback: 에러 처리 UI
   - 반응형 디자인 (모바일/데스크탑)

5. **통합 플로우**
   ```
   사용자 검색어 입력
   → korea_districts.json 필터링 (자동완성)
   → 사용자 장소 선택
   → 카카오 Geocoding API (주소 → 좌표)
   → OpenWeatherMap API (좌표 → 날씨)
   → 날씨 정보 표시
   ```

**사용한 기술 및 이유:**
- **OpenWeatherMap API**: 전 세계 날씨 데이터 제공, 무료 플랜으로 충분한 쿼터 제공
- **카카오 Geocoding API**: 한국 주소 검색에 최적화, 한국어 지원 우수, 일일 300,000건 무료 쿼터
- **React Query + Suspense**: bdks-fe 프로젝트 패턴 준수, 서버 상태 관리 및 로딩/에러 처리 자동화
- **FSD 아키텍처**: 
  - `entities/weather`, `entities/location`: 비즈니스 엔티티 및 API 로직
  - `features/location-search`: 장소 검색 기능
  - `widgets/weather-display`: 복합 UI 블록
  - `shared/api`, `shared/data`: 공유 리소스

**환경 변수 설정:**
```env
VITE_OPENWEATHER_API_KEY=your_openweather_api_key
VITE_KAKAO_REST_API_KEY=your_kakao_rest_api_key
```

### Feature/A-3-앱진입시현재위치감지
**주요 작업 / 변경사항:**
- **브라우저 Geolocation API** - 사용자 현재 위치 좌표 획득
- **카카오 역지오코딩 API** - 좌표 → 주소 변환
- **자동 위치 감지** - 앱 첫 진입 시 자동으로 현재 위치 감지
- **React Query select 활용** - 데이터 변환 및 기본값 처리 최적화
- **위치 권한 처리** - 권한 거부 시 기본값(서울특별시) 사용

**구현 세부사항:**

1. **현재 위치 감지 Hook (useGetCurrentLocation)**
   - 브라우저 Geolocation API를 통한 위치 좌표 획득
   - 위치 권한 요청 및 에러 처리
   - 카카오 역지오코딩 API로 좌표 → 주소 변환
   - React Query의 `select`로 주소만 추출
   - `placeholderData`로 기본값 설정

2. **카카오 역지오코딩 API 연동**
   - 좌표 → 주소 변환 (getAddressFromCoordinates)
   - 도로명 주소 우선, 없으면 지번 주소 사용
   - 한국 행정구역 주소 반환

3. **HomePage 통합**
   - 앱 첫 진입 시 자동으로 위치 감지
   - 위치 감지 중 스켈레톤 UI 표시
   - 위치 정보를 받으면 해당 주소로 날씨 표시
   - 위치 권한 거부 또는 실패 시 기본값(서울특별시) 사용

4. **에러 처리**
   - 위치 권한 거부: 기본값 사용
   - 위치 정보 사용 불가: 기본값 사용
   - 타임아웃: 기본값 사용
   - 주소 변환 실패: 기본값 사용

5. **통합 플로우**
   ```
   앱 첫 진입
   → 브라우저 위치 권한 요청
   → 사용자 허용/거부
   → 허용 시: 현재 좌표 획득
   → 카카오 역지오코딩 API (좌표 → 주소)
   → OpenWeatherMap API (주소 → 날씨)
   → 날씨 정보 표시
   → 거부/실패 시: 기본값(서울특별시) 사용
   ```

**사용한 기술 및 이유:**
- **브라우저 Geolocation API**: 표준 웹 API, 추가 라이브러리 불필요, 모든 모던 브라우저 지원
- **카카오 역지오코딩 API**: 한국 주소 변환에 최적화, 정확한 행정구역 주소 제공
- **React Query select**: 데이터 변환을 Hook 내부에서 처리하여 컴포넌트 로직 단순화
- **placeholderData**: 초기 로딩 상태에서도 기본값을 제공하여 UX 개선
- **FSD 아키텍처**:
  - `entities/location/api`: 위치 관련 비즈니스 로직
  - `shared/api/kakao`: 카카오 API 공유 함수
  - `pages/home`: 페이지 레벨 통합

**코드 최적화:**
- `useEffect` 3개 → 1개로 축소 (React Query select 활용)
- `useState` 제거 (React Query의 select로 데이터 변환)
- 컴포넌트 로직 단순화 및 가독성 향상


### Feature/A-4-즐겨찾기와세부정보
**주요 작업 / 변경사항:**
- **즐겨찾기 기능** - 장소 즐겨찾기 추가/삭제 (최대 6개)
- **별칭 관리** - 즐겨찾기된 장소의 별칭 수정 기능
- **즐겨찾기 카드 UI** - 현재 날씨, 당일 최저/최고 기온 표시
- **홈페이지 그리드 레이아웃** - 모바일/데스크탑 반응형 레이아웃
- **상세 페이지** - 즐겨찾기 카드 클릭 시 상세 날씨 정보 페이지 이동
- **Zustand + localStorage** - 즐겨찾기 상태 영속화

**구현 세부사항:**

1. **즐겨찾기 타입 정의**
   - `IFavoriteLocation` 인터페이스 (id, address, alias, createdAt)
   - 별칭(alias) 필드를 통한 사용자 커스터마이징

2. **Zustand Store 구현**
   - 즐겨찾기 추가/삭제 기능
   - 별칭 수정 기능
   - 최대 6개 제한
   - localStorage를 통한 상태 영속화
   - 중복 추가 방지

3. **즐겨찾기 위젯 컴포넌트**
   - `FavoriteCard`: 즐겨찾기 카드 컴포넌트
     - 현재 날씨 정보 표시
     - 당일 최저/최고 기온 표시
     - 별칭 수정 (편집 모드)
     - 삭제 기능
     - 카드 클릭 시 상세 페이지 이동
   - `FavoritesList`: 즐겨찾기 목록 위젯
     - 그리드 레이아웃으로 카드 표시
     - 빈 상태 처리
   - `FavoriteCardSkeleton`: 로딩 스켈레톤

4. **WeatherDisplay 개선**
   - 즐겨찾기 추가/삭제 버튼 (하트 아이콘)
   - 즐겨찾기 상태에 따른 UI 변경
   - 최대 개수 제한 알림

5. **홈페이지 레이아웃 개선**
   - 그리드 레이아웃 적용
   - 모바일: 1열 세로 배치
   - 데스크탑: 즐겨찾기와 날씨 검색 영역 분리

6. **상세 페이지 및 라우팅**
   - `/weather/:address` 라우트 추가
   - 즐겨찾기 카드 클릭 시 상세 페이지 이동
   - 뒤로가기 기능

7. **통합 플로우**
   ```
   장소 검색
   → 날씨 정보 표시
   → 즐겨찾기 추가 (하트 버튼)
   → 즐겨찾기 목록에 카드 표시
   → 별칭 수정 (편집 버튼)
   → 카드 클릭 → 상세 페이지 이동
   → 상세 페이지에서 모든 날씨 정보 확인
   ```

**사용한 기술 및 이유:**
- **Zustand**: 가벼운 상태 관리 라이브러리, localStorage 연동 용이
- **localStorage**: 브라우저 재시작 후에도 즐겨찾기 유지
- **React Router**: 상세 페이지 라우팅
- **FSD 아키텍처**:
  - `shared/types/favorites`: 즐겨찾기 타입 정의
  - `shared/store/favorites-store`: 상태 관리
  - `widgets/favorites`: 즐겨찾기 UI 컴포넌트
  - `pages/weather-detail`: 상세 페이지
  - `pages/home`: 페이지 레벨 통합

**주요 기능:**
- 즐겨찾기 최대 6개 제한
- 별칭을 통한 사용자 커스터마이징
- 즐겨찾기 카드에서 현재 날씨 및 당일 기온 정보 한눈에 확인
- 카드 클릭으로 상세 정보 페이지 이동
- 반응형 그리드 레이아웃으로 모바일/데스크탑 최적화