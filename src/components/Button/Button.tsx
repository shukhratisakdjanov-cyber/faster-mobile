import { forwardRef } from 'react';
import type { ComponentRef, ReactNode } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import type { PressableProps, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import type { ButtonSize, ButtonTone, ButtonVariant } from '../../theme';

export interface ButtonProps extends Omit<PressableProps, 'accessibilityRole' | 'children' | 'disabled' | 'style'> {
  children: ReactNode;
  variant?: ButtonVariant;
  tone?: ButtonTone;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  loadingLabel?: string;
  fullWidth?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const Button = forwardRef<ComponentRef<typeof Pressable>, ButtonProps>(function Button(
  {
    children,
    variant = 'primary',
    tone = 'default',
    size = 'medium',
    disabled = false,
    loading = false,
    loadingLabel = 'Loading',
    fullWidth = false,
    leadingIcon,
    trailingIcon,
    onPress,
    style,
    accessibilityLabel,
    ...pressableProps
  },
  ref,
) {
  const theme = useTheme();
  const isDisabled = disabled || loading;
  const action = tone === 'danger' ? theme.colors.action.danger : theme.colors.action.primary;
  const textColor = variant === 'primary'
    ? theme.colors.text.inverse
    : tone === 'danger'
      ? theme.colors.text.danger
      : variant === 'link'
        ? theme.colors.text.link
        : theme.colors.text.primary;

  return (
    <Pressable
      ref={ref}
      {...pressableProps}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled: isDisabled, busy: loading, ...pressableProps.accessibilityState }}
      disabled={isDisabled}
      hitSlop={8}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        {
          minHeight: theme.components.button.minHeight[size],
          paddingHorizontal: theme.components.button.paddingHorizontal[size],
          borderRadius: theme.radius.control,
          gap: theme.components.button.gap,
          width: fullWidth ? '100%' : undefined,
        },
        getContainerStyle({ variant, tone, pressed, disabled: isDisabled, theme, action }),
        style,
      ]}
    >
      {loading ? <ActivityIndicator accessibilityLabel={loadingLabel} color={textColor} /> : leadingIcon}
      <View pointerEvents="none" style={styles.content}>
        <Text style={[theme.typography.button[size], { color: isDisabled && variant !== 'primary' ? theme.colors.text.disabled : textColor }]}>
          {children}
        </Text>
      </View>
      {!loading && trailingIcon}
    </Pressable>
  );
});

function getContainerStyle({
  variant,
  tone,
  pressed,
  disabled,
  theme,
  action,
}: {
  variant: ButtonVariant;
  tone: ButtonTone;
  pressed: boolean;
  disabled: boolean;
  theme: ReturnType<typeof useTheme>;
  action: ReturnType<typeof useTheme>['colors']['action']['primary'];
}): ViewStyle {
  if (variant === 'primary') {
    return { backgroundColor: disabled ? action.disabled : pressed ? action.pressed : action.default };
  }
  if (variant === 'outline') {
    return {
      backgroundColor: pressed && !disabled ? theme.colors.action.outlinePressed : theme.colors.surface.transparent,
      borderColor: disabled ? theme.colors.border.default : tone === 'danger' ? theme.colors.border.danger : theme.colors.border.interactive,
      borderWidth: theme.components.button.borderWidth,
    };
  }
  if (variant === 'ghost') {
    return { backgroundColor: pressed && !disabled ? theme.colors.action.ghostPressed : theme.colors.surface.transparent };
  }
  return { backgroundColor: theme.colors.surface.transparent };
}

const styles = StyleSheet.create({
  base: { alignItems: 'center', flexDirection: 'row', justifyContent: 'center' },
  content: { flexShrink: 1 },
});
