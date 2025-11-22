import React, { createContext, useContext, useEffect, useState } from 'react'

export type ColorScheme = 'white' | 'purple' | 'blue'
export type ThemeMode = 'light' | 'dark'

interface ThemeContextType {
  colorScheme: ColorScheme
  themeMode: ThemeMode
  setColorScheme: (scheme: ColorScheme) => void
  setThemeMode: (mode: ThemeMode) => void
  toggleThemeMode: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [colorScheme, setColorSchemeState] = useState<ColorScheme>(() => {
    const stored = localStorage.getItem('color-scheme')
    return (stored as ColorScheme) || 'white'
  })

  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    const stored = localStorage.getItem('theme-mode')
    return (stored as ThemeMode) || 'light'
  })

  const setColorScheme = (scheme: ColorScheme) => {
    setColorSchemeState(scheme)
    localStorage.setItem('color-scheme', scheme)
  }

  const setThemeMode = (mode: ThemeMode) => {
    setThemeModeState(mode)
    localStorage.setItem('theme-mode', mode)
  }

  const toggleThemeMode = () => {
    const newMode = themeMode === 'light' ? 'dark' : 'light'
    setThemeMode(newMode)
  }

  // Apply theme classes to document element
  useEffect(() => {
    const root = document.documentElement
    
    // Remove all theme classes
    root.classList.remove('dark', 'white-scheme', 'purple-scheme', 'blue-scheme')
    
    // Apply dark mode class
    if (themeMode === 'dark') {
      root.classList.add('dark')
    }
    
    // Apply color scheme class
    if (colorScheme === 'purple') {
      root.classList.add('purple-scheme')
    } else if (colorScheme === 'blue') {
      root.classList.add('blue-scheme')
    } else {
      root.classList.add('white-scheme')
    }
  }, [colorScheme, themeMode])

  return (
    <ThemeContext.Provider
      value={{
        colorScheme,
        themeMode,
        setColorScheme,
        setThemeMode,
        toggleThemeMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
