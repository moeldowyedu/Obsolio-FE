import { useState, useEffect } from 'react'
import {
    Mail, MapPin, Phone, Send, Globe, Shield,
    MessageSquare, Building, ArrowRight, CheckCircle
} from 'lucide-react'
import MainLayout from '../../components/layout/MainLayout'
import { useTheme } from '../../contexts/ThemeContext'
import { useAuthStore } from '../../store/authStore'

const ContactPage = () => {
    const { theme } = useTheme()
    const { user } = useAuthStore()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: 'General Inquiry',
        message: ''
    })

    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: user.name || user.fullName || user.full_name || '',
                email: user.email || ''
            }))
        }
    }, [user])
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSent, setIsSent] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false)
            setIsSent(true)
            setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' })
        }, 1500)
    }

    return (
        <MainLayout theme={theme}>
            <div className={`min-h-screen pt-24 pb-20 relative overflow-hidden transition-colors duration-300 ${theme === 'dark' ? 'bg-[#0B0E14] text-white' : 'bg-slate-50 text-slate-900'}`}>

                {/* Background Effects (Dark Mode Only) */}
                {theme === 'dark' && (
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-500/10 rounded-full blur-[120px] animate-pulse"></div>
                        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[linear-gradient(rgba(5,8,15,0.8)_2px,transparent_2px),linear-gradient(90deg,rgba(5,8,15,0.8)_2px,transparent_2px)] bg-[size:4rem_4rem] opacity-20"></div>
                    </div>
                )}

                <div className="max-w-7xl mx-auto px-6 relative z-10">

                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className={`inline-flex items-center gap-2 border px-4 py-1.5 rounded-full text-sm font-medium mb-6 backdrop-blur-sm ${theme === 'dark' ? 'bg-white/5 border-white/10 text-primary-400' : 'bg-white border-slate-200 text-primary-600 shadow-sm'}`}>
                            <Globe className="w-4 h-4" />
                            <span>Global Connectivity Node</span>
                        </div>
                        <h1 className={`text-4xl md:text-6xl font-bold mb-6 tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-purple-600">Sync</span>
                        </h1>
                        <p className={`text-xl max-w-2xl mx-auto leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                            Whether you need enterprise-grade deployment or have a technical inquiry, our communication channels are open.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                        {/* Contact Information Cards */}
                        <div className="space-y-6">

                            {/* Card 1: Enterprise */}
                            <div className={`p-8 group border-l-4 border-l-transparent hover:border-l-primary-500 transition-all duration-300 rounded-2xl ${theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-white shadow-sm hover:shadow-md border border-slate-100'}`}>
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-3 rounded-xl transition-transform group-hover:scale-110 ${theme === 'dark' ? 'bg-primary-500/10 text-primary-400' : 'bg-primary-50 text-primary-600'}`}>
                                        <Building className="w-6 h-6" />
                                    </div>
                                    <span className={`text-xs font-bold px-2 py-1 rounded ${theme === 'dark' ? 'bg-primary-500/20 text-primary-300' : 'bg-primary-100 text-primary-700'}`}>PRIORITY</span>
                                </div>
                                <h3 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Enterprise Sales</h3>
                                <p className={`mb-6 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                                    For high-volume deployments, custom engine training, and SLA contracts.
                                </p>
                                <div className="space-y-3">
                                    <a href="mailto:sales@obsolio.com" className={`flex items-center gap-3 transition-colors ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-slate-600 hover:text-primary-600'}`}>
                                        <Mail className="w-4 h-4 text-primary-500" />
                                        sales@obsolio.com
                                    </a>
                                    <div className={`flex items-center gap-3 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-600'}`}>
                                        <Phone className="w-4 h-4 text-primary-500" />
                                        +1 (555) 0123-4567
                                    </div>
                                </div>
                            </div>

                            {/* Card 2: General Support */}
                            <div className={`p-8 group border-l-4 border-l-transparent hover:border-l-purple-500 transition-all duration-300 rounded-2xl ${theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-white shadow-sm hover:shadow-md border border-slate-100'}`}>
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-3 rounded-xl transition-transform group-hover:scale-110 ${theme === 'dark' ? 'bg-purple-500/10 text-purple-400' : 'bg-purple-50 text-purple-600'}`}>
                                        <MessageSquare className="w-6 h-6" />
                                    </div>
                                </div>
                                <h3 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Support & Inquiries</h3>
                                <p className={`mb-6 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                                    Technical support, account monitoring, and general questions.
                                </p>
                                <div className="space-y-3">
                                    <a href="mailto:info@obsolio.com" className={`flex items-center gap-3 transition-colors ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-slate-600 hover:text-purple-600'}`}>
                                        <Mail className="w-4 h-4 text-purple-500" />
                                        info@obsolio.com
                                    </a>
                                    <div className={`flex items-center gap-3 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-600'}`}>
                                        <MapPin className="w-4 h-4 text-purple-500" />
                                        123 AI Blvd, Silicon Valley, CA
                                    </div>
                                </div>
                            </div>

                            {/* Security Note */}
                            <div className={`p-6 border rounded-2xl flex items-start gap-4 ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-blue-50 border-blue-100'}`}>
                                <Shield className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                                <div>
                                    <h4 className={`text-sm font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Secure Communication</h4>
                                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-slate-600'}`}>
                                        All messages are encrypted end-to-end. We prioritize data privacy and security for all inquiries.
                                    </p>
                                </div>
                            </div>

                        </div>

                        {/* Contact Form */}
                        <div className="relative">
                            <div className={`p-8 md:p-10 relative overflow-hidden rounded-3xl border ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-xl'}`}>
                                {isSent ? (
                                    <div className={`absolute inset-0 z-20 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500 ${theme === 'dark' ? 'bg-[#0B0E14]' : 'bg-white'}`}>
                                        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                                            <CheckCircle className="w-10 h-10 text-green-500" />
                                        </div>
                                        <h3 className={`text-3xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Message Sent</h3>
                                        <p className={`mb-8 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                                            Transmission successful. Our agents will analyze your request and respond shortly.
                                        </p>
                                        <button
                                            onClick={() => setIsSent(false)}
                                            className={`px-6 py-2 rounded-lg font-medium transition-colors ${theme === 'dark' ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-800'}`}
                                        >
                                            Send Another Message
                                        </button>
                                    </div>
                                ) : null}

                                {theme === 'dark' && (
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full blur-[60px] pointer-events-none"></div>
                                )}

                                <h3 className={`text-2xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Initialize Contact</h3>

                                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                    {!user && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className={`text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>Full Name</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    required
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className={`w-full rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all ${theme === 'dark' ? 'bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:border-primary-500/50' : 'bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-primary-500'}`}
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className={`text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>Business Email</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    required
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className={`w-full rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all ${theme === 'dark' ? 'bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:border-primary-500/50' : 'bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-primary-500'}`}
                                                    placeholder="john@company.com"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <div className="space-y-2">
                                        <label className={`text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>Subject</label>
                                        <div className="relative">
                                            <select
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                className={`w-full rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all appearance-none cursor-pointer ${theme === 'dark' ? 'bg-white/5 border border-white/10 text-white focus:border-primary-500/50' : 'bg-slate-50 border border-slate-200 text-slate-900 focus:border-primary-500'}`}
                                            >
                                                <option className={theme === 'dark' ? "bg-[#0B0E14]" : "bg-white"} value="General Inquiry">General Inquiry</option>
                                                <option className={theme === 'dark' ? "bg-[#0B0E14]" : "bg-white"} value="Enterprise Sales">Enterprise Sales / Demo</option>
                                                <option className={theme === 'dark' ? "bg-[#0B0E14]" : "bg-white"} value="Technical Support">Technical Support</option>
                                                <option className={theme === 'dark' ? "bg-[#0B0E14]" : "bg-white"} value="Partnership">Partnership Proposal</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                                <ArrowRight className="w-4 h-4 rotate-90" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className={`text-xs font-semibold uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>Message Details</label>
                                        <textarea
                                            name="message"
                                            required
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows="5"
                                            className={`w-full rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all resize-none ${theme === 'dark' ? 'bg-white/5 border border-white/10 text-white placeholder:text-gray-600 focus:border-primary-500/50' : 'bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-primary-500'}`}
                                            placeholder="How can we assist you?"
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-blue-500/30 text-white rounded-xl font-bold py-4 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                                    >
                                        {isSubmitting ? 'Transmitting...' : 'Send Message'}
                                        {!isSubmitting && <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                                    </button>

                                    <p className={`text-center text-xs mt-4 ${theme === 'dark' ? 'text-gray-500' : 'text-slate-500'}`}>
                                        By contacting us, you agree to our <a href="/terms" className="text-primary-500 hover:text-primary-400 font-medium">Terms of Service</a>.
                                    </p>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default ContactPage
