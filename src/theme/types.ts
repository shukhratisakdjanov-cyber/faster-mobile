import type { TextStyle, ViewStyle } from 'react-native';

export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'link';
export type ButtonTone = 'default' | 'danger';

export interface Theme {
  colors: {
    text: { primary: string; inverse: string; disabled: string; link: string; danger: string };
    action: {
      primary: { default: string; pressed: string; disabled: string };
      danger: { default: string; pressed: string; disabled: string };
      ghostPressed: string;
      outlinePressed: string;
    };
    border: { default: string; interactive: string; danger: string };
    surface: { transparent: string; base: string; disabled: string; backdrop: string };
  };
  spacing: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl', number>;
  radius: { control: number; dialog: number };
  typography: {
    button: Record<ButtonSize, TextStyle>;
  };
  elevation: {
    dialog: {
      ios: Pick<ViewStyle, 'shadowColor' | 'shadowOffset' | 'shadowOpacity' | 'shadowRadius'>;
      android: Pick<ViewStyle, 'elevation' | 'shadowColor'>;
    };
  };
  components: {
    button: {
      minHeight: Record<ButtonSize, number>;
      paddingHorizontal: Record<ButtonSize, number>;
      gap: number;
      borderWidth: number;
    };
    input: { minHeight: Record<ButtonSize, number>; paddingHorizontal: Record<ButtonSize, number>; borderWidth: number };
    dialog: {
      backdropPadding: number;
      maxHeight: `${number}%`;
      maxWidth: number;
      padding: number;
      title: TextStyle;
      closeIcon: TextStyle;
      bodyPaddingTop: number;
      actionsGap: number;
      actionsPaddingTop: number;
    };
  };
}

export type ButtonStyleState = Pick<ViewStyle, 'backgroundColor' | 'borderColor' | 'borderWidth'> & {
  color: string;
};
