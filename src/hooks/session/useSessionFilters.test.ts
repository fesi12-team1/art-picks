import { act, renderHook } from '@testing-library/react';
import { pushMock, useSearchParamsMock } from '@/mocks/nextNavigation';
import { SessionFilterState } from '@/types';
import { useSessionFilters } from './useSessionFilters';

describe('useSessionFilters', () => {
  beforeEach(() => {
    useSearchParamsMock.mockReturnValue(new URLSearchParams());
  });

  test('URL search params를 filters/queryFilters로 변환한다', () => {
    useSearchParamsMock.mockReturnValue(
      new URLSearchParams(
        'city=%EC%84%9C%EC%9A%B8&district=%EA%B0%95%EB%82%A8%EA%B5%AC&level=BEGINNER&sort=sessionAtAsc&dateFrom=2026-02-20&dateTo=2026-02-21&timeFrom=60&timeTo=1440'
      )
    );

    const { result } = renderHook(() => useSessionFilters());

    expect(result.current.queryFilters).toEqual({
      city: ['서울'],
      district: ['강남구'],
      dateFrom: '2026-02-20',
      dateTo: '2026-02-21',
      level: 'BEGINNER',
      sort: 'sessionAtAsc',
      timeFrom: '01:00',
      timeTo: '23:59',
    });
    expect(result.current.activeFilterCount).toBe(4);
  });

  test('applyFilters 호출 시 필터를 URL 쿼리로 push한다', () => {
    const { result } = renderHook(() => useSessionFilters());

    const nextFilters: SessionFilterState = {
      sort: 'registerByAsc',
      level: 'ADVANCED',
      region: { 서울: ['강남구', '서초구'] },
      date: {
        from: new Date('2026-03-01T00:00:00.000Z'),
        to: new Date('2026-03-02T00:00:00.000Z'),
      },
      time: [300, 540],
    };

    act(() => {
      result.current.applyFilters(nextFilters);
    });

    expect(pushMock).toHaveBeenCalledTimes(1);

    const pushedUrl = pushMock.mock.calls[0][0] as string;
    expect(pushedUrl.startsWith('/sessions?')).toBe(true);
    expect(pushedUrl).toContain('level=ADVANCED');
    expect(pushedUrl).toContain('sort=registerByAsc');
    expect(pushedUrl).toContain('city=%EC%84%9C%EC%9A%B8');
    expect(pushedUrl).toContain('district=%EA%B0%95%EB%82%A8%EA%B5%AC');
    expect(pushedUrl).toContain('district=%EC%84%9C%EC%B4%88%EA%B5%AC');
    expect(pushedUrl).toContain('dateFrom=2026-03-01');
    expect(pushedUrl).toContain('dateTo=2026-03-02');
    expect(pushedUrl).toContain('timeFrom=300');
    expect(pushedUrl).toContain('timeTo=540');
  });
});
