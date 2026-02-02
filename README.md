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

