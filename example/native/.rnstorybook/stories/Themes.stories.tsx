import type { Meta, StoryObj } from '@storybook/react-native';
import { Text } from 'react-native';
import { Button, Input, ThemeProvider, useTheme } from '@shukhratisakdjanov-cyber/faster-mobile';
import { fn } from 'storybook/test';

import { StoryScreen, StoryStack, storybookThemes } from './story-helpers';
import type { StorybookThemeName } from './story-helpers';

interface ThemePreviewProps {
  themeName: StorybookThemeName;
}

function ThemePreview({ themeName }: ThemePreviewProps) {
  return <ThemeProvider theme={storybookThemes[themeName]}><ThemePreviewContent /></ThemeProvider>;
}

function ThemePreviewContent() {
  const theme = useTheme();
  return (
    <StoryScreen>
      <Text accessibilityRole="header" style={{ color: theme.colors.text.primary, fontSize: 24, fontWeight: '500', lineHeight: 32 }}>Theme preview</Text>
      <Text style={{ color: theme.colors.text.primary, fontSize: 14, lineHeight: 22 }}>Use the Controls panel to switch themes. This story uses the same exported theme objects as the component library.</Text>
      <StoryStack>
        <Button>Primary action</Button>
        <Button variant="outline">Outline action</Button>
        <Button variant="ghost">Ghost action</Button>
        <Input label="Email" value="member@example.com" onChangeText={fn()} helperText="Theme-aware field and supporting text." />
        <Input label="Email" value="not-an-email" onChangeText={fn()} errorMessage="Enter a valid email." />
      </StoryStack>
    </StoryScreen>
  );
}

const meta = {
  title: 'Foundations/Theme Preview',
  component: ThemePreview,
  args: { themeName: 'default' },
  argTypes: {
    themeName: { control: 'select', options: ['default', 'dark', 'brandPurple'] },
  },
} satisfies Meta<typeof ThemePreview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {};
