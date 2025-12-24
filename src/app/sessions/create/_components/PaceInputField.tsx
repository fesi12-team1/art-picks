import PaceSlider from '@/components/ui/PaceSlider';

export default function PaceInputField() {
  return (
    <div>
      <label>
        <p className="text-caption-semibold tablet:text-body3-semibold text-gray-50">
          {'페이스 (분/km)'}
        </p>
        <p className="tablet:text-body3-semibold text-caption-regular text-gray-300">
          세션에서 함께 달릴 기준 페이스를 선택해주세요!
        </p>
      </label>
      <PaceSlider value={300} onValueChange={() => {}} />
    </div>
  );
}
