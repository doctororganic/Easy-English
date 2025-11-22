import { useTheme, ColorScheme } from '../contexts/ThemeContext'
import { Sun, Moon, Palette, Check } from 'lucide-react'
import { useState } from 'react'

export function ThemeSelector() {
  const { colorScheme, themeMode, setColorScheme, toggleThemeMode } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const colorSchemes: { value: ColorScheme; label: string; description: string; preview: string }[] = [
    {
      value: 'white',
      label: 'White',
      description: 'Clean & Professional',
      preview: 'bg-gradient-to-br from-slate-50 to-blue-50'
    },
    {
      value: 'purple',
      label: 'Purple',
      description: 'Elegant & Educational',
      preview: 'bg-gradient-to-br from-purple-50 to-pink-50'
    },
    {
      value: 'blue',
      label: 'Blue',
      description: 'Trustworthy & Academic',
      preview: 'bg-gradient-to-br from-blue-50 to-cyan-50'
    }
  ]

  return (
    <div className="relative">
      {/* Theme Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card hover:bg-accent transition-colors border border-border"
        aria-label="Theme settings"
      >
        <Palette className="w-5 h-5 text-primary" />
        <span className="hidden sm:inline text-sm font-medium text-foreground">Theme</span>
      </button>

      {/* Theme Selector Modal */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal */}
          <div className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-lg shadow-xl z-50 overflow-hidden">
            <div className="p-4 border-b border-border">
              <h3 className="text-lg font-semibold text-foreground">Theme Settings</h3>
              <p className="text-sm text-muted-foreground">Customize your experience</p>
            </div>

            {/* Dark/Light Mode Toggle */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Mode</span>
                <button
                  onClick={toggleThemeMode}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  {themeMode === 'light' ? (
                    <>
                      <Sun className="w-4 h-4" />
                      <span className="text-sm">Light</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-4 h-4" />
                      <span className="text-sm">Dark</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                Switch between light and dark mode
              </p>
            </div>

            {/* Color Scheme Selection */}
            <div className="p-4">
              <div className="mb-3">
                <span className="text-sm font-medium text-foreground">Color Scheme</span>
                <p className="text-xs text-muted-foreground mt-1">
                  Choose your preferred color palette
                </p>
              </div>

              <div className="space-y-2">
                {colorSchemes.map((scheme) => (
                  <button
                    key={scheme.value}
                    onClick={() => setColorScheme(scheme.value)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                      colorScheme === scheme.value
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50 bg-background'
                    }`}
                  >
                    {/* Preview */}
                    <div className={`w-12 h-12 rounded-md ${scheme.preview} border border-border shadow-sm flex-shrink-0`} />

                    {/* Label & Description */}
                    <div className="flex-1 text-left">
                      <div className="font-medium text-sm text-foreground">{scheme.label}</div>
                      <div className="text-xs text-muted-foreground">{scheme.description}</div>
                    </div>

                    {/* Check Icon */}
                    {colorScheme === scheme.value && (
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-muted/50 border-t border-border">
              <p className="text-xs text-muted-foreground text-center">
                Theme settings are saved automatically
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
