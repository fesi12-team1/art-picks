import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import SessionLevelCard from './SessionLevelCard';

/**
 * 러닝 세션의 난이도(레벨)를 선택하는 카드 컴포넌트
 *
 */

const meta: Meta<typeof SessionLevelCard> = {
  title: 'session/SessionLevelCard',
  component: SessionLevelCard,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    size: 'md',
    label: '초급 러너',
    description: '5~6분 페이스, 러닝 입문자 추천',
    checked: false,
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof SessionLevelCard>;

/**
 * 모든 스토리에서 클릭 가능하도록 하는 공통 Template
 */
function ControlledTemplate(args: {
  size?: 'sm' | 'md';
  label: string;
  description: string;
  checked?: boolean;
  disabled?: boolean;
}) {
  const [checked, setChecked] = useState(args.checked ?? false);

  return (
    <SessionLevelCard
      {...args}
      checked={checked}
      onClick={() => setChecked(!checked)}
    />
  );
}

/**
 * 기본
 */
export const Default: Story = {
  render: (args) => <ControlledTemplate {...args} />,
};

/**
 * 체크된 상태
 */
export const Checked: Story = {
  args: { checked: true },
  render: (args) => <ControlledTemplate {...args} />,
};

/**
 * 비활성 상태
 */
export const Disabled: Story = {
  args: { disabled: true },
  render: (args) => <ControlledTemplate {...args} />,
};

/**
 * 사이즈 비교
 */
export const Sizes: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<string | null>(null);

    return (
      <div className="flex flex-col gap-4">
        <SessionLevelCard
          {...args}
          size="sm"
          checked={selected === 'sm'}
          onClick={() => setSelected(selected === 'sm' ? null : 'sm')}
          label="초급(sm)"
        />
        <SessionLevelCard
          {...args}
          size="md"
          checked={selected === 'md'}
          onClick={() => setSelected(selected === 'md' ? null : 'md')}
          label="중급(md)"
        />
      </div>
    );
  },
};

/**
 * 리스트 예시
 */
export const LevelList: Story = {
  render: (args) => {
    const [selected, setSelected] = useState<string | null>(null);

    return (
      <div className="flex w-[327px] flex-col gap-4">
        <SessionLevelCard
          {...args}
          checked={selected === 'beginner'}
          onClick={() =>
            setSelected(selected === 'beginner' ? null : 'beginner')
          }
          label="초급"
        />
        <SessionLevelCard
          {...args}
          checked={selected === 'intermediate'}
          onClick={() =>
            setSelected(selected === 'intermediate' ? null : 'intermediate')
          }
          label="중급"
        />
        <SessionLevelCard
          {...args}
          checked={selected === 'advanced'}
          onClick={() =>
            setSelected(selected === 'advanced' ? null : 'advanced')
          }
          label="고급"
        />
      </div>
    );
  },
};
