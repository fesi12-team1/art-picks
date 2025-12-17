import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ImageUploader from '.';

/**
 * Input 컴포넌트는 단일 라인의 텍스트를 입력하는 필드를 제공합니다.
 * 상태(기본, 비활성화, 에러)와 확장 기능(비밀번호 보기/숨기기, 아이콘)을 지원합니다.
 */
const meta: Meta = {
  title: 'UI/ImageUploader',
  component: ImageUploader,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/** 기본 Input */
export const Default: Story = {
  args: {},
};
