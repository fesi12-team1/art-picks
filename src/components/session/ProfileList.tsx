import UserAvatar from '../ui/UserAvatar';

interface ProfileListProps {
  participants: Array<{
    userId: string;
    name: string;
    image: string | null;
    role: string;
    joinedAt: string;
  }>;
}

export default function ProfileList({ participants }: ProfileListProps) {
  return (
    <div className="tablet:*:size-6 flex -space-x-1 *:size-4 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-gray-900">
      {/* TODO: 이후에는 images 대신 prop으로 내려온 값 사용 */}
      {participants.slice(0.3).map((participant) => (
        <UserAvatar
          key={participant.userId}
          src={participant.image}
          alt={participant.name}
        />
      ))}
    </div>
  );
}
