export const LEVEL_OPTIONS = [
  { label: '초급', value: 'BEGINNER' },
  { label: '중급', value: 'INTERMEDIATE' },
  { label: '고급', value: 'ADVANCED' },
] as const;

export const SORT_OPTIONS = [
  { label: '최신 생성순', value: 'createdAtDesc' },
  { label: '모임 시작일순', value: 'sessionAtAsc' },
  { label: '마감 임박순', value: 'registerByAsc' },
] as const;

export type LevelValue = (typeof LEVEL_OPTIONS)[number]['value'];
export type SortValue = (typeof SORT_OPTIONS)[number]['value'];
