import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import SessionLevelCard from './SessionLevelCard';

/**
 * 러닝 세션의 난이도(레벨)를 선택하는 카드 컴포넌트
 *
 */

const meta: Meta<typeof SessionLevelCard> = {
  title: 'session/SessionLevelCard',
  component: SessionLevelCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'inline-radio',
      options: ['sm', 'md'],
      description: '카드의 크기 (padding 및 높이 정의)',
    },
    label: {
      control: 'text',
      description: '카드의 제목',
    },
    description: {
      control: 'text',
      description: '카드의 설명 텍스트',
    },
    checked: {
      control: 'boolean',
      description: '선택 여부',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
    onClick: {
      action: 'clicked',
      description: '카드 클릭 이벤트 핸들러',
    },
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
 * 기본 형태의 SessionLevelCard 스토리
 */
export const Default: Story = {};

/**
 * 체크된 상태의 SessionLevelCard 스토리
 */
export const Checked: Story = {
  args: {
    checked: true,
  },
};

/**
 * 비활성 상태의 SessionLevelCard 스토리
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

/**
 * sm / md 두 가지 사이즈를 비교하는 스토리
 */
export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <SessionLevelCard {...args} size="sm" label="초급 러너 (sm)" />
      <SessionLevelCard {...args} size="md" label="기본 러너 (md)" />
    </div>
  ),
  args: {
    checked: false,
  },
};

/**
 * 여러 개의 레벨 카드를 나열한 시나리오 스토리
 */
export const LevelList: Story = {
  render: (args) => (
    <div className="flex w-[327px] flex-col gap-4">
      <SessionLevelCard
        {...args}
        label="초급 러너"
        description="5~6분 페이스, 러닝 입문자를 위한 레벨"
      />
      <SessionLevelCard
        {...args}
        label="중급 러너"
        description="5분 이내 페이스 유지 가능한 러너"
      />
      <SessionLevelCard
        {...args}
        label="고급 러너"
        description="4~5분 페이스를 지속할 수 있는 러너"
      />
    </div>
  ),
};
