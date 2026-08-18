import { useState } from 'react';
import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-native';
import { Text } from 'react-native';
import { Button, Dialog } from '@shukhratisakdjanov-cyber/faster-mobile';
import { fn } from 'storybook/test';

import { StoryIntroduction, StoryScreen, StoryStack, ThemeMatrix as ThemeMatrixLayout } from './story-helpers';

const meta = {
  title: 'Components/Dialog',
  component: Dialog,
  args: { title: 'Confirm action', visible: false, onDismiss: fn(), children: <Text>Confirm this action to continue.</Text> },
  argTypes: {
    visible: { control: 'boolean' }, dismissible: { control: 'boolean' },
    animationType: { control: 'select', options: ['none', 'fade', 'slide'] },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;
type DialogExampleProps = Pick<ComponentProps<typeof Dialog>, 'dismissible' | 'title' | 'children'>;

function DialogExample({ dismissible = true, title = 'Confirm action', children = <Text>Confirm this action to continue.</Text> }: DialogExampleProps) {
  const [visible, setVisible] = useState(false);
  return <><Button onPress={() => setVisible(true)}>Open {title}</Button><Dialog visible={visible} title={title} dismissible={dismissible} onDismiss={() => setVisible(false)} secondaryAction={{ label: 'Cancel', onPress: () => setVisible(false) }} primaryAction={{ label: 'Confirm', onPress: () => setVisible(false) }}>{children}</Dialog></>;
}

export const Introduction: Story = { render: () => <StoryIntroduction title="Dialog">Dialog is controlled by its visible prop. It supports primary and secondary actions, optional backdrop dismissal, and React Native Modal’s Android hardware-back callback through onDismiss. Its one semantic elevation token resolves to an iOS shadow or Android elevation automatically.</StoryIntroduction> };
export const WithActions: Story = { render: () => <StoryScreen><DialogExample /></StoryScreen> };
export const NonDismissible: Story = { render: () => <StoryScreen><DialogExample dismissible={false} title="Required confirmation" /></StoryScreen> };
export const LongContent: Story = { render: () => <StoryScreen><DialogExample title="Review account changes"><Text>Your access changes will apply to all workspace members. Review the selected permissions before confirming this operation.</Text></DialogExample></StoryScreen> };
export const ThemeMatrix: Story = { render: () => <ThemeMatrixLayout><StoryStack><DialogExample /><DialogExample dismissible={false} title="Required confirmation" /><DialogExample title="Review account changes"><Text>Your access changes will apply to all workspace members. Review the selected permissions before confirming this operation.</Text></DialogExample></StoryStack></ThemeMatrixLayout> };
export const Playground: Story = { args: { title: 'Confirm action', dismissible: true, animationType: 'fade' }, render: (args) => <StoryScreen><DialogExample title={args.title} dismissible={args.dismissible}>{args.children}</DialogExample></StoryScreen> };
