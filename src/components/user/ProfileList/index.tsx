import UserAvatar from '@/components/ui/UserAvatar';
import { cn } from '@/lib/utils';
import type { CrewMember } from '@/types';

interface ProfileListProps {
  member?: CrewMember[];
}

export default function ProfileList({ member }: ProfileListProps) {
  return (
    <div className={cn('flex -space-x-1')}>
      {member?.map((member: CrewMember) => (
        <UserAvatar
          key={member.userId}
          src={member.profileImage || '/assets/profile-default.png'}
          alt={member.name}
          className="tablet:size-6 size-4 data-[slot=avatar]:ring-2 data-[slot=avatar]:ring-gray-900"
        />
      ))}
    </div>
  );
}
