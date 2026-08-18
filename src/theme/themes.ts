import { primitives } from './primitives';
import type { Theme } from './types';

export const defaultTheme: Theme = {
  colors: {
    text: {
      primary: primitives.color.neutral600,
      inverse: primitives.color.white,
      disabled: primitives.color.neutral400,
      link: primitives.color.primary600,
      danger: primitives.color.danger600,
    },
    action: {
      primary: { default: primitives.color.primary600, pressed: primitives.color.primary700, disabled: primitives.color.primary300 },
      danger: { default: primitives.color.danger600, pressed: primitives.color.danger700, disabled: primitives.color.primary300 },
      ghostPressed: primitives.color.neutral200,
      outlinePressed: primitives.color.neutral200,
    },
    border: { default: primitives.color.neutral300, interactive: primitives.color.primary600, danger: primitives.color.danger600 },
    surface: { transparent: primitives.color.transparent, base: primitives.color.white, disabled: '#FAFAFA', backdrop: 'rgba(0, 0, 0, 0.45)' },
  },
  spacing: { xs: primitives.spacing[4], sm: primitives.spacing[8], md: primitives.spacing[12], lg: primitives.spacing[16], xl: primitives.spacing[24] },
  radius: { control: primitives.radius[4], dialog: primitives.radius[8] },
  typography: {
    button: {
      small: { fontSize: primitives.fontSize[12], lineHeight: primitives.lineHeight[18], fontWeight: primitives.fontWeight.medium },
      medium: { fontSize: primitives.fontSize[14], lineHeight: primitives.lineHeight[22], fontWeight: primitives.fontWeight.medium },
      large: { fontSize: primitives.fontSize[16], lineHeight: primitives.lineHeight[24], fontWeight: primitives.fontWeight.medium },
    },
  },
  // Engineering fallback until the Figma shadow parameters are formally verified.
  // The semantic token keeps the platform-specific implementation behind one contract.
  elevation: {
    dialog: {
      ios: { shadowColor: '#000000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.18, shadowRadius: 12 },
      android: { elevation: 8, shadowColor: '#000000' },
    },
  },
  components: {
    button: {
      minHeight: { small: 24, medium: 36, large: 40 },
      paddingHorizontal: { small: primitives.spacing[4], medium: primitives.spacing[8], large: primitives.spacing[8] },
      gap: primitives.spacing[4],
      borderWidth: 1,
    },
    input: {
      minHeight: { small: 24, medium: 36, large: 40 },
      paddingHorizontal: { small: primitives.spacing[8], medium: primitives.spacing[12], large: primitives.spacing[12] },
      borderWidth: 1,
    },
    dialog: {
      backdropPadding: primitives.spacing[24],
      maxHeight: '90%',
      maxWidth: 600,
      padding: primitives.spacing[24],
      title: { fontSize: primitives.fontSize[20], fontWeight: primitives.fontWeight.medium, lineHeight: primitives.lineHeight[28] },
      closeIcon: { fontSize: primitives.fontSize[20], lineHeight: primitives.lineHeight[28] },
      bodyPaddingTop: primitives.spacing[16],
      actionsGap: primitives.spacing[8],
      actionsPaddingTop: primitives.spacing[24],
    },
  },
};

export const brandPurpleTheme: Theme = {
  ...defaultTheme,
  colors: {
    ...defaultTheme.colors,
    action: {
      ...defaultTheme.colors.action,
      primary: { default: '#6D5EF9', pressed: '#5547D9', disabled: '#C9C4FF' },
    },
    border: { ...defaultTheme.colors.border, interactive: '#6D5EF9' },
    text: { ...defaultTheme.colors.text, link: '#6D5EF9' },
  },
};

export const darkTheme: Theme = {
  ...defaultTheme,
  colors: {
    text: {
      primary: '#F5F5F5',
      inverse: primitives.color.white,
      disabled: primitives.color.neutral400,
      link: primitives.color.primary300,
      danger: '#FF8F8F',
    },
    action: {
      primary: { default: '#47CFD6', pressed: primitives.color.primary600, disabled: '#3D7477' },
      danger: { default: '#FF6B6B', pressed: primitives.color.danger600, disabled: '#713C3C' },
      ghostPressed: '#303030',
      outlinePressed: '#303030',
    },
    border: { default: '#5F5F5F', interactive: '#47CFD6', danger: '#FF6B6B' },
    surface: { transparent: primitives.color.transparent, base: '#1A1A1A', disabled: '#2A2A2A', backdrop: 'rgba(0, 0, 0, 0.68)' },
  },
};
