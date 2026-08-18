import { createContext, useContext, useMemo } from 'react';
import type { PropsWithChildren } from 'react';
import { defaultTheme } from './themes';
import type { Theme } from './types';

const ThemeContext = createContext<Theme>(defaultTheme);

export interface ThemeProviderProps extends PropsWithChildren {
  theme?: Theme;
}

export function ThemeProvider({ children, theme }: ThemeProviderProps) {
  const value = useMemo(() => theme ?? defaultTheme, [theme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): Theme {
  return useContext(ThemeContext);
}
