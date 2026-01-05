---
marp: true
theme: default
paginate: true
backgroundColor: #ffffff
header: 'RunFit - 러닝 매칭 서비스'
---

<style>
section {
  font-family: 'Pretendard'
}

h1 {
  color: #634CFF;
  border-bottom: 3px solid #2563eb;
  padding-bottom: 10px;
}
h2 {
  color: #1e40af;
}
strong {
  color: #dc2626;
}
</style>

<!-- _paginate: false -->
<!-- _header: '' -->
<!-- _footer: '' -->

# RunFit 🏃‍♂️

### 내 러닝 조건에 꼭 맞는 모임을 한 번에 찾는 러닝 매칭 서비스

---

# 목차

API,
Mutation Hook
Modal
useSuspenseQuery, suspense, errorboundary
form validation with RHF
infinite scroll
responsive design

회고

- 협업하면서 다른 직군과 소통 중 좋았던 점: 디코로 얘기했을 때 대응된 점. 피그마 코멘트.
- 컨벤션 사전에 잡은 건 좋았다: 코드 리뷰 시 중요한 부분에만 집중할 수 있었다. 맥락 이해하기 쉬웠다. 필수 정보를 담은 양식을 담아서, 이해가 빠르게 되었음. 시간 줄일 수 있었음. 커뮤니케이션 비용 감소
- 커뮤니케이션 어려움: 다른 사람이 이해할 수 있는, 다른 사람을 설득할 수 있는 말로 표현하는 게 어려움.
- 내가 부족한 점을 알게 됨:
  준영: 웹 브라우저 이상 단계에 대한 기초가 지식이 부족하다.
  서영: 브라우저보다 낮은 추상화 단계의 지식이 부족하다고 느낌.

1. 프로젝트 개요 간단하게
2. 팀 구성
3. 프로젝트 구성
4. 시연
5. 고민한 점, 트러블 슈팅
6. 회고
7. QnA

---

<!-- _class: lead -->

# 1. 프로젝트 개요

---

## 프로젝트 소개

**RunFit**은 함께 달릴 사람을 쉽고 빠르게 찾을 수 있는 러닝 모임 플랫폼입니다.

---

## 주요 기능

| 기능              | 설명                                                        |
| ----------------- | ----------------------------------------------------------- |
| 🔍 **세션 탐색**  | 지역·날짜·페이스 기반 필터링, 단발성 러닝 모임 생성 및 참여 |
| 👥 **크루 운영**  | 지속형 러닝 그룹 관리                                       |
| ✍️ **리뷰**       | 세션 참여 후 리뷰 작성 및 평가                              |
| 💙 **찜하기**     | 관심있는 세션 북마크                                        |
| 📊 **마이페이지** | 내 세션·리뷰·크루 관리                                      |

---

<!-- _class: lead -->

# 2. 팀 구성

---

- 석준:
- 서영:
- 진우:
- 준영:

---

<!-- _class: lead -->

# 3. 프로젝트 구성

---

## 기술 스택

| Category       | Technology                                             |
| -------------- | ------------------------------------------------------ |
| **프레임워크** | Next.js 16 (App Router, React 19)                      |
| **스타일링**   | Tailwind CSS, Shadcn UI, Radix UI                      |
| **상태 관리**  | Tanstack Query                                         |
| **기타**       | React Hook Form, zod, Suspensive, sonner               |
| **UI System**  | Storybook                                              |
| **Testing**    | Jest, React Testing Library, Playwright, MSW, Faker-js |
| **CI/CD**      | GitHub Actions                                         |
| **Hosting**    | Vercel                                                 |

---

## 아키텍처 설계

- **Next.js App Router** 기반 클라이언트 중심 구조
- **Tanstack Query** - 서버 상태 관리
- **JWT 기반 인증** + 역할별 UI 제어 (RBAC)

---

<!-- _class: lead -->

# 4. 수행 결과

---

## 구현 완료 기능

### ✅ 핵심 기능

- [x] 회원가입 및 로그인
- [x] 세션 목록 조회, 세션 상세 정보 및 참가 신청
- [x] 크루 목록 조회, 크루 생성 및 관리
- [x] 리뷰 작성 및 조회
- [x] 찜하기
- [x] 마이페이지 (내 세션/크루/리뷰)

### ✅ 부가 기능

- [x] 반응형 디자인 (모바일/태블릿/데스크톱)
- [x] 무한 스크롤 구현

---

## 시연 영상

**주요 시연 항목**

1. 회원가입 및 로그인 플로우
2. 세션 검색 및 필터링
3. 세션 상세 페이지 및 참가 신청
4. 크루 생성 및 관리
5. 리뷰 시스템
6. 마이페이지 기능

