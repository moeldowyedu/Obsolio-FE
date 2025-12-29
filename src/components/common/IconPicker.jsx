import React, { useState, useMemo } from 'react';
import * as LucideIcons from 'lucide-react';
import { Search, X, Check } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const IconPicker = ({ onSelect, selectedIcon, onClose }) => {
    const { theme } = useTheme();
    const [searchQuery, setSearchQuery] = useState('');

    // Get all valid icon names from LucideIcons
    const iconList = useMemo(() => {
        return Object.keys(LucideIcons)
            .filter((key) => {
                const exportItem = LucideIcons[key];
                // Filter out non-component exports
                // Must be a function (functional component) or an object with $$typeof (forwardRef)
                // Explicitly exclude known non-component exports like 'icons', 'createLucideIcon', 'default'
                return (
                    key !== 'createLucideIcon' &&
                    key !== 'default' &&
                    key !== 'icons' &&
                    isNaN(Number(key)) &&
                    (typeof exportItem === 'function' || (typeof exportItem === 'object' && exportItem?.$$typeof))
                );
            })
            .sort();
    }, []);

    // Filter icons based on search query
    const filteredIcons = useMemo(() => {
        if (!searchQuery) return iconList;
        const lowerQuery = searchQuery.toLowerCase();
        return iconList.filter((name) => name.toLowerCase().includes(lowerQuery));
    }, [searchQuery, iconList]);

    const handleSelectIcon = (iconName) => {
        // Generate the CDN URL for the selected icon
        // Using kebab-case for the URL which matches lucide-static conventions
        // Lucide component names are PascalCase (e.g., 'ArrowRight'), we need 'arrow-right'
        const kebabCaseName = iconName
            .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
            .toLowerCase();

        // Construct the unpkg URL
        const iconUrl = `https://unpkg.com/lucide-static@latest/icons/${kebabCaseName}.svg`;

        onSelect(iconUrl, iconName);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div
                className={`w-full max-w-4xl h-[80vh] flex flex-col rounded-2xl shadow-2xl overflow-hidden ${theme === 'dark' ? 'bg-[#1a1f2e] border border-white/10' : 'bg-white border border-slate-200'
                    }`}
            >
                {/* Header */}
                <div className={`p-4 border-b flex items-center justify-between ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'
                    }`}>
                    <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        Choose an Icon
                    </h3>
                    <button
                        onClick={onClose}
                        className={`p-2 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-slate-100 text-slate-500'
                            }`}
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Search Bar */}
                <div className={`p-4 border-b ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'}`}>
                    <div className="relative">
                        <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${theme === 'dark' ? 'text-gray-400' : 'text-slate-400'
                            }`} />
                        <input
                            type="text"
                            placeholder="Search icons (e.g., user, settings, cloud)..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className={`w-full pl-10 pr-4 py-3 rounded-lg border ${theme === 'dark'
                                ? 'bg-gray-800 border-white/10 text-white placeholder-gray-500'
                                : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                                } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                            autoFocus
                        />
                    </div>
                </div>

                {/* Icon Grid */}
                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
                        {filteredIcons.map((iconName) => {
                            const IconComponent = LucideIcons[iconName];

                            // Helper to check if this icon corresponds to the currently selected URL
                            // This is a rough check since we store URL not name, but good for UI feedback if strict
                            const isActive = false;

                            if (!IconComponent) return null;

                            return (
                                <button
                                    key={iconName}
                                    onClick={() => handleSelectIcon(iconName)}
                                    className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200 group ${isActive
                                        ? 'bg-purple-600 text-white shadow-lg scale-105'
                                        : theme === 'dark'
                                            ? 'bg-gray-800/50 hover:bg-purple-600/20 hover:text-purple-400 text-gray-400'
                                            : 'bg-slate-50 hover:bg-purple-50 hover:text-purple-600 text-slate-600'
                                        }`}
                                    title={iconName}
                                >
                                    <IconComponent className="w-6 h-6 mb-2" />
                                    <span className="text-[10px] truncate w-full text-center opacity-70 group-hover:opacity-100">
                                        {iconName}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {filteredIcons.length === 0 && (
                        <div className="flex flex-col items-center justify-center h-full text-center py-12">
                            <Search className={`w-12 h-12 mb-4 ${theme === 'dark' ? 'text-gray-600' : 'text-slate-300'}`} />
                            <p className={`text-lg font-medium ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                                No icons found for "{searchQuery}"
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className={`p-4 border-t text-xs text-center ${theme === 'dark' ? 'border-white/10 text-gray-500' : 'border-slate-200 text-slate-400'
                    }`}>
                    Icons provided by Lucide • Generates public CDN URLs
                </div>
            </div>
        </div>
    );
};

export default IconPicker;
