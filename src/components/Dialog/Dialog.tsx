import type { ReactNode } from 'react';
import { Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { ModalProps, StyleProp, ViewStyle } from 'react-native';
import { Button } from '../Button';
import { resolveDialogElevation, useTheme } from '../../theme';

export interface DialogAction { label: string; onPress: () => void; loading?: boolean; }
export interface DialogProps extends Pick<ModalProps, 'animationType' | 'testID'> {
  visible: boolean;
  title: string;
  children: ReactNode;
  primaryAction?: DialogAction;
  secondaryAction?: DialogAction;
  dismissible?: boolean;
  onDismiss: () => void;
  style?: StyleProp<ViewStyle>;
}

export function Dialog({ visible, title, children, primaryAction, secondaryAction, dismissible = true, onDismiss, animationType = 'fade', style, testID }: DialogProps) {
  const theme = useTheme();
  const tokens = theme.components.dialog;
  const dismiss = () => { if (dismissible) onDismiss(); };

  return (
    <Modal transparent visible={visible} animationType={animationType} onRequestClose={dismiss} testID={testID}>
      <SafeAreaView style={styles.safeArea}>
        <Pressable accessible={false} disabled={!dismissible} onPress={dismiss} style={[styles.backdrop, { backgroundColor: theme.colors.surface.backdrop, padding: tokens.backdropPadding }]}>
          <Pressable accessible={false} accessibilityViewIsModal onPress={(event) => event.stopPropagation()} style={[styles.surface, {
            backgroundColor: theme.colors.surface.base,
            borderRadius: theme.radius.dialog,
            maxHeight: tokens.maxHeight,
            maxWidth: tokens.maxWidth,
            padding: tokens.padding,
            ...resolveDialogElevation(theme.elevation.dialog),
          }, style]}>
            <View style={styles.header}>
              <Text accessibilityRole="header" style={tokens.title}>{title}</Text>
              {dismissible ? <Pressable accessibilityRole="button" accessibilityLabel="Close dialog" hitSlop={8} onPress={onDismiss}><Text style={tokens.closeIcon}>×</Text></Pressable> : null}
            </View>
            <ScrollView contentContainerStyle={{ paddingTop: tokens.bodyPaddingTop }}>{children}</ScrollView>
            {(primaryAction || secondaryAction) ? <View style={[styles.actions, { gap: tokens.actionsGap, paddingTop: tokens.actionsPaddingTop }]}>
              {secondaryAction ? <Button variant="ghost" onPress={secondaryAction.onPress} loading={secondaryAction.loading}>{secondaryAction.label}</Button> : null}
              {primaryAction ? <Button onPress={primaryAction.onPress} loading={primaryAction.loading}>{primaryAction.label}</Button> : null}
            </View> : null}
          </Pressable>
        </Pressable>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  backdrop: { alignItems: 'center', flex: 1, justifyContent: 'center' },
  surface: { width: '100%' },
  header: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  actions: { flexDirection: 'row', justifyContent: 'flex-end' },
});
