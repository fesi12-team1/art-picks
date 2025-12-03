import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Textarea } from './Textarea';

/**
 * 버튼은 사용자가 클릭하여 작업을 수행하거나 다른 페이지로 이동할 수 있는 클릭 가능한 요소입니다.
 */

const meta: Meta<typeof Textarea> = {
  title: 'UI/Textarea',
  component: Textarea,
  parameters: {},
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Textarea placeholder="소개글을 작성해주세요." />,
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Textarea placeholder="Normal" />
      <Textarea placeholder="Focused" autoFocus />
      <Textarea disabled placeholder="Disabled" />
      <Textarea aria-invalid placeholder="Invalid" />
    </div>
  ),
};
