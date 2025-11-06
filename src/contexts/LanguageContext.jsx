import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en'
  })

  useEffect(() => {
    localStorage.setItem('language', language)
    // Update HTML lang attribute
    document.documentElement.lang = language
    // Update HTML dir attribute for RTL languages
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
    // Update font family based on language
    if (language === 'ar') {
      document.documentElement.style.fontFamily = 'Tajawal, sans-serif'
    } else {
      // Use Quicksand for English and Spanish
      document.documentElement.style.fontFamily = 'Quicksand, sans-serif'
    }
  }, [language])

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage)
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}
