import { Link } from 'react-router-dom';
import { BookOpen, Plus, Layers, ArrowRight } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const ActionCards = () => {
    const { theme } = useTheme();

    const cards = [
        {
            title: "Documentation",
            description: "Learn how to build and deploy agents.",
            icon: <BookOpen className="w-6 h-6 text-blue-500" />,
            action: "Read Docs",
            href: "/docs",
            color: "blue"
        },
        {
            title: "New Workflow",
            description: "Start from scratch with a blank canvas.",
            icon: <Plus className="w-8 h-8 text-white/80 group-hover:text-white" />,
            action: "Create",
            href: "/orchestration/builder",
            color: "primary",
            isPrimary: true
        },
        {
            title: "Ready Workflows",
            description: "Explore pre-built templates and workflows.",
            icon: <Layers className="w-6 h-6 text-purple-500" />,
            action: "Browse",
            href: "/orchestration/workflows",
            color: "purple"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto px-4">
            {cards.map((card, index) => (
                <Link
                    key={index}
                    to={card.href}
                    className={`group relative overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${card.isPrimary
                        ? 'border-2 border-dashed border-gray-300 dark:border-white/20 hover:border-brand-blue dark:hover:border-brand-blue bg-transparent hover:bg-brand-blue/5'
                        : theme === 'dark'
                            ? 'bg-[#1e293b] border border-white/5 hover:border-white/10'
                            : 'bg-white border border-slate-200 hover:border-slate-300'
                        }`}
                >
                    <div className="p-6 h-full flex flex-col items-center text-center justify-between min-h-[220px]">

                        {/* Icon Container */}
                        <div className={`mb-4 w-16 h-16 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${card.isPrimary
                            ? 'bg-gradient-to-tr from-brand-blue to-purple-600 shadow-lg shadow-brand-blue/20'
                            : theme === 'dark' ? 'bg-white/5' : 'bg-slate-50'
                            }`}>
                            {card.icon}
                        </div>

                        <div>
                            <h3 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                                {card.title}
                            </h3>
                            <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                                {card.description}
                            </p>
                        </div>

                        {/* Action Link/Fake Button */}
                        <div className={`flex items-center gap-2 text-sm font-semibold transition-colors ${card.color === 'primary' ? 'text-brand-blue' :
                            card.color === 'purple' ? 'text-purple-500' : 'text-blue-500'
                            }`}>
                            {card.action}
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default ActionCards;
