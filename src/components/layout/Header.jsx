import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { useLanguage } from '../../contexts/LanguageContext'
import { translations } from '../../translations'
import NotificationBell from '../common/NotificationBell/NotificationBell'
import logo from '../../assets/imgs/OBSOLIO-logo-cyan.png'
import { Menu, X, LogIn } from 'lucide-react'

const Header = () => {
  const { isAuthenticated, user, logout } = useAuthStore()
  const { language, changeLanguage } = useLanguage()
  const t = translations[language]
  const navigate = useNavigate()
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Refs for dropdown menus
  const userMenuRef = useRef(null)
  const languageMenuRef = useRef(null)

  // Track scroll position for shrink effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      if (scrollPosition > 100) {
        setIsScrolled(true)
      } else if (scrollPosition < 10) {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-[#0B0E14]/90 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-6'}`}>
      <nav className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo - Always links to homepage */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src={logo}
              alt="OBSOLIO Logo"
              className={`transition-all duration-500 object-contain ${isScrolled ? 'h-10' : 'h-14'}`}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="flex items-center gap-6">
            <Link to="/" className="text-gray-300 hover:text-white font-medium transition-colors hidden sm:inline">{t.home || 'Home'}</Link>

            {!isAuthenticated && (
              <>
                <Link to="/docs/getting-started/introduction" className="text-gray-300 hover:text-white font-medium transition-colors hidden sm:inline">{t.docs || 'Docs'}</Link>
              </>
            )}

            {/* AgentX HUB - Public for everyone */}
            <Link to="/agentx/hub" className="text-gray-300 hover:text-white font-medium transition-colors hidden sm:inline">{t.agentxHub || 'AgentX HUB'}</Link>


            {!isAuthenticated ? (
              <>
                <Link
                  to="/signin"
                  className="hidden sm:flex items-center gap-2 px-4 py-2 border-2 border-primary-500 text-primary-400 hover:bg-primary-500 hover:text-white font-semibold rounded-lg transition-all"
                >
                  <LogIn className="w-4 h-4" />
                  {t.signIn || 'Sign In'}
                </Link>

                <Link
                  to="/register"
                  className="bg-primary-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-primary-700 transition-colors hidden sm:inline"
                >
                  {t.startFreeTrial || 'Start Free Trial'}
                </Link>

                {/* Language Switcher - Moved to end */}
                <div className="relative" ref={languageMenuRef}>
                  <button
                    onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                  >
                    <img
                      src={`https://flagcdn.com/24x18/${languages.find(l => l.code === language)?.flag}.png`}
                      alt={languages.find(l => l.code === language)?.name}
                      className="w-6 h-4.5 object-cover rounded"
                    />
                    <span className="material-icons text-sm">expand_more</span>
                  </button>
                  {languageMenuOpen && (
                    <div className="absolute right-0 mt-2 w-40 glass-card bg-[#0B0E14] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                      {languages.map(lang => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            changeLanguage(lang.code)
                            setLanguageMenuOpen(false)
                          }}
                          className={`w-full text-left px-4 py-3 hover:bg-white/10 transition-colors flex items-center space-x-2 ${language === lang.code ? 'bg-white/5' : ''
                            } text-gray-300 hover:text-white`}
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

                {/* Mobile Menu Button */}
                <button
                  className="sm:hidden text-gray-300 hover:text-white"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X /> : <Menu />}
                </button>
              </>
            ) : (
              <>
                {/* Language Switcher (Authenticated) */}
                <div className="relative" ref={languageMenuRef}>
                  {/* ... same changes for authenticated state if needed, but keeping simple for now ... */}
                  {/* Copying similar logic for consistency if user asks, but focus is on landing page nav */}
                  <button
                    onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                    className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
                  >
                    <img
                      src={`https://flagcdn.com/24x18/${languages.find(l => l.code === language)?.flag}.png`}
                      alt={languages.find(l => l.code === language)?.name}
                      className="w-6 h-4.5 object-cover rounded"
                    />
                    <span className="material-icons text-sm">expand_more</span>
                  </button>
                  {languageMenuOpen && (
                    <div className="absolute right-0 mt-2 w-40 glass-card bg-[#0B0E14] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                      {languages.map(lang => (
                        <button
                          key={lang.code}
                          onClick={() => {
                            changeLanguage(lang.code)
                            setLanguageMenuOpen(false)
                          }}
                          className={`w-full text-left px-4 py-3 hover:bg-white/10 transition-colors flex items-center space-x-2 ${language === lang.code ? 'bg-white/5' : ''
                            } text-gray-300 hover:text-white`}
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

                {/* Notification Bell */}
                <NotificationBell />

                {/* User Menu */}
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={toggleUserMenu}
                    className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl hover:bg-white/10 transition-all"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {(user?.name || user?.fullName || user?.full_name || 'U').charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="material-icons text-gray-300 text-sm">
                      {userMenuOpen ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 glass-card bg-[#0B0E14] border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                      <div className="px-4 py-3 border-b border-white/10 bg-white/5">
                        <p className="text-sm font-semibold text-white">
                          {user?.name || user?.fullName || user?.full_name || 'User'}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">{user?.email || 'user@example.com'}</p>
                        <p className="text-xs text-primary-400 font-medium mt-1 capitalize">{user?.role || 'User'}</p>
                      </div>

                      <Link
                        to="/profile"
                        className="block px-4 py-3 text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <div className="flex items-center gap-2">
                          <span className="material-icons text-sm">person</span>
                          <span>{t.profile}</span>
                        </div>
                      </Link>

                      <Link
                        to="/notifications"
                        className="block px-4 py-3 text-gray-300 hover:bg-white/10 hover:text-white transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <div className="flex items-center gap-2">
                          <span className="material-icons text-sm">notifications</span>
                          <span>{t.notifications}</span>
                        </div>
                      </Link>

                      {user?.role === 'system_admin' && (
                        <Link
                          to="/system-admin/tenants"
                          className="block px-4 py-3 text-purple-400 hover:bg-purple-500/10 transition-colors border-t border-white/10"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <div className="flex items-center gap-2">
                            <span className="material-icons text-sm">admin_panel_settings</span>
                            <span>{t.systemAdmin || 'System Admin'}</span>
                          </div>
                        </Link>
                      )}

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-red-400 hover:bg-red-500/10 transition-colors border-t border-white/10"
                      >
                        <div className="flex items-center gap-2">
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

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && !isAuthenticated && (
          <div className="sm:hidden absolute top-full left-0 w-full bg-[#0B0E14]/95 backdrop-blur-xl border-t border-white/10 p-6 flex flex-col gap-4 shadow-2xl h-screen">
            <Link to="/agentx/hub" onClick={() => setMobileMenuOpen(false)} className="text-lg text-gray-300 hover:text-white font-medium">AgentX HUB</Link>
            <Link to="/docs/getting-started/introduction" onClick={() => setMobileMenuOpen(false)} className="text-lg text-gray-300 hover:text-white font-medium">Docs</Link>
            <hr className="border-white/10" />
            <Link to="/signin" className="text-lg text-gray-200 hover:text-white font-semibold">Sign In</Link>
            <Link to="/register" className="glass-btn-primary text-center justify-center">Start Free Trial</Link>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header
