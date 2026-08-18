import { forwardRef, useState } from 'react';
import type { ComponentRef, ReactNode } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import type { StyleProp, TextInputProps, TextStyle, ViewStyle } from 'react-native';
import { useTheme } from '../../theme';
import type { ButtonSize } from '../../theme';

export interface InputProps extends Omit<TextInputProps, 'editable' | 'style'> {
  size?: ButtonSize;
  label?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  clearable?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
}

export const Input = forwardRef<ComponentRef<typeof TextInput>, InputProps>(function Input(
  {
    size = 'medium', label, helperText, errorMessage, disabled = false, clearable = false,
    leadingIcon, trailingIcon, containerStyle, inputStyle, value, defaultValue,
    onFocus, onBlur, onChangeText, accessibilityLabel, ...inputProps
  },
  ref,
) {
  const theme = useTheme();
  const [focused, setFocused] = useState(false);
  const hasValue = Boolean(value ?? defaultValue);
  const hasError = Boolean(errorMessage);
  const borderColor = hasError ? theme.colors.border.danger : focused ? theme.colors.border.interactive : theme.colors.border.default;

  return (
    <View style={containerStyle}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={[styles.field, {
        minHeight: theme.components.input.minHeight[size], paddingHorizontal: theme.components.input.paddingHorizontal[size],
        borderRadius: theme.radius.control, borderWidth: theme.components.input.borderWidth, borderColor,
        backgroundColor: disabled ? theme.colors.surface.disabled : theme.colors.surface.base,
      }]}>
        {leadingIcon}
        <TextInput
          ref={ref}
          {...inputProps}
          value={value}
          defaultValue={defaultValue}
          editable={!disabled}
          accessibilityLabel={accessibilityLabel ?? label}
          accessibilityState={{ disabled, ...inputProps.accessibilityState }}
          placeholderTextColor={theme.colors.text.disabled}
          onFocus={(event) => { setFocused(true); onFocus?.(event); }}
          onBlur={(event) => { setFocused(false); onBlur?.(event); }}
          onChangeText={onChangeText}
          style={[styles.input, theme.typography.button[size], { color: disabled ? theme.colors.text.disabled : theme.colors.text.primary }, inputStyle]}
        />
        {clearable && hasValue && !disabled ? (
          <Pressable accessibilityRole="button" accessibilityLabel="Clear input" hitSlop={8} onPress={() => onChangeText?.('')}>
            <Text style={[styles.clear, { color: theme.colors.text.link }]}>×</Text>
          </Pressable>
        ) : trailingIcon}
      </View>
      {errorMessage ? <Text accessibilityLiveRegion="polite" style={[styles.support, { color: theme.colors.text.danger }]}>{errorMessage}</Text> : null}
      {!errorMessage && helperText ? <Text style={[styles.support, { color: theme.colors.text.primary }]}>{helperText}</Text> : null}
    </View>
  );
});

const styles = StyleSheet.create({
  label: { marginBottom: 4 },
  field: { alignItems: 'center', flexDirection: 'row' },
  input: { flex: 1, padding: 0 },
  clear: { fontSize: 20, lineHeight: 20 },
  support: { marginTop: 4 },
});
