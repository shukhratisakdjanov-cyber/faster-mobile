import type { PropsWithChildren, ReactNode } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ThemeProvider, brandPurpleTheme, darkTheme, defaultTheme, useTheme } from '@shukhratisakdjanov-cyber/faster-mobile';
import type { Theme } from '@shukhratisakdjanov-cyber/faster-mobile';

export const storybookThemes = { default: defaultTheme, dark: darkTheme, brandPurple: brandPurpleTheme };
export type StorybookThemeName = keyof typeof storybookThemes;

export function StoryScreen({ children }: PropsWithChildren) {
  const theme = useTheme();
  return <ScrollView contentContainerStyle={[styles.screen, { backgroundColor: theme.colors.surface.base }]}>{children}</ScrollView>;
}

export function StoryIntroduction({ children, title }: { children: ReactNode; title: string }) {
  const theme = useTheme();
  return (
    <StoryScreen>
      <Text accessibilityRole="header" style={[styles.title, { color: theme.colors.text.primary }]}>{title}</Text>
      <Text style={[styles.copy, { color: theme.colors.text.primary }]}>{children}</Text>
      <Text style={[styles.note, { color: theme.colors.text.disabled }]}>Design reference: TapTap Design System Figma audit in docs/FIGMA_AUDIT.md.</Text>
    </StoryScreen>
  );
}

export function StoryGroup({ children, title }: { children: ReactNode; title: string }) {
  const theme = useTheme();
  return <View style={styles.group}><Text accessibilityRole="header" style={[styles.groupTitle, { color: theme.colors.text.primary }]}>{title}</Text>{children}</View>;
}

export function StoryStack({ children }: PropsWithChildren) {
  return <View style={styles.stack}>{children}</View>;
}

export function ThemeMatrix({ children }: PropsWithChildren) {
  return (
    <StoryScreen>
      <ThemeMatrixSection title="Default theme" theme={defaultTheme}>{children}</ThemeMatrixSection>
      <ThemeMatrixSection title="Dark theme" theme={darkTheme}>{children}</ThemeMatrixSection>
      <ThemeMatrixSection title="Brand Purple theme" theme={brandPurpleTheme}>{children}</ThemeMatrixSection>
    </StoryScreen>
  );
}

function ThemeMatrixSection({ children, theme, title }: PropsWithChildren<{ theme: Theme; title: string }>) {
  return (
    <ThemeProvider theme={theme}>
      <ThemeMatrixSectionContent title={title}>{children}</ThemeMatrixSectionContent>
    </ThemeProvider>
  );
}

function ThemeMatrixSectionContent({ children, title }: PropsWithChildren<{ title: string }>) {
  const theme = useTheme();
  return <View style={[styles.matrixSection, { backgroundColor: theme.colors.surface.base, borderColor: theme.colors.border.default }]}><Text accessibilityRole="header" style={[styles.groupTitle, { color: theme.colors.text.primary }]}>{title}</Text><StoryStack>{children}</StoryStack></View>;
}

const styles = StyleSheet.create({
  screen: { flexGrow: 1, gap: 16, padding: 24 },
  title: { fontSize: 24, fontWeight: '500', lineHeight: 32 },
  copy: { fontSize: 14, lineHeight: 22 },
  note: { fontSize: 12, lineHeight: 18 },
  group: { gap: 8 },
  stack: { gap: 12 },
  matrixSection: { borderRadius: 8, borderWidth: 1, gap: 12, padding: 16 },
  groupTitle: { fontSize: 16, fontWeight: '500', lineHeight: 24 },
});
