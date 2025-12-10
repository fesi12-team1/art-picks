import { useQuery } from '@tanstack/react-query';
import { getCrewMemberCount } from '@/api/crews';
import { QUERY_KEYS } from '@/lib/constants';

// 크루 멤버 수 조회
export default function useCrewMemberCount(crewId: number) {
  return useQuery({
    queryKey: QUERY_KEYS.crews.members.count(crewId),
    queryFn: () => getCrewMemberCount(crewId),
    enabled: !!crewId, // crewId가 유효할 때만 쿼리가 자동으로 실행
  });
}
