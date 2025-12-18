import { useMemo, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { LevelValue, SessionListFilters, SortValue } from '@/types';

export function useSessionFilters() {
  // UI 상태 관리용 필터들
  const [region, setRegion] = useState<Record<string, string[]> | undefined>();
  const [date, setDate] = useState<DateRange | undefined>();
  const [time, setTime] = useState<[number, number] | undefined>();
  const [level, setLevel] = useState<LevelValue | undefined>();
  const [sort, setSort] = useState<SortValue>();

  // API 쿼리용 필터 묶음
  const queryFilters = useMemo<SessionListFilters>(() => {
    return {
      level,
      city: region ? Object.keys(region) : undefined,
      district: region ? Object.values(region).flat() : undefined,
      dateFrom: date?.from?.toISOString(),
      dateTo: date?.to?.toISOString(),
      timeFrom: time ? String(time[0]) : undefined,
      timeTo: time ? String(time[1]) : undefined,
      sort: sort || 'createdAtDesc',
    };
  }, [region, date, time, level, sort]);

  // UI 용 필터 묶음
  const uiFilters = useMemo(
    () => ({ region, date, time, level, sort }),
    [region, date, time, level, sort]
  );
  console.log('useSessionFilters - queryFilters:', queryFilters);
  console.log('useSessionFilters - uiFilters:', uiFilters);

  return {
    uiFilters,
    queryFilters,
    setRegion,
    setDate,
    setTime,
    setLevel,
    setSort,
  };
}
