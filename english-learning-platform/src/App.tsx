import { Routes, Route, useNavigate, useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { GraduationCap, Moon, Sun, Menu, X, Globe } from 'lucide-react'
import { KuwaitHubHome } from './components/kuwait-hub/KuwaitHubHome'
import { VocabularyLearningPage } from './components/kuwait-hub/VocabularyLearningPage'

import { GrammarQuizPage } from './components/kuwait-hub/GrammarQuizPage'
import { WritingTopicsPage } from './components/kuwait-hub/WritingTopicsPage'

import { FunctionalLanguagePage } from './components/kuwait-hub/FunctionalLanguagePage'
// Removed unused imports for unwanted sections
// import { ProgressDashboardPage } from './components/kuwait-hub/ProgressDashboardPage'
// import { SampleExamPage } from './components/kuwait-hub/SampleExamPage'
// import { FileUploadPage } from './components/kuwait-hub/FileUploadPage'
// import { VisualLearningPage } from './components/kuwait-hub/VisualLearningPage'
import { ListenAndLearnPage } from './components/kuwait-hub/ListenAndLearnPage'
import { Button } from './components/ui/button'
import { LanguageProvider, useLanguage, navigationLabels, getLocalizedText } from './contexts/LanguageContext'
import { CurriculumProvider } from './contexts/CurriculumContext'
// import { KuwaitClasses } from './pages/KuwaitClasses'
// import { KuwaitUnits } from './pages/KuwaitUnits'
// import { KuwaitVocabulary } from './pages/KuwaitVocabulary'
import { useDebugLifecycle, useDebugState, useDebugNavigation } from './hooks/useDebugState'
import { initializeGlobalEventTracking } from './debug-utils'
import './App.css'

function AppContent() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { language, toggleLanguage, isRTL } = useLanguage()
  const navigate = useNavigate()
  
  // Debug hooks
  const debugLogger = useDebugLifecycle('AppContent')
  const [debugMode, setDebugMode] = useDebugState(false, 'AppContent', 'debugMode')

  useEffect(() => {
    // Initialize global debugging
    initializeGlobalEventTracking()
    
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = () => {
    debugLogger.logEvent('toggleTheme:click', { currentMode: isDarkMode })
    
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    
    if (newMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
    
    debugLogger.logEvent('toggleTheme:success', { newMode })
  }

  const navLinks = [
    { path: '/', label: getLocalizedText('Home', 'الرئيسية', language) },
    { path: '/vocabulary', label: getLocalizedText('Vocabulary', 'المفردات', language) },
    { path: '/grammar', label: getLocalizedText('Grammar', 'القواعد', language) },
    { path: '/writing', label: getLocalizedText('Writing', 'الكتابة', language) },
    { path: '/functional', label: getLocalizedText('Functional', 'اللغة الوظيفية', language) },
    { path: '/listen-learn', label: getLocalizedText('Listen & Learn', 'الاستماع والتعلم', language) }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <nav className="bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button 
              onClick={() => navigate('/')} 
              className="flex items-center gap-2"
            >
              <GraduationCap className="w-8 h-8 text-primary" />
              <span className={`text-xl font-bold text-gradient-purple-blue ${isRTL ? 'font-arabic' : ''}`}>
                {getLocalizedText('Kuwait English Hub', 'مركز الإنجليزية الكويتي', language)}
              </span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors font-medium cursor-pointer">
                {getLocalizedText('Home', 'الرئيسية', language)}
              </Link>
              <Link to="/vocabulary" className="text-muted-foreground hover:text-foreground transition-colors font-medium cursor-pointer">
                {getLocalizedText('Vocabulary', 'المفردات', language)}
              </Link>

              <Link to="/grammar" className="text-muted-foreground hover:text-foreground transition-colors font-medium cursor-pointer">
                {getLocalizedText('Grammar', 'القواعد', language)}
              </Link>
              <Link to="/writing" className="text-muted-foreground hover:text-foreground transition-colors font-medium cursor-pointer">
                {getLocalizedText('Writing', 'الكتابة', language)}
              </Link>
              <Link to="/functional" className="text-muted-foreground hover:text-foreground transition-colors font-medium cursor-pointer">
                {getLocalizedText('Functional', 'اللغة الوظيفية', language)}
              </Link>
              <Link to="/listen-learn" className="text-muted-foreground hover:text-foreground transition-colors font-medium cursor-pointer">
                {getLocalizedText('Listen & Learn', 'الاستماع والتعلم', language)}
              </Link>
            </div>

            {/* Right Side Controls */}
            <div className="flex items-center gap-4">
              {/* Language Toggle */}
              <Button
                onClick={() => {
                  debugLogger.logEvent('language:toggle:click', { currentLanguage: language })
                  toggleLanguage()
                }}
                variant="ghost"
                size="icon"
                title={language === 'en' ? 'التبديل إلى العربية' : 'Switch to English'}
                className="flex items-center gap-1"
              >
                <Globe className="w-4 h-4" />
                <span className="text-xs font-medium">
                  {language === 'en' ? 'AR' : 'EN'}
                </span>
              </Button>

              {/* Theme Toggle */}
              <Button
                onClick={toggleTheme}
                variant="ghost"
                size="icon"
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => {
                  debugLogger.logEvent('mobileMenu:toggle:click', { currentState: mobileMenuOpen })
                  setMobileMenuOpen(!mobileMenuOpen)
                }}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              <div className="flex flex-col gap-3">
                <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2 text-left cursor-pointer">
                  {getLocalizedText('Home', 'الرئيسية', language)}
                </Link>
                <Link to="/vocabulary" onClick={() => setMobileMenuOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2 text-left cursor-pointer">
                  {getLocalizedText('Vocabulary', 'المفردات', language)}
                </Link>

                <Link to="/grammar" onClick={() => setMobileMenuOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2 text-left cursor-pointer">
                  {getLocalizedText('Grammar', 'القواعد', language)}
                </Link>
                <Link to="/writing" onClick={() => setMobileMenuOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2 text-left cursor-pointer">
                  {getLocalizedText('Writing', 'الكتابة', language)}
                </Link>
                <Link to="/functional" onClick={() => setMobileMenuOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2 text-left cursor-pointer">
                  {getLocalizedText('Functional', 'اللغة الوظيفية', language)}
                </Link>
                <Link to="/listen-learn" onClick={() => setMobileMenuOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors font-medium py-2 text-left cursor-pointer">
                  {getLocalizedText('Listen & Learn', 'الاستماع والتعلم', language)}
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <Routes>
          <Route path="/" element={<KuwaitHubHome />} />
          <Route path="/vocabulary" element={<VocabularyLearningPage />} />

          <Route path="/grammar" element={<GrammarQuizPage />} />
          <Route path="/writing" element={<WritingTopicsPage />} />
          <Route path="/functional" element={<FunctionalLanguagePage />} />
          <Route path="/listen-learn" element={<ListenAndLearnPage />} />
          
          {/* Kuwait Curriculum Routes - Temporarily disabled for testing */}
          {/* <Route path="/kuwait-classes" element={<KuwaitClasses />} />
          <Route path="/kuwait/class/:classNumber" element={<KuwaitUnits />} />
          <Route path="/kuwait/class/:classNumber/unit/:unitNumber" element={<KuwaitVocabulary />} /> */}
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-muted mt-16 py-8 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className={`text-muted-foreground ${isRTL ? 'font-arabic' : ''}`}>
            {getLocalizedText(
              'Kuwait English Hub - Comprehensive English Learning Platform',
              'مركز الإنجليزية الكويتي - منصة شاملة لتعلم اللغة الإنجليزية',
              language
            )}
          </p>
          <p className={`text-sm text-muted-foreground mt-2 ${isRTL ? 'font-arabic' : ''}`}>
            {getLocalizedText(
              'Grades 10, 11 & 12 - Kuwait Curriculum',
              'الصفوف 10، 11 و 12 - المنهج الكويتي',
              language
            )}
          </p>
        </div>
      </footer>
    </div>
  )
}



// Coming Soon Placeholder Component
function ComingSoonPage({ feature }: { feature: string }) {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-gradient-purple-blue">
          {feature}
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Coming Soon! This feature is currently under development.
        </p>
        <Button size="lg" onClick={() => navigate('/')}>
          Return to Home
        </Button>
      </div>
    </div>
  )
}

function App() {
  return (
    <LanguageProvider>
      <CurriculumProvider>
        <AppContent />
      </CurriculumProvider>
    </LanguageProvider>
  )
}

export default App
