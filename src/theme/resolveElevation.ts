import { Platform } from 'react-native';
import type { ViewStyle } from 'react-native';
import type { Theme } from './types';

type DialogElevation = Theme['elevation']['dialog'];
type ElevationPlatform = 'android' | 'ios';

/**
 * Resolves one semantic elevation token to the native style supported by the
 * current platform. Components stay unaware of shadow implementation details.
 */
export function resolveDialogElevation(
  elevation: DialogElevation,
  platform: ElevationPlatform = Platform.OS === 'ios' ? 'ios' : 'android',
): ViewStyle {
  return elevation[platform];
}
