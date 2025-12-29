import { Link } from 'react-router-dom'
import {
  Github, Twitter, Linkedin, Mail, MapPin, Phone,
  ExternalLink, Shield, FileText, Activity
} from 'lucide-react'
import ObsolioLogo from '../../assets/imgs/OBSOLIO-logo-light.png'
import ObsolioLogoDark from '../../assets/imgs/OBSOLIO-logo-dark.png'
import { useLanguage } from '../../contexts/LanguageContext'
import { useTheme } from '../../contexts/ThemeContext'
import { translations } from '../../translations'

const Footer = () => {
  const { language } = useLanguage()
  const { theme } = useTheme()
  const t = translations[language]
  const currentYear = new Date().getFullYear()

  return (
    <footer className={`relative mt-20 border-t overflow-hidden ${theme === 'dark' ? 'border-white/5 bg-[#05080f]' : 'border-gray-200 bg-gray-50'}`}>
      {/* Background Decor */}
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent to-transparent ${theme === 'dark' ? 'via-primary-500/50' : 'via-primary-500/30'}`}></div>
      {theme === 'dark' && (
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-900/10 via-[#05080f] to-[#05080f] pointer-events-none"></div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-primary-500/20 blur-lg rounded-full group-hover:bg-primary-500/30 transition-all duration-500"></div>
                <img src={theme === 'dark' ? ObsolioLogoDark : ObsolioLogo} alt="Obsolio" className="h-12 w-auto relative z-10" />
              </div>
            </Link>
            <p className={`text-sm leading-relaxed max-w-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {t.footerTagline || 'The Precision AI Agent Platform.'}
              <br />
              {t.footerDescription || 'Deploy autonomous agents for high-fidelity tasks with Human-in-the-Loop oversight.'}
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all group ${theme === 'dark' ? 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10' : 'bg-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-300'}`}>
                <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all group ${theme === 'dark' ? 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10' : 'bg-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-300'}`}>
                <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all group ${theme === 'dark' ? 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10' : 'bg-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-300'}`}>
                <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className={`font-bold mb-6 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              <Activity className="w-4 h-4 text-brand-blue" />
              {t.productTitle || 'Product'}
            </h3>
            <ul className="space-y-4">
              <li>
                <Link to="/#features" className={`text-sm transition-colors flex items-center gap-2 w-fit ${theme === 'dark' ? 'text-gray-400 hover:text-primary-400' : 'text-gray-600 hover:text-primary-600'}`}>
                  {t.precisionEngines || 'Precision Engines'}
                </Link>
              </li>
              <li>
                <Link to="/#use-cases" className={`text-sm transition-colors flex items-center gap-2 w-fit ${theme === 'dark' ? 'text-gray-400 hover:text-primary-400' : 'text-gray-600 hover:text-primary-600'}`}>
                  {t.useCasesLink || 'Use Cases'}
                </Link>
              </li>
              <li>
                <Link to="/#pricing" className={`text-sm transition-colors flex items-center gap-2 w-fit ${theme === 'dark' ? 'text-gray-400 hover:text-primary-400' : 'text-gray-600 hover:text-primary-600'}`}>
                  {t.pricingLink || 'Pricing'}
                </Link>
              </li>
              <li>
                <Link to="/agentx" className={`text-sm transition-colors flex items-center gap-2 w-fit ${theme === 'dark' ? 'text-gray-400 hover:text-primary-400' : 'text-gray-600 hover:text-primary-600'}`}>
                  {t.agentxHubLink || 'AgentX Hub'}
                  <span className="text-[10px] bg-primary-500/20 text-primary-400 px-1.5 py-0.5 rounded border border-primary-500/20">{t.newBadge || 'NEW'}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className={`font-bold mb-6 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              <Shield className="w-4 h-4 text-brand-blue" />
              {t.companyTitle || 'Company'}
            </h3>
            <ul className="space-y-4">
              <li>
                <Link to="/contact" className={`text-sm transition-colors flex items-center gap-2 w-fit ${theme === 'dark' ? 'text-gray-400 hover:text-primary-400' : 'text-gray-600 hover:text-primary-600'}`}>
                  {t.contactUs || 'Contact Us'}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className={`text-sm transition-colors flex items-center gap-2 w-fit ${theme === 'dark' ? 'text-gray-400 hover:text-primary-400' : 'text-gray-600 hover:text-primary-600'}`}>
                  {t.privacyPolicy || 'Privacy Policy'}
                </Link>
              </li>
              <li>
                <Link to="/terms" className={`text-sm transition-colors flex items-center gap-2 w-fit ${theme === 'dark' ? 'text-gray-400 hover:text-primary-400' : 'text-gray-600 hover:text-primary-600'}`}>
                  {t.termsOfService || 'Terms of Service'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className={`font-bold mb-6 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              <Mail className="w-4 h-4 text-brand-blue" />
              {t.getInTouchTitle || 'Get in Touch'}
            </h3>
            <ul className="space-y-4">
              <li>
                <a href="mailto:info@obsolio.com" className="group flex items-start gap-3">
                  <div className="mt-1 p-1.5 rounded bg-primary-500/10 text-primary-400 group-hover:bg-primary-500/20 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className={`block text-sm transition-colors ${theme === 'dark' ? 'text-gray-300 group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900'}`}>{t.emailUs || 'Email Us'}</span>
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>info@obsolio.com</span>
                  </div>
                </a>
              </li>
              <li>
                <Link to="/contact" className="group flex items-start gap-3">
                  <div className="mt-1 p-1.5 rounded bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20 transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className={`block text-sm transition-colors ${theme === 'dark' ? 'text-gray-300 group-hover:text-white' : 'text-gray-700 group-hover:text-gray-900'}`}>{t.enterpriseSales || 'Enterprise Sales'}</span>
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>{t.bookDemo || 'Book a Demo'}</span>
                  </div>
                </Link>
              </li>
              <li>
                <div className="group flex items-start gap-3">
                  <div className="mt-1 p-1.5 rounded bg-blue-500/10 text-blue-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className={`block text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>{t.headquarters || 'Headquarters'}</span>
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>{t.location || 'Silicon Valley, CA'}</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 ${theme === 'dark' ? 'border-white/5' : 'border-gray-200'}`}>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-600'}`}>
            &copy; {currentYear} Obsolio Inc. {t.allRightsReserved || 'All rights reserved.'}
          </p>
          <div className="flex items-center gap-6">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className={`text-sm font-mono ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{t.systemsOperational || 'Systems Operational'}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
