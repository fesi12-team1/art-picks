import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ProgressBar from './ProgressBar';

/**
 * ProgressBar 컴포넌트는 진행 상태를 시각적으로 표시하는 UI 요소입니다.
 *
 */

const meta: Meta<typeof ProgressBar> = {
  title: 'UI/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'number',
      description: '현재 진행 상태를 나타내는 숫자 값입니다.',
      defaultValue: 0,
    },
    max: {
      control: 'number',
      description: '진행 바의 최대 값을 설정합니다.',
      defaultValue: 25,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <ProgressBar value={8} max={16} />,
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <ProgressBar value={1} max={16} />
      <ProgressBar value={4} max={16} />
      <ProgressBar value={16} max={16} />
    </div>
  ),
};
