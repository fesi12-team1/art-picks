import Avatar from '../ui/Avatar';

interface ProfileListProps {
  participants: Array<{
    userId: string;
    name: string;
    image?: string;
    role: string;
    joinedAt: string;
  }>;
}

export default function ProfileList({ participants }: ProfileListProps) {
  const images = [
    'https://github.com/shadcn.png',
    'https://github.com/maxleiter.png',
    'https://github.com/evilrabbit.png',
  ];

  return (
    <div className="tablet:*:size-6 flex -space-x-1 *:size-4 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-gray-900">
      {/* TODO: 이후에는 images 대신 prop으로 내려온 값 사용 */}
      {/* {participants.map((participant) => (
        <Avatar key={participant.userId} title={participant.name}>
          <Avatar.Image src={participant.image} alt={participant.name} />
          <Avatar.Fallback>{participant.name.slice(0, 2)}</Avatar.Fallback>
        </Avatar>
      ))} */}
      {images.map((image, i) => (
        <Avatar key={i}>
          <Avatar.Image src={image} alt="@shadcn" />
          <Avatar.Fallback>CN</Avatar.Fallback>
        </Avatar>
      ))}
    </div>
  );
}
