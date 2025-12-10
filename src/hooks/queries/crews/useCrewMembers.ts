import { useQuery } from '@tanstack/react-query';
import { getCrewMembers } from '@/api/crews';
import { QUERY_KEYS } from '@/lib/constants';

/**
 * 크루 멤버 정보 조회
 * @param crewId
 * @param role - (선택) 필터링 할 멤버 역할. 생략 시 전체 멤버 조회
 */
export default function useCrewMembers(
  crewId: number,
  role?: 'leader' | 'staff' | 'member'
) {
  const getQueryKey = () => {
    switch (role) {
      case 'leader':
        return QUERY_KEYS.crews.members.leader(crewId);
      case 'staff':
        return QUERY_KEYS.crews.members.staff(crewId);
      case 'member':
        return QUERY_KEYS.crews.members.general(crewId);
      default:
        return QUERY_KEYS.crews.members.all(crewId);
    }
  };

  return useQuery({
    queryKey: getQueryKey(),
    queryFn: () => getCrewMembers(crewId, { role }),
    enabled: !!crewId, // crewId가 유효할 때만 쿼리가 자동으로 실행
  });
}
