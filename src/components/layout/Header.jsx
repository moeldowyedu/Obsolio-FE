import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { useLanguage } from '../../contexts/LanguageContext'
import { translations } from '../../translations'

const Header = () => {
  const { isAuthenticated, user, logout } = useAuthStore()
  const { language, changeLanguage } = useLanguage()
  const t = translations[language]
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false)
  const [agentsMenuOpen, setAgentsMenuOpen] = useState(false)

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  ]

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen)
  }

  return (
    <header className="glass-card sticky top-0 z-40 mb-8">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - Always links to homepage */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="material-icons text-3xl text-primary-600">gavel</span>
            <span className="text-2xl font-bold text-gray-900 text-shadow font-heading">Aasim</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
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
                <div className="relative">
                  <button
                    onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    <span className="text-xl">{languages.find(l => l.code === language)?.flag}</span>
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
                          <span className="text-xl">{lang.flag}</span>
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
                <Link to="/dashboard" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                  {t.dashboard}
                </Link>
                <Link to="/submissions" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                  {t.submissions}
                </Link>

                {/* AI Agents Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setAgentsMenuOpen(!agentsMenuOpen)}
                    className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors font-medium"
                  >
                    <span>AI Agents</span>
                    <span className="material-icons text-sm">expand_more</span>
                  </button>
                  {agentsMenuOpen && (
                    <div className="absolute left-0 mt-2 w-56 glass-card rounded-xl overflow-hidden shadow-2xl">
                      <Link
                        to="/marketplace"
                        className="block px-4 py-3 text-gray-700 hover:bg-white/50 transition-colors"
                        onClick={() => setAgentsMenuOpen(false)}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="material-icons text-sm text-blue-600">store</span>
                          <span>Marketplace</span>
                        </div>
                      </Link>
                      <Link
                        to="/orchestrator"
                        className="block px-4 py-3 text-gray-700 hover:bg-white/50 transition-colors"
                        onClick={() => setAgentsMenuOpen(false)}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="material-icons text-sm text-purple-600">account_tree</span>
                          <span>Orchestrator</span>
                        </div>
                      </Link>
                      <Link
                        to="/scheduler"
                        className="block px-4 py-3 text-gray-700 hover:bg-white/50 transition-colors"
                        onClick={() => setAgentsMenuOpen(false)}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="material-icons text-sm text-green-600">event</span>
                          <span>Scheduler</span>
                        </div>
                      </Link>
                      <Link
                        to="/integration"
                        className="block px-4 py-3 text-gray-700 hover:bg-white/50 transition-colors border-t border-gray-200"
                        onClick={() => setAgentsMenuOpen(false)}
                      >
                        <div className="flex items-center space-x-2">
                          <span className="material-icons text-sm text-orange-600">code</span>
                          <span>API & Integration</span>
                        </div>
                      </Link>
                    </div>
                  )}
                </div>

                <Link to="/criteria" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                  {t.criteria}
                </Link>
                {user?.role === 'admin' && (
                  <Link to="/admin" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                    {t.admin}
                  </Link>
                )}

                {/* Language Switcher */}
                <div className="relative">
                  <button
                    onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    <span className="text-xl">{languages.find(l => l.code === language)?.flag}</span>
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
                          <span className="text-xl">{lang.flag}</span>
                          <span>{lang.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={toggleUserMenu}
                    className="flex items-center space-x-2 glass-card px-4 py-2 rounded-xl hover:bg-white/90 transition-all"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center">
                      <span className="text-gray-900 font-semibold text-sm">
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    </div>
                    <span className="text-gray-800 font-medium">{user?.name || 'User'}</span>
                    <span className="material-icons text-gray-700 text-sm">
                      {userMenuOpen ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 glass-card rounded-xl overflow-hidden shadow-2xl">
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
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-gray-700 hover:bg-white/50 transition-colors border-t border-gray-200"
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

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-gray-800 p-2"
          >
            <span className="material-icons">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            {!isAuthenticated ? (
              <div className="flex flex-col space-y-3">
                <Link
                  to="/#features"
                  className="text-gray-700 hover:text-primary-600 transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </Link>
                <Link
                  to="/#use-cases"
                  className="text-gray-700 hover:text-primary-600 transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Use Cases
                </Link>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary-600 transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="glass-btn-primary rounded-xl px-6 py-2 text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            ) : (
              <div className="flex flex-col space-y-3">
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-primary-600 transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/submissions"
                  className="text-gray-700 hover:text-primary-600 transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Submissions
                </Link>

                {/* AI Agents Section */}
                <div className="border-t border-gray-200 pt-3">
                  <div className="text-xs font-bold text-gray-500 mb-2 px-2">AI AGENTS</div>
                  <Link
                    to="/marketplace"
                    className="text-gray-700 hover:text-primary-600 transition-colors py-2 flex items-center space-x-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="material-icons text-sm text-blue-600">store</span>
                    <span>Marketplace</span>
                  </Link>
                  <Link
                    to="/orchestrator"
                    className="text-gray-700 hover:text-primary-600 transition-colors py-2 flex items-center space-x-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="material-icons text-sm text-purple-600">account_tree</span>
                    <span>Orchestrator</span>
                  </Link>
                  <Link
                    to="/scheduler"
                    className="text-gray-700 hover:text-primary-600 transition-colors py-2 flex items-center space-x-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="material-icons text-sm text-green-600">event</span>
                    <span>Scheduler</span>
                  </Link>
                  <Link
                    to="/integration"
                    className="text-gray-700 hover:text-primary-600 transition-colors py-2 flex items-center space-x-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="material-icons text-sm text-orange-600">code</span>
                    <span>API & Integration</span>
                  </Link>
                </div>

                <Link
                  to="/criteria"
                  className="text-gray-700 hover:text-primary-600 transition-colors py-2 border-t border-gray-200 pt-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Criteria
                </Link>
                {user?.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="text-gray-700 hover:text-primary-600 transition-colors py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Admin
                  </Link>
                )}
                <Link
                  to="/profile"
                  className="text-gray-700 hover:text-primary-600 transition-colors py-2 border-t border-gray-200 pt-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/notifications"
                  className="text-gray-700 hover:text-primary-600 transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Notifications
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-left text-gray-700 hover:text-primary-600 transition-colors py-2 border-t border-gray-200 pt-3"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header
