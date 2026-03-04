# RunFit

내 러닝 조건(지역·날짜·페이스)에 꼭 맞는 모임을 한 번에 찾는 러닝 매칭 서비스

## 프로젝트 개요

**기간**: 2025.11.21 ~ 2026.01.05

RunFit은 함께 달릴 사람을 쉽고 빠르게 찾을 수 있는 러닝 모임 플랫폼입니다. <br/>
지역 기반 필터링, 페이스·난이도 기반 탐색, 신뢰 기반 리뷰 시스템을 통해 <br/>
초보 러너부터 크루 리더까지 모두가 만족할 수 있는 러닝 환경을 제공합니다.

## 기술 스택

| Category      | Tech                                                   |
| ------------- | ------------------------------------------------------ |
| Framework     | Next.js 16 (App Router), React 19                      |
| Language      | TypeScript 5                                           |
| Styling       | Tailwind CSS 4, Shadcn UI (Radix UI)                   |
| State Mgmt    | Tanstack Query 5, Suspensive                           |
| Forms         | React Hook Form, Zod                                   |
| Data Fetching | Fetch API                                              |
| Storage       | AWS S3                                                 |
| UI System     | Storybook                                              |
| Testing       | Jest, React Testing Library, Playwright, MSW, Faker.js |
| CI/CD         | GitHub Actions                                         |
| Hosting       | Vercel                                                 |

## 아키텍처

- Next.js(App Router) 기반의 클라이언트 중심 구조
- Tanstack Query로 서버 상태 관리
- JWT 기반 인증 + 역할별 UI 제어(RBAC)
- App Router 중심의 domain-based 폴더 구조 사용
- 디자인 시스템은 Shadcn + Storybook 기반 UI 컴포넌트 구축

## 테스트 계정

서비스를 직접 사용해볼 수 있는 테스트 계정입니다.

| 이메일             | 비밀번호  |
| ------------------ | --------- |
| test22@example.com | a1234567! |

## 폴더 구조

```text
run-fit
├── src
│   ├── app               # Next.js App Router pages
│   │   ├── api/          # Route Handlers
│   │   ├── crews/        # 크루 목록/상세
│   │   ├── sessions/     # 세션 목록/상세/생성
│   │   ├── my/           # 마이페이지
│   │   ├── signin/       # 로그인
│   │   └── signup/       # 회원가입
│   │
│   ├── api/              # API 레이어 (fetch / queries / mutations)
│   ├── assets/           # 정적 파일
│   ├── components/       # UI 컴포넌트 (Shadcn UI + 커스텀)
│   ├── constants/        # 상수
│   ├── context/          # React Context providers
│   ├── hooks/            # 커스텀 훅
│   ├── lib/              # utils 등
│   ├── mocks/            # MSW handlers
│   ├── provider/         # Providers (ex: QueryProvider)
│   ├── server/           # 서버 전용 유틸리티
│   ├── store/            # 클라이언트 상태 관리
│   ├── styles/           # 전역 스타일
│   └── types/            # 타입 정의
│
├── e2e/                  # Playwright E2E tests
├── .github/              # GitHub workflows
├── .husky/               # Git hooks
├── node_modules/
└── 기타 설정 파일들      # eslint, jest, tsconfig, next.config 등
```

## 주요 기능

- 지역·날짜·페이스 기반 세션 탐색
- 단발성 세션(번개) + 지속형 크루 운영
- 세션 생성·수정·관리
- 리뷰 기반 신뢰도 시스템
- 찜한 세션(북마크)
- 마이페이지(내 세션·리뷰·크루)
- 역할 기반 권한 (크루장 / 운영진 / 일반 멤버)

## 기여도와 역할

|                                                                  팀원                                                                   | 역할                                                                                                                                                                                                                      |
| :-------------------------------------------------------------------------------------------------------------------------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|    <img src="https://avatars.githubusercontent.com/u/52899088?v=4" width="80" height="80"> <br> **[석준](https://github.com/KSJ27)**    | - 테스트 환경 설정 <br> - 지도·주소 보기·설정, 세션 상세 보기, 세션 생성·수정, 세션 찜하기 구현 <br> - Header, Button, UserAvatar, Tabs, Textarea, Modal 공통 컴포넌트 개발                                               |
|  <img src="https://avatars.githubusercontent.com/u/79674766?v=4" width="80" height="80"> <br> **[서영](https://github.com/shionpark)**  | - 세션·크루 목록 구현 (필터링, 무한 스크롤) <br> - Suspensive 적용 (초기 로딩 / 추가 로딩 분리) <br> - React Hook Form + Zod 기반 폼 유효성 검사 도입 <br> - CI/CD 파이프라인, ESLint 규칙, PR 템플릿 기반 협업 환경 구축 |
| <img src="https://avatars.githubusercontent.com/u/127362044?v=4" width="80" height="80"> <br> **[진우](https://github.com/Yun-Jinwoo)** | - Husky 기반 협업 환경 구축 <br> - Tanstack Query 전반 구조 설계 및 초기 세팅 <br> - Proxy 기반 로그인 상태에 따른 페이지 접근 제어 구현 <br> - 마이페이지 기능 구현                                                      |
|  <img src="https://avatars.githubusercontent.com/u/46639511?v=4" width="80" height="80"> <br> **[준영](https://github.com/junyeongh)**  | - Tanstack Query 연동을 고려한 API 및 인증 전반 구조 설계 <br> - 무한 스크롤과 페이지네이션을 활용한 크루 상세 페이지 구현 <br> - Session·Crew·Review Card, Fixed Bottom Bar, Button 공통 컴포넌트 구현                   |

## 결과 및 성과

| 기능                  | 설명                                                                    |
| --------------------- | ----------------------------------------------------------------------- |
| **회원가입 / 로그인** | JWT 기반 인증, 로그인 후 원래 페이지로 복귀                             |
| **세션 탐색**         | 지역·날짜·페이스 기반 필터링, 무한 스크롤                               |
| **세션 관리**         | 세션 상세 조회, 생성·수정, 참가 신청                                    |
| **크루 운영**         | 크루 목록 조회, 생성·수정, 역할 기반 권한 (크루장 / 운영진 / 일반 멤버) |
| **리뷰 시스템**       | 세션 참여 후 리뷰 작성 및 신뢰도 평가                                   |
| **찜하기**            | 관심 세션 북마크                                                        |
| **마이페이지**        | 내 세션·크루·리뷰 통합 관리                                             |
| **반응형 디자인**     | 모바일·태블릿·데스크톱 대응                                             |
