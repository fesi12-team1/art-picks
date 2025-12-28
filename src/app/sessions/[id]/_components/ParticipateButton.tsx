import { useRegisterSession } from '@/api/mutations/sessionMutations';
import Button from '@/components/ui/Button';

interface ParticipateButtonProps {
  className?: string;
  sessionId: number;
}

export default function ParticipateButton({
  className,
  sessionId,
}: ParticipateButtonProps) {
  const mutation = useRegisterSession(sessionId);

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <Button variant="default" className={className} onClick={handleClick}>
      참여하기
    </Button>
  );
}
