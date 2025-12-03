import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Tabs from './Tabs';

/**
 * 탭은 관련 콘텐츠를 그룹화하고 사용자가 한 번에 하나의 콘텐츠 섹션을 표시할 수 있도록 하는 UI 구성 요소입니다.
 */

const meta: Meta<typeof Tabs> = {
  title: 'UI/Tabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Tabs>tabs</Tabs>
    </div>
  ),
};
