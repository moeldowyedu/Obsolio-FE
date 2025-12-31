import { useRef, useEffect, useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { LineChart, Stethoscope, Scale, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const UseCasesSection = () => {
    const { theme } = useTheme();
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    const cases = [
        {
            id: 1,
            title: "Finance",
            headline: "Automated Reporting",
            description: "Generate complex financial reports and audit trails in seconds not days.",
            icon: LineChart,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            border: "border-blue-500/20",
            delay: "0s"
        },
        {
            id: 2,
            title: "Healthcare",
            headline: "Patient Data Analysis",
            description: "Process clinical notes and extract key medical entities with HIPAA compliance.",
            icon: Stethoscope,
            color: "text-green-500",
            bg: "bg-green-500/10",
            border: "border-green-500/20",
            delay: "0.1s"
        },
        {
            id: 3,
            title: "Legal",
            headline: "Precedent Research",
            description: "Scan thousands of case files to find relevant legal precedents instantly.",
            icon: Scale,
            color: "text-amber-500",
            bg: "bg-amber-500/10",
            border: "border-amber-500/20",
            delay: "0.2s"
        },
        {
            id: 4,
            title: "Retail",
            headline: "Inventory Prediction",
            description: "Forecast demand and optimize stock levels using predictive AI models.",
            icon: ShoppingBag,
            color: "text-purple-500",
            bg: "bg-purple-500/10",
            border: "border-purple-500/20",
            delay: "0.3s"
        }
    ];

    return (
        <section
            ref={sectionRef}
            className={`py-24 px-6 relative overflow-hidden ${theme === 'dark' ? 'bg-[#0B0E14]' : 'bg-white'}`}
        >
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[120px] opacity-20 ${theme === 'dark' ? 'bg-gradient-to-r from-blue-900 to-purple-900' : 'bg-gradient-to-r from-blue-100 to-purple-100'}`}></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className={`text-center mb-16 transition-all duration-700 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 ${theme === 'dark' ? 'bg-white/5 text-gray-400 border border-white/10' : 'bg-slate-100 text-slate-500 border border-slate-200'}`}>
                        <span className="w-2 h-2 rounded-full bg-brand-orange"></span>
                        Real-World Applications
                    </div>
                    <h2 className={`text-3xl md:text-5xl font-bold mb-6 font-heading ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        Powerful Use Cases
                    </h2>
                    <p className={`text-xl max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                        Discover how Obsolio transforms operations across critical industries
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {cases.map((item) => (
                        <div
                            key={item.id}
                            className={`p-8 rounded-2xl border transition-all duration-500 group hover:-translate-y-2 hover:shadow-2xl ${theme === 'dark'
                                    ? 'bg-white/[0.03] border-white/10 hover:bg-white/[0.05] hover:border-white/20'
                                    : 'bg-white border-slate-100 shadow-lg hover:shadow-xl hover:border-slate-200'
                                } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
                            style={{ transitionDelay: item.delay }}
                        >
                            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${item.bg}`}>
                                <item.icon className={`w-7 h-7 ${item.color}`} />
                            </div>

                            <div className={`text-xs font-bold uppercase tracking-wider mb-2 ${item.color}`}>
                                {item.title}
                            </div>

                            <h3 className={`text-xl font-bold mb-3 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                                {item.headline}
                            </h3>

                            <p className={`text-sm mb-6 leading-relaxed ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                                {item.description}
                            </p>

                            <div className="flex items-center gap-2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300 text-brand-blue">
                                Learn more <ArrowRight className="w-4 h-4" />
                            </div>
                        </div>
                    ))}
                </div>

                <div className={`mt-16 text-center transition-all duration-700 delay-500 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <Link to="/use-cases" className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-colors ${theme === 'dark' ? 'text-gray-300 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}>
                        View all industries <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default UseCasesSection;
