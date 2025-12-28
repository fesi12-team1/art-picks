import { useQuery } from '@tanstack/react-query';
import { sessionQueries } from '@/api/queries/sessionQueries';
import Badge from '@/components/ui/Badge';
import UserAvatar from '@/components/ui/UserAvatar';

export default function ParticipantsList({ sessionId }: { sessionId: number }) {
  const participantsQuery = useQuery(sessionQueries.participants(sessionId));
  const participants = participantsQuery.data?.participants || [];

  if (participantsQuery.isLoading) return <h1>Loading...</h1>;

  return participantsQuery.isError ? (
    <div className="h-10">
      {participantsQuery.error?.message === 'UNAUTHORIZED'
        ? '참가자 목록을 보려면 로그인이 필요합니다.'
        : '참가자 목록을 불러올 수 없습니다.'}
    </div>
  ) : (
    <ul className="tablet:gap-5 mb-3 flex flex-col gap-2">
      {participants.slice(0, 4).map((participant) => (
        <li key={participant.userId} className="flex items-center gap-3">
          <UserAvatar
            src={participant.profileImage}
            className="size-12 shrink-0"
          />
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5">
              <span className="text-body3-semibold tablet:text-body2-semibold">
                {participant.name}
              </span>
              <Badge size="sm" variant="dday">
                {participant.role}
              </Badge>
            </div>
            <p className="text-caption-regular tablet:text-body3-regular line-clamp-1 text-gray-200">
              {participant.introduction}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
