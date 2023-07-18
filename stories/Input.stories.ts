import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../components';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const InputStory: Story = {
  args: {
    placeholder: "search",
    className: "w-96"
  },
};
