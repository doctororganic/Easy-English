import { createContext, useContext, useState, ReactNode } from 'react'

interface KuwaitClass {
  class_number: number
  title: string
  description: string
}

interface KuwaitUnit {
  unit_number: number
  title: string
  description: string
}

interface CurriculumContextType {
  currentClass: KuwaitClass | null
  currentUnit: KuwaitUnit | null
  availableUnits: KuwaitUnit[]
  loading: boolean
  error: string | null
  setCurrentClass: (classData: KuwaitClass) => void
  setCurrentUnit: (unitData: KuwaitUnit | null) => void
  resetToClass: (classNumber: number) => void
  navigateToClass: (classNumber: number) => void
  navigateToUnit: (classNumber: number, unitNumber: number) => void
  navigateToVocabulary: (classNumber: number, unitNumber: number) => void
}

const CurriculumContext = createContext<CurriculumContextType | undefined>(undefined)

export function CurriculumProvider({ children }: { children: ReactNode }) {
  const [currentClass, setCurrentClass] = useState<KuwaitClass | null>(null)
  const [currentUnit, setCurrentUnit] = useState<KuwaitUnit | null>(null)
  const [availableUnits, setAvailableUnits] = useState<KuwaitUnit[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const resetToClass = (classNumber: number) => {
    // Simple implementation for now
  }

  const navigateToClass = (classNumber: number) => {
    // Simple implementation for now
  }

  const navigateToUnit = (classNumber: number, unitNumber: number) => {
    // Simple implementation for now
  }

  const navigateToVocabulary = (classNumber: number, unitNumber: number) => {
    // Simple implementation for now
  }

  const value: CurriculumContextType = {
    currentClass,
    currentUnit,
    availableUnits,
    loading,
    error,
    setCurrentClass,
    setCurrentUnit,
    resetToClass,
    navigateToClass,
    navigateToUnit,
    navigateToVocabulary,
  }

  return (
    <CurriculumContext.Provider value={value}>
      {children}
    </CurriculumContext.Provider>
  )
}

export function useCurriculum() {
  const context = useContext(CurriculumContext)
  if (context === undefined) {
    throw new Error('useCurriculum must be used within a CurriculumProvider')
  }
  return context
}