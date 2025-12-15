import { Link } from 'react-router-dom'
import {
  Github, Twitter, Linkedin, Mail, MapPin, Phone,
  ExternalLink, Shield, FileText, Activity
} from 'lucide-react'
import ObsolioLogo from '../../assets/imgs/OBSOLIO-logo-cyan.png'
import { useLanguage } from '../../contexts/LanguageContext'
import { translations } from '../../translations'

const Footer = () => {
  const { language } = useLanguage()
  const t = translations[language]
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative mt-20 border-t border-white/5 bg-[#05080f] overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary-500/50 to-transparent"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-900/10 via-[#05080f] to-[#05080f] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-primary-500/20 blur-lg rounded-full group-hover:bg-primary-500/30 transition-all duration-500"></div>
                <img src={ObsolioLogo} alt="Obsolio" className="h-12 w-auto relative z-10" />
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              {t.footerTagline || 'The Precision AI Agent Platform.'}
              <br />
              {t.footerDescription || 'Deploy autonomous agents for high-fidelity tasks with Human-in-the-Loop oversight.'}
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all group">
                <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all group">
                <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all group">
                <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary-500" />
              {t.productTitle || 'Product'}
            </h3>
            <ul className="space-y-4">
              <li>
                <Link to="/#features" className="text-gray-400 hover:text-primary-400 text-sm transition-colors flex items-center gap-2 w-fit">
                  {t.precisionEngines || 'Precision Engines'}
                </Link>
              </li>
              <li>
                <Link to="/#use-cases" className="text-gray-400 hover:text-primary-400 text-sm transition-colors flex items-center gap-2 w-fit">
                  {t.useCasesLink || 'Use Cases'}
                </Link>
              </li>
              <li>
                <Link to="/#pricing" className="text-gray-400 hover:text-primary-400 text-sm transition-colors flex items-center gap-2 w-fit">
                  {t.pricingLink || 'Pricing'}
                </Link>
              </li>
              <li>
                <Link to="/agentx" className="text-gray-400 hover:text-primary-400 text-sm transition-colors flex items-center gap-2 w-fit">
                  {t.agentxHubLink || 'AgentX Hub'}
                  <span className="text-[10px] bg-primary-500/20 text-primary-400 px-1.5 py-0.5 rounded border border-primary-500/20">{t.newBadge || 'NEW'}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary-500" />
              {t.companyTitle || 'Company'}
            </h3>
            <ul className="space-y-4">
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-primary-400 text-sm transition-colors flex items-center gap-2 w-fit">
                  {t.contactUs || 'Contact Us'}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-primary-400 text-sm transition-colors flex items-center gap-2 w-fit">
                  {t.privacyPolicy || 'Privacy Policy'}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-primary-400 text-sm transition-colors flex items-center gap-2 w-fit">
                  {t.termsOfService || 'Terms of Service'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold mb-6 flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary-500" />
              {t.getInTouchTitle || 'Get in Touch'}
            </h3>
            <ul className="space-y-4">
              <li>
                <a href="mailto:info@obsolio.com" className="group flex items-start gap-3">
                  <div className="mt-1 p-1.5 rounded bg-primary-500/10 text-primary-400 group-hover:bg-primary-500/20 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-sm text-gray-300 group-hover:text-white transition-colors">{t.emailUs || 'Email Us'}</span>
                    <span className="text-sm text-gray-500">info@obsolio.com</span>
                  </div>
                </a>
              </li>
              <li>
                <Link to="/contact" className="group flex items-start gap-3">
                  <div className="mt-1 p-1.5 rounded bg-purple-500/10 text-purple-400 group-hover:bg-purple-500/20 transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-sm text-gray-300 group-hover:text-white transition-colors">{t.enterpriseSales || 'Enterprise Sales'}</span>
                    <span className="text-sm text-gray-500">{t.bookDemo || 'Book a Demo'}</span>
                  </div>
                </Link>
              </li>
              <li>
                <div className="group flex items-start gap-3">
                  <div className="mt-1 p-1.5 rounded bg-blue-500/10 text-blue-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-sm text-gray-300">{t.headquarters || 'Headquarters'}</span>
                    <span className="text-sm text-gray-500">{t.location || 'Silicon Valley, CA'}</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} Obsolio Inc. {t.allRightsReserved || 'All rights reserved.'}
          </p>
          <div className="flex items-center gap-6">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-sm text-gray-400 font-mono">{t.systemsOperational || 'Systems Operational'}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
