import { useState } from 'react';
import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { Input } from '@shukhratisakdjanov-cyber/faster-mobile';
import { fn } from 'storybook/test';

import { StoryIntroduction, StoryScreen, StoryStack, ThemeMatrix as ThemeMatrixLayout } from './story-helpers';

const meta = {
  title: 'Components/Input',
  component: Input,
  args: { label: 'Email', onChangeText: fn(), placeholder: 'you@example.com' },
  argTypes: {
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    disabled: { control: 'boolean' }, clearable: { control: 'boolean' },
    errorMessage: { control: 'text' }, helperText: { control: 'text' },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

function ControlledInput({ errorMessage, helperText, ...props }: Omit<ComponentProps<typeof Input>, 'value' | 'onChangeText'>) {
  const [value, setValue] = useState('');
  return <Input {...props} value={value} onChangeText={setValue} errorMessage={errorMessage} helperText={helperText} clearable />;
}

export const Introduction: Story = { render: () => <StoryIntroduction title="Input">Input is a controlled native TextInput wrapper with label, helper, error, disabled, and clearable states. It forwards standard TextInput props, and error text is announced politely.</StoryIntroduction> };
export const Sizes: Story = { render: () => <StoryScreen><ControlledInput label="Small" size="small" /><ControlledInput label="Medium" size="medium" /><ControlledInput label="Large" size="large" /></StoryScreen> };
export const States: Story = { render: () => <StoryScreen><ControlledInput label="Email" helperText="We only use this for account updates." /><Input label="Email" value="not-an-email" onChangeText={fn()} errorMessage="Enter a valid email." /><Input label="Read-only account" value="member@example.com" onChangeText={fn()} disabled /></StoryScreen> };
export const ThemeMatrix: Story = { render: () => <ThemeMatrixLayout><StoryStack><ControlledInput label="Default input" helperText="Supporting text" /><Input label="Invalid email" value="not-an-email" onChangeText={fn()} errorMessage="Enter a valid email." /><Input label="Disabled input" value="member@example.com" onChangeText={fn()} disabled /><ControlledInput label="Small input" size="small" /><ControlledInput label="Large input" size="large" /><Input label="Long label used for account recovery" value="long.account.address@example.test" onChangeText={fn()} errorMessage="This address is not eligible for account recovery." /></StoryStack></ThemeMatrixLayout> };
export const LongContent: Story = { render: () => <StoryScreen><Input label="Work email address used for account recovery" value="very.long.email.address@example-organization.test" onChangeText={fn()} errorMessage="This address is not eligible. Choose an organization account associated with your team." /></StoryScreen> };
export const Playground: Story = { args: { label: 'Email', placeholder: 'you@example.com', helperText: 'Use a work address.', size: 'medium' }, render: (args) => <StoryScreen><ControlledInput {...args} /></StoryScreen> };
