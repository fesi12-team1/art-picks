import { useFormContext } from 'react-hook-form';
import Input from '@/components/ui/Input';
import { SessionCreateFormValues } from '../_others/schema';

export default function MaxParticipantsInputField() {
  const { register } = useFormContext<SessionCreateFormValues>();
  return (
    <Input
      label="모집 정원"
      placeholder="최소 2인 이상 입력해주세요"
      {...register('maxParticipantCount', { valueAsNumber: true })}
    />
  );
}
