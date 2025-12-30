import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Sparkles, Command } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const ChatLauncher = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const { theme } = useTheme();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        // Navigate to chat page with the query
        // Assuming ChatPage handles state via location state or URL params
        navigate('/chat', { state: { initialQuery: query } });
    };

    return (
        <div className="w-full max-w-3xl mx-auto text-center transform transition-all duration-500 hover:scale-[1.01]">
            <h1 className={`text-4xl md:text-5xl font-bold mb-8 tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                What would you like to <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-purple-600">build</span> today?
            </h1>

            <form onSubmit={handleSubmit} className="relative group z-20">
                <div className={`absolute inset-0 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 ${theme === 'dark' ? 'bg-gradient-to-r from-brand-blue to-purple-600' : 'bg-gradient-to-r from-blue-200 to-purple-200'
                    }`}></div>

                <div className={`relative flex items-center p-2 rounded-2xl border shadow-2xl transition-all duration-300 ${theme === 'dark'
                        ? 'bg-[#1e293b] border-white/10 group-hover:border-white/20'
                        : 'bg-white border-slate-200 group-hover:border-brand-blue/30'
                    }`}>
                    <div className={`p-4 ${theme === 'dark' ? 'text-brand-blue' : 'text-brand-blue'}`}>
                        <Sparkles size={24} />
                    </div>

                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Describe a workflow, ask a question, or launch an agent..."
                        className={`w-full bg-transparent border-none focus:ring-0 text-lg md:text-xl placeholder-opacity-50 ${theme === 'dark'
                                ? 'text-white placeholder-gray-500'
                                : 'text-slate-900 placeholder-slate-400'
                            }`}
                        autoFocus
                    />

                    <button
                        type="submit"
                        disabled={!query.trim()}
                        className={`p-3 rounded-xl transition-all duration-200 ${query.trim()
                                ? 'bg-brand-blue text-white shadow-lg hover:bg-brand-blue/90 transform hover:scale-105'
                                : (theme === 'dark' ? 'bg-white/5 text-gray-600' : 'bg-slate-100 text-slate-300')
                            }`}
                    >
                        <Send size={20} className={query.trim() ? 'ml-0.5' : ''} />
                    </button>

                    {/* Command Hint */}
                    {/* <div className={`absolute right-16 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-1 text-xs px-2 py-1 rounded border ${
                        theme === 'dark' ? 'border-white/10 text-gray-500' : 'border-slate-200 text-slate-400'
                    }`}>
                        <Command size={10} />
                        <span>K</span>
                    </div> */}
                </div>
            </form>

            <div className={`mt-6 flex flex-wrap justify-center gap-3 text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-slate-500'}`}>
                <span className="opacity-70">Try asking:</span>
                <button
                    onClick={() => setQuery("Create a customer support agent")}
                    className={`px-3 py-1 rounded-full border transition-colors ${theme === 'dark'
                            ? 'border-white/10 hover:bg-white/5 hover:text-gray-300'
                            : 'border-slate-200 hover:bg-slate-50 hover:text-slate-700'
                        }`}
                >
                    "Create a customer support agent"
                </button>
                <button
                    onClick={() => setQuery("Analyze last month's sales")}
                    className={`px-3 py-1 rounded-full border transition-colors ${theme === 'dark'
                            ? 'border-white/10 hover:bg-white/5 hover:text-gray-300'
                            : 'border-slate-200 hover:bg-slate-50 hover:text-slate-700'
                        }`}
                >
                    "Analyze last month's sales"
                </button>
            </div>
        </div>
    );
};

export default ChatLauncher;
