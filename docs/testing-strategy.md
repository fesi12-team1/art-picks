# RunFit Testing Strategy

## 목적

- 현재 프로젝트의 테스트 공백을 빠르게 줄이고, 회귀(regression)를 예방하는 테스트 체계를 단계적으로 구축한다.
- `pnpm test`/`pnpm e2e`가 배포 안정성 신호로 동작하도록 만든다.

## 현재 상태 요약

- 테스트 도구는 이미 준비되어 있음:
  - 단위/통합: Jest + React Testing Library + MSW (`jest.config.ts`, `jest.setup.ts`)
  - E2E: Playwright (`playwright.config.ts`)
  - UI 시각 회귀: Storybook + Chromatic (`storybook-ci.yml`)
- 실제 테스트는 거의 없음:
  - 컴포넌트 테스트 2개: `PaceSlider`, `TimeSlider`
  - E2E는 예제 placeholder 1개: `e2e/example.spec.ts`

## 권장 테스트 피라미드

- 1순위: 단위/통합 테스트 (Jest) 70%
- 2순위: 컴포넌트 상호작용 테스트 (RTL) 20%
- 3순위: 핵심 사용자 여정 E2E (Playwright) 10%

이 프로젝트는 React Query + App Router + API 프록시 구조라서, E2E만 늘리기보다 **유틸/훅/프록시를 단위·통합으로 먼저 고정**하는 것이 비용 대비 효과가 크다.

## 레이어별 테스트 접근

### 1) Unit 테스트 (빠르고 많이)

대상:

- 순수 유틸 함수
  - `src/lib/time.ts`
  - `src/lib/pagination.ts`
  - `src/lib/utils.ts`의 순수 함수
- 스토어/상태 로직
  - `src/store/signinModal.ts`
- API 공통 에러 처리
  - `src/api/fetch/request.ts`의 응답 파싱/에러 매핑

핵심 검증:

- 경계값: 시간 0/1440, pagination 시작/중간/끝, 빈 응답/비정상 응답
- 에러 계약: 서버 에러가 `ApiError`로 정확히 매핑되는지 (`status`, `code`, `message`)

### 2) Integration 테스트 (비즈니스 안정성 핵심)

대상:

- React Query hooks
  - `src/api/queries/*`
  - `src/api/mutations/*`
- 폼 훅 + Zod 검증
  - `src/hooks/auth/useSigninForm.ts`
  - `src/hooks/auth/useSignupForm.ts`
  - `src/hooks/crew/useCrewForm.ts`
  - `src/hooks/my/useReviewForm.ts`
  - `src/hooks/my/useProfileEditForm.ts`
- URL 필터 훅
  - `src/hooks/session/useSessionFilters.ts`
- 서버 프록시 계층
  - `src/server/api/handleRequest.ts`
  - `src/server/api/refresh.ts`
  - `src/server/api/utils.ts`

핵심 검증:

- Query/Mutation 성공 시 invalidateQueries 호출 키 정확성
- 폼 스키마 검증, submit 성공/실패 토스트 분기
- `useSessionFilters`의 searchParams <-> query 변환 일관성
- `handleRequest`의 인증 분기:
  - refreshToken 없음 + requiresAuth=true -> 401
  - backend 401 -> refresh 시도 -> 재요청 성공
  - JSON/비JSON 응답 처리

방법:

- 네트워크는 MSW로 고정
- 훅은 `src/provider/renderWithProviders.tsx` 기반으로 렌더
- `next/navigation`은 기존 mock (`src/mocks/nextNavigation.ts`) 재사용

### 3) Component 테스트 (행동 중심)

대상:

- 필터/입력 컴포넌트: Slider, DatePicker, RegionFilter, Modal
- 인증/폼 컴포넌트: Signin/Signup form
- 사용자 상호작용이 많은 UI

핵심 검증:

- 렌더 스냅샷보다 사용자 상호작용 중심 (click/type/key)
- 접근성 role/name 기반 쿼리 우선
- 상태 변경/콜백 호출/에러 메시지 노출

