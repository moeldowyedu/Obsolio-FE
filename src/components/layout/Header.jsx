import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { useLanguage } from '../../contexts/LanguageContext'
import { translations } from '../../translations'

const Header = () => {
  const { isAuthenticated, user, logout } = useAuthStore()
  const { language, changeLanguage } = useLanguage()
  const t = translations[language]
  const navigate = useNavigate()
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false)

  // Refs for dropdown menus
  const userMenuRef = useRef(null)
  const languageMenuRef = useRef(null)

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false)
      }
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target)) {
        setLanguageMenuOpen(false)
      }
    }

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside)

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const languages = [
    { code: 'en', name: 'English', flag: 'us' },
    { code: 'ar', name: 'العربية', flag: 'eg' },
  ]

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen)
  }

  return (
    <header className="glass-card sticky top-0 z-40 mb-8">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - Always links to homepage */}
          <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center space-x-2">
            <span className="material-icons text-3xl text-primary-600">gavel</span>
            <span className="text-2xl font-bold text-gray-900 text-shadow font-heading">Aasim</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="flex items-center space-x-6">
            {!isAuthenticated ? (
              <>
                <Link to="/#features" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                  {t.features}
                </Link>
                <Link to="/#use-cases" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                  {t.useCases}
                </Link>
                <Link to="/login" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                  {t.login}
                </Link>

                {/* Language Switcher */}
                <div className="relative" ref={languageMenuRef}>
                  <button
                    onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    <img
                      src={`https://flagcdn.com/24x18/${languages.find(l => l.code === language)?.flag}.png`}
                      alt={languages.find(l => l.code === language)?.name}
                      className="w-6 h-4.5 object-cover rounded"
                    />
                    <span className="material-icons text-sm">expand_more</span>
                  </button>
                  {languageMenuOpen && (
                    <div className="absolute right-0 mt-2 w-40 glass-card rounded-xl overflow-hidden shadow-2xl">
                      {languages.map(lang => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            changeLanguage(lang.code)
                            setLanguageMenuOpen(false)
                          }}
                          className={`w-full text-left px-4 py-3 hover:bg-white/50 transition-colors flex items-center space-x-2 ${
                            language === lang.code ? 'bg-white/50' : ''
                          }`}
                        >
                          <img
                            src={`https://flagcdn.com/24x18/${lang.flag}.png`}
                            alt={lang.name}
                            className="w-6 h-4.5 object-cover rounded"
                          />
                          <span>{lang.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <Link
                  to="/register"
                  className="glass-btn-primary rounded-xl px-6 py-2"
                >
                  {t.getStarted}
                </Link>
              </>
            ) : (
              <>
                {/* Language Switcher */}
                <div className="relative" ref={languageMenuRef}>
                  <button
                    onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    <img
                      src={`https://flagcdn.com/24x18/${languages.find(l => l.code === language)?.flag}.png`}
                      alt={languages.find(l => l.code === language)?.name}
                      className="w-6 h-4.5 object-cover rounded"
                    />
                    <span className="material-icons text-sm">expand_more</span>
                  </button>
                  {languageMenuOpen && (
                    <div className="absolute right-0 mt-2 w-40 glass-card rounded-xl overflow-hidden shadow-2xl">
                      {languages.map(lang => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            changeLanguage(lang.code)
                            setLanguageMenuOpen(false)
                          }}
                          className={`w-full text-left px-4 py-3 hover:bg-white/50 transition-colors flex items-center space-x-2 ${
                            language === lang.code ? 'bg-white/50' : ''
                          }`}
                        >
                          <img
                            src={`https://flagcdn.com/24x18/${lang.flag}.png`}
                            alt={lang.name}
                            className="w-6 h-4.5 object-cover rounded"
                          />
                          <span>{lang.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* User Menu */}
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={toggleUserMenu}
                    className="flex items-center space-x-2 glass-card px-4 py-2 rounded-xl hover:bg-white/90 transition-all"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                    <span className="text-gray-800 font-medium hidden sm:block">{user?.name || 'User'}</span>
                    <span className="material-icons text-gray-700 text-sm">
                      {userMenuOpen ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 glass-card rounded-xl overflow-hidden shadow-2xl">
                      <div className="px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-purple-50">
                        <p className="text-sm font-semibold text-gray-900">{user?.name || 'User'}</p>
                        <p className="text-xs text-gray-600 mt-0.5">{user?.email || 'user@example.com'}</p>
                        <p className="text-xs text-primary-600 font-medium mt-1 capitalize">{user?.role || 'User'}</p>
                      </div>

                      <Link
                        to="/profile"
                        className="block px-4 py-3 text-gray-700 hover:bg-white/50 transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="material-icons text-sm">person</span>
                          <span>{t.profile}</span>
                        </div>
                      </Link>

                      <Link
                        to="/notifications"
                        className="block px-4 py-3 text-gray-700 hover:bg-white/50 transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="material-icons text-sm">notifications</span>
                          <span>{t.notifications}</span>
                        </div>
                      </Link>

                      {user?.role === 'system_admin' && (
                        <Link
                          to="/system-admin/tenants"
                          className="block px-4 py-3 text-purple-700 hover:bg-purple-50 transition-colors border-t border-gray-200"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <div className="flex items-center space-x-2">
                            <span className="material-icons text-sm">admin_panel_settings</span>
                            <span>System Admin</span>
                          </div>
                        </Link>
                      )}

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-red-700 hover:bg-red-50 transition-colors border-t border-gray-200"
                      >
                        <div className="flex items-center space-x-2">
                          <span className="material-icons text-sm">logout</span>
                          <span>{t.logout}</span>
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
