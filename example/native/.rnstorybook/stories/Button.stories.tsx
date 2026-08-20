import type { Meta, StoryObj } from '@storybook/react-native';
import { Button } from '@shukhratisakdjanov-cyber/faster-mobile';
import { fn } from 'storybook/test';

import { StoryGroup, StoryIntroduction, StoryScreen, StoryStack, ThemeMatrix as ThemeMatrixLayout } from './story-helpers';

const meta = {
  title: 'Components/Button',
  component: Button,
  args: { children: 'Continue', onPress: fn() },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'outline', 'ghost', 'link'] },
    tone: { control: 'select', options: ['default', 'danger'] },
    size: { control: 'select', options: ['small', 'medium', 'large'] },
    disabled: { control: 'boolean' }, loading: { control: 'boolean' }, loadingLabel: { control: 'text' }, fullWidth: { control: 'boolean' },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Introduction: Story = { render: () => <StoryIntroduction title="Button">Use Button for a single, intentional action. Native pressed state is derived by Pressable; disabled and loading states prevent duplicate presses and announce their state to assistive technology.</StoryIntroduction> };
export const Variants: Story = { render: () => <StoryScreen><StoryGroup title="Primary"><Button>Continue</Button></StoryGroup><StoryGroup title="Outline"><Button variant="outline">Continue</Button></StoryGroup><StoryGroup title="Ghost"><Button variant="ghost">Continue</Button></StoryGroup><StoryGroup title="Link"><Button variant="link">Continue</Button></StoryGroup><StoryGroup title="Danger"><Button tone="danger" variant="outline">Delete</Button></StoryGroup></StoryScreen> };
export const Sizes: Story = { render: () => <StoryScreen><Button size="small">Small</Button><Button size="medium">Medium</Button><Button size="large">Large</Button></StoryScreen> };
export const States: Story = { render: () => <StoryScreen><Button disabled>Disabled</Button><Button loading loadingLabel="Saving changes">Loading</Button><Button fullWidth>Full-width action</Button></StoryScreen> };
export const ThemeMatrix: Story = { render: () => <ThemeMatrixLayout><StoryStack><Button>Primary</Button><Button variant="outline">Outline</Button><Button variant="ghost">Ghost</Button><Button variant="link">Link</Button><Button tone="danger" variant="outline">Danger</Button><Button size="small">Small</Button><Button size="large">Large</Button><Button disabled>Disabled</Button><Button loading>Loading</Button></StoryStack></ThemeMatrixLayout> };
export const Playground: Story = { args: { children: 'Continue', variant: 'primary', tone: 'default', size: 'medium' }, render: (args) => <StoryScreen><Button {...args} /></StoryScreen> };