참고:

- Storybook은 시각적 회귀(Chromatic)에 강점이 있으므로,
  동작 회귀는 RTL 테스트로 보완한다.

### 4) E2E 테스트 (핵심 플로우만)

대상 시나리오:

- 인증: 회원가입/로그인/로그아웃
- 세션 탐색: 필터 적용 -> 목록 조회 -> 상세 진입
- 세션 액션: 찜/참여/참여취소
- 리뷰 작성 플로우

원칙:

- 모든 페이지를 E2E로 덮지 않는다.
- 사용자 가치가 높은 핵심 여정만 smoke + critical path로 유지한다.

## 우선순위 로드맵

### Phase 1 (즉시, 1~2일)

- `src/lib/time.ts`, `src/lib/pagination.ts`, `src/api/fetch/request.ts` 테스트 추가
- `src/store/signinModal.ts` 테스트 추가
- 목표: 빠른 회귀 방지 기반 확보

### Phase 2 (단기, 3~5일)

- `useSessionFilters`, auth/crew/review/profile 폼 훅 테스트
- `sessionQueries`, 주요 session/auth mutation 훅 테스트
- 목표: 필터/폼/캐시 무효화 로직 안정화

### Phase 3 (중기, 3~5일)

- `src/server/api/handleRequest.ts` 및 refresh 경로 테스트
- route handler (`src/app/api/**/route.ts`) 스모크 테스트
- 목표: 프록시/인증 회귀 차단

### Phase 4 (지속)

- Playwright 핵심 시나리오 4~6개로 교체 (`e2e/example.spec.ts` 제거)
- PR마다 smoke E2E, main에서 full E2E 실행

## 권장 디렉터리 규칙

- 테스트 파일은 구현 파일과 co-locate:
  - `foo.ts` -> `foo.test.ts`
  - `Component.tsx` -> `Component.test.tsx`
- 공통 유틸:
  - `src/test/setup/` (mock server, factories, render helpers)
- fixture/factory 데이터는 MSW mock 데이터와 재사용 가능한 구조로 유지

## 최소 커버리지 정책 (초기안)

초기에는 엄격한 전체 퍼센트보다, 중요한 모듈 보호가 우선이다.

- 필수 커버 대상:
  - `src/lib/time.ts`
  - `src/lib/pagination.ts`
  - `src/api/fetch/request.ts`
  - `src/hooks/session/useSessionFilters.ts`
  - `src/server/api/handleRequest.ts`
- 이후 안정화되면 `branches/functions/lines/statements` 기준을 단계적으로 상향

## CI 적용 제안

현재 CI(`.github/workflows/ci.yml`)는 `pnpm test`를 이미 실행한다. 여기에 아래를 단계적으로 추가:

1. PR:

- `pnpm lint`
- `pnpm test -- --runInBand` (불안정 시 임시)
- 변경 영역 기준 선택적 E2E smoke

2. main:

- `pnpm test`
- `pnpm e2e` full
- Chromatic는 기존대로 UI 변경 시 실행

## 바로 시작할 첫 테스트 후보

- `src/api/fetch/request.test.ts`
  - 정상 응답 `data` 반환
  - 비정상 포맷 에러
  - 에러 응답 -> `ApiError` 매핑
- `src/lib/time.test.ts`
  - `formatMinutesToKoreanTime` 경계값
  - `formatDDay` 분기값
- `src/hooks/session/useSessionFilters.test.ts`
  - query string 파싱
  - `applyFilters` 라우팅 문자열 검증
- `src/server/api/handleRequest.test.ts`
  - 인증 필요/불필요 분기
  - 401 refresh 후 재시도

## 운영 원칙

- flaky 테스트는 즉시 원인 제거 또는 격리
- 네트워크/시간/랜덤 요소는 반드시 고정(mock/fake timer)
- 실패 메시지는 사용자 행위 기준으로 읽히게 작성
