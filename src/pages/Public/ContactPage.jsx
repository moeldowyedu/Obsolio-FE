import { useState } from 'react'
import {
    Mail, MapPin, Phone, Send, Globe, Shield,
    MessageSquare, Building, ArrowRight, CheckCircle
} from 'lucide-react'
import MainLayout from '../../components/layout/MainLayout'

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: 'General Inquiry',
        message: ''
    })
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
        <MainLayout>
            <div className="min-h-screen bg-[#05080f] text-white pt-24 pb-20 relative overflow-hidden">

                {/* Background Effects */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-500/10 rounded-full blur-[120px] animate-pulse"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[linear-gradient(rgba(5,8,15,0.8)_2px,transparent_2px),linear-gradient(90deg,rgba(5,8,15,0.8)_2px,transparent_2px)] bg-[size:4rem_4rem] opacity-20"></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">

                    {/* Header */}
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-sm font-medium mb-6 backdrop-blur-sm text-primary-400">
                            <Globe className="w-4 h-4" />
                            <span>Global Connectivity Node</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-purple-500">Sync</span>
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                            Whether you need enterprise-grade deployment or have a technical inquiry, our communication channels are open.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                        {/* Contact Information Cards */}
                        <div className="space-y-6">

                            {/* Card 1: Enterprise */}
                            <div className="glass-card p-8 group border-l-4 border-l-transparent hover:border-l-primary-500 transition-all duration-300">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-primary-500/10 rounded-xl text-primary-400 group-hover:scale-110 transition-transform">
                                        <Building className="w-6 h-6" />
                                    </div>
                                    <span className="text-xs font-bold bg-primary-500/20 text-primary-300 px-2 py-1 rounded">PRIORITY</span>
                                </div>
                                <h3 className="text-2xl font-bold mb-2 text-white">Enterprise Sales</h3>
                                <p className="text-gray-400 mb-6 text-sm">
                                    For high-volume deployments, custom engine training, and SLA contracts.
                                </p>
                                <div className="space-y-3">
                                    <a href="mailto:sales@obsolio.com" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                                        <Mail className="w-4 h-4 text-primary-500" />
                                        sales@obsolio.com
                                    </a>
                                    <div className="flex items-center gap-3 text-gray-300">
                                        <Phone className="w-4 h-4 text-primary-500" />
                                        +1 (555) 0123-4567
                                    </div>
                                </div>
                            </div>

                            {/* Card 2: General Support */}
                            <div className="glass-card p-8 group border-l-4 border-l-transparent hover:border-l-purple-500 transition-all duration-300">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400 group-hover:scale-110 transition-transform">
                                        <MessageSquare className="w-6 h-6" />
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold mb-2 text-white">Support & Inquiries</h3>
                                <p className="text-gray-400 mb-6 text-sm">
                                    Technical support, account monitoring, and general questions.
                                </p>
                                <div className="space-y-3">
                                    <a href="mailto:info@obsolio.com" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                                        <Mail className="w-4 h-4 text-purple-500" />
                                        info@obsolio.com
                                    </a>
                                    <div className="flex items-center gap-3 text-gray-300">
                                        <MapPin className="w-4 h-4 text-purple-500" />
                                        123 AI Blvd, Silicon Valley, CA
                                    </div>
                                </div>
                            </div>

                            {/* Security Note */}
                            <div className="p-6 bg-white/5 border border-white/5 rounded-2xl flex items-start gap-4">
                                <Shield className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                                <div>
                                    <h4 className="text-sm font-bold text-white mb-1">Secure Communication</h4>
                                    <p className="text-xs text-gray-500">
                                        All messages are encrypted end-to-end. We prioritize data privacy and security for all inquiries.
                                    </p>
                                </div>
                            </div>

                        </div>

                        {/* Contact Form */}
                        <div className="relative">
                            <div className="glass-card p-8 md:p-10 relative overflow-hidden">
                                {isSent ? (
                                    <div className="absolute inset-0 z-20 bg-[#0B0E14] flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
                                        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                                            <CheckCircle className="w-10 h-10 text-green-500" />
                                        </div>
                                        <h3 className="text-3xl font-bold text-white mb-2">Message Sent</h3>
                                        <p className="text-gray-400 mb-8">
                                            Transmission successful. Our agents will analyze your request and respond shortly.
                                        </p>
                                        <button
                                            onClick={() => setIsSent(false)}
                                            className="glass-btn hover:bg-white/10 text-white px-6 py-2"
                                        >
                                            Send Another Message
                                        </button>
                                    </div>
                                ) : null}

                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full blur-[60px] pointer-events-none"></div>

                                <h3 className="text-2xl font-bold text-white mb-8">Initialize Contact</h3>

                                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Full Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all placeholder:text-gray-600"
                                                placeholder="John Doe"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Business Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all placeholder:text-gray-600"
                                                placeholder="john@company.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Subject</label>
                                        <div className="relative">
                                            <select
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all appearance-none cursor-pointer"
                                            >
                                                <option className="bg-[#0B0E14]" value="General Inquiry">General Inquiry</option>
                                                <option className="bg-[#0B0E14]" value="Enterprise Sales">Enterprise Sales / Demo</option>
                                                <option className="bg-[#0B0E14]" value="Technical Support">Technical Support</option>
                                                <option className="bg-[#0B0E14]" value="Partnership">Partnership Proposal</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                                <ArrowRight className="w-4 h-4 rotate-90" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Message Details</label>
                                        <textarea
                                            name="message"
                                            required
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows="5"
                                            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all placeholder:text-gray-600 resize-none"
                                            placeholder="How can we assist you?"
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full glass-btn-primary py-4 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? 'Transmitting...' : 'Send Message'}
                                        {!isSubmitting && <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                                    </button>

                                    <p className="text-center text-xs text-gray-500 mt-4">
                                        By contacting us, you agree to our <a href="/terms" className="text-primary-400 hover:text-primary-300">Terms of Service</a>.
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
