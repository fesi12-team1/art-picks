import SessionLevelCard from '@/components/session/SessionLevelCard';

export default function LevelInputField() {
  return (
    <div>
      <label>
        <span>난이도</span>
        <span>페이스와 별개로, 이 세션의 체감 난이도를 선택해주세요</span>
      </label>
      <div>
        <SessionLevelCard level="BEGINNER" checked={false} onClick={() => {}} />
        <SessionLevelCard
          level="INTERMEDIATE"
          checked={false}
          onClick={() => {}}
        />
        <SessionLevelCard level="ADVANCED" checked={false} onClick={() => {}} />
      </div>{' '}
    </div>
  );
}