---

<!-- _class: lead -->

# 5. 고민한 점, 트러블 슈팅

---

## SignIn Modal 개선기

프로젝트에서 사용자 인증이 필요한 동작(찜하기, 리뷰 보기 등) 시
로그인이 되지 않았을 경우 로그인을 유도하는 모달을 보여줍니다.

---

### 🤔 기존 방식의 문제점

```tsx
// 모달의 동작을 관리하는 곳
const { open, close, ... } = useSigninModal();
signInModal.open();

// UI를 리턴하는 곳
return <SigninModal open={open} ... />
```

- 📌 코드의 **흐름을 따라가기 어려움**
  - 훅과 UI가 분리되어 있어 동작 흐름 파악 어려움
- 📌 **코드 응집도 낮음**
  - `useLikeButton` 훅에 모달 로직, `LikeButton` 컴포넌트에 UI 리턴
  - 하나의 기능이 여러 곳에 분산됨

---

## ✨ 개선안

### sonner toast 사용 예시

```tsx
import { toast } from 'sonner';

// Provider 설정 (Root layout)
<Toaster />;

// 어디서든 호출
toast.success('성공했어요!');
```

### 사용 방식 (함수 호출만으로 해결)

```tsx
// 어디서든 이렇게만 호출
signInModal.open();
signInModal.close();
```

---

## 구현 코드

```tsx
// 스토어 생성
// src/store/signinModal.ts
type Listener = (isOpen: boolean) => void;
let isOpen = false;
const listeners = new Set<Listener>();

export const signInModal = {
  // 상태 구독 (Provider에서 사용)
  subscribe: (listener: Listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  open: () => {
    isOpen = true;
    listeners.forEach((l) => l(isOpen));
  },
  close: () => {
    isOpen = false;
    listeners.forEach((l) => l(isOpen));
  },
  getState: () => isOpen,
};
```

---

## Provider에서 구독

```tsx
// src/provider/SigninModalProvider.tsx
export default function SigninModalProvider() {
  const isOpen = useSyncExternalStore(
    signInModal.subscribe, // 구독 함수
    signInModal.getState, // 스냅샷 가져오기
    () => false // SSR 기본값
  );

  return (
    <Modal open={isOpen} onOpenChange={(open) => !open && signInModal.close()}>
      {/* Modal Content */}
    </Modal>
  );
}
```

---

<!-- _class: lead -->

## Suspense + ErrorBoundary 사용

---

### 🤔 기존 방식의 문제점

**로딩, 에러 처리가 컴포넌트에 섞여 있음**

```tsx
export default function SessionDetail({ sessionId }: SessionDetailProps) {
  // 로딩, 에러 상태 관리
  const {
    data: session,
    isLoading,
    error,
  } = useQuery(sessionQueries.detail(sessionId));

  if (isLoading) return <Spinner />;
  if (error) return <ErrorFallback error={error} />;

  // 로직과 UI를 모두 처리
  return <div>{/* 세션 상세 정보 렌더링 */}</div>;
}
```

---

## 문제점

- 📌 **컴포넌트의 책임이 명확하지 않음**
  - 데이터 페칭 + 로딩 UI + 에러 UI 모두 처리
- 📌 **조건부 렌더링으로 인한 복잡성**

---

## Suspense + ErrorBoundary

### ✨ 개선된 방식

```tsx
// Container: 로딩, 에러 처리만 담당
export default function SessionDetailContainer({ sessionId }: Props) {
  return (
    <ErrorBoundary fallback={({ error }) => <ErrorFallback error={error} />}>
      <Suspense fallback={<Spinner />} clientOnly>
        <SessionDetail sessionId={sessionId} /> {/* 데이터만 처리 */}
      </Suspense>
    </ErrorBoundary>
  );
}
```

---

```tsx
// 데이터 로직과 UI만 담당
export default function SessionDetail({ sessionId }: Props) {
  const session = useSuspenseQuery(sessionQueries.detail(sessionId)).data;

  return <div>{/* 세션 상세 정보 렌더링 */}</div>;
}
```

---

## 개선의 이점

| 항목               | 기존 방식    | 개선 방식         |
| ------------------ | ------------ | ----------------- |
| **로딩 상태 관리** | 컴포넌트에서 | Suspense에서      |
| **에러 처리**      | 컴포넌트에서 | ErrorBoundary에서 |
| **컴포넌트 책임**  | 다중 책임    | 단일 책임         |
| **코드 가독성**    | 복잡함       | 명확함            |
| **조건부 렌더링**  | 많음         | 거의 없음         |

---

<!-- _class: lead -->

# Q&A

---

<!-- _class: lead -->
<!-- _paginate: false -->

# 감사합니다! 🎉
