import { useFormContext } from 'react-hook-form';
import SessionLevelCard from '@/components/session/SessionLevelCard';
import { SessionCreateFormValues } from '../_others/schema';

export default function LevelInputField() {
  const { watch, setValue } = useFormContext<SessionCreateFormValues>();
  const value = watch('level');

  return (
    <div>
      <label className="mb-4 block">
        <p className="text-caption-semibold tablet:text-body3-semibold text-gray-50">
          난이도
        </p>
        <p className="tablet:text-body3-semibold text-caption-regular text-gray-300">
          페이스와 별개로, 이 세션의 체감 난이도를 선택해주세요
        </p>
      </label>
      <div className="flex flex-col gap-3">
        <SessionLevelCard
          level="BEGINNER"
          checked={value === 'BEGINNER'}
          onClick={() => {
            setValue?.('level', 'BEGINNER');
          }}
        />
        <SessionLevelCard
          level="INTERMEDIATE"
          checked={value === 'INTERMEDIATE'}
          onClick={() => {
            setValue?.('level', 'INTERMEDIATE');
          }}
        />
        <SessionLevelCard
          level="ADVANCED"
          checked={value === 'ADVANCED'}
          onClick={() => {
            setValue?.('level', 'ADVANCED');
          }}
        />
      </div>
    </div>
  );
}
