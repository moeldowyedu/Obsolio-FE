import React, { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import {
    X,
    Save,
    Info,
    Layers,
    Image as ImageIcon,
    DollarSign,
    Settings,
    Code,
    CheckCircle,
    AlertCircle
} from 'lucide-react';
import IconPicker from '../common/IconPicker';

const AgentFormModal = ({ isOpen, onClose, onSubmit, initialData = null, categories = [], loading = false }) => {
    const { theme } = useTheme();
    const [activeTab, setActiveTab] = useState('general');
    const [showIconPicker, setShowIconPicker] = useState(false);
    const [errors, setErrors] = useState({});

    const defaultFormData = {
        name: '',
        slug: '',
        description: '',
        short_description: '',
        long_description: '',
        categories: [], // Array of UUIDs
        is_active: true,
        is_featured: false,
        version: '1.0.0',
        developer: '',
        website_url: '',
        documentation_url: '',
        icon_url: '',
        pricing_model: 'free',
        pricing_tier: 'free',
        hourly_rate: 0,
        monthly_price: 0,
        runtime_type: 'cloud',
        config_schema: '{}',
        capabilities: '{}',
        max_instances: 1,
        supported_languages: '["en"]',
        extra_configuration: '{}'
    };

    const [formData, setFormData] = useState(defaultFormData);

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                // Ensure proper deep copy and defaulting
                setFormData({
                    ...defaultFormData,
                    ...initialData,
                    config_schema: typeof initialData.config_schema === 'object' ? JSON.stringify(initialData.config_schema, null, 2) : (initialData.config_schema || '{}'),
                    capabilities: typeof initialData.capabilities === 'object' ? JSON.stringify(initialData.capabilities, null, 2) : (initialData.capabilities || '{}'),
                    supported_languages: typeof initialData.supported_languages === 'object' ? JSON.stringify(initialData.supported_languages) : (initialData.supported_languages || '["en"]'),
                    extra_configuration: typeof initialData.extra_configuration === 'object' ? JSON.stringify(initialData.extra_configuration, null, 2) : (initialData.extra_configuration || '{}'),
                    pricing_model: initialData.pricing_model || initialData.price_model || 'free'
                });
            } else {
                setFormData(defaultFormData);
            }
            setActiveTab('general');
            setErrors({});
        }
    }, [isOpen, initialData]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        // Basic frontend validation if needed
        onSubmit(formData);
    };

    const handleIconSelect = (url) => {
        setFormData(prev => ({ ...prev, icon_url: url }));
        setShowIconPicker(false);
    };

    const tabs = [
        { id: 'general', label: 'General', icon: Info },
        { id: 'media', label: 'Media', icon: ImageIcon },
        { id: 'details', label: 'Details', icon: Layers },
        { id: 'config', label: 'Config', icon: Settings },
        { id: 'pricing', label: 'Pricing', icon: DollarSign },
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'general':
                return (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>Name *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-slate-300'} focus:ring-2 focus:ring-purple-500`}
                                />
                            </div>
                            <div>
                                <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>Slug *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.slug}
                                    onChange={e => setFormData({ ...formData, slug: e.target.value })}
                                    className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-slate-300'} focus:ring-2 focus:ring-purple-500`}
                                />
                            </div>
                            <div>
                                <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>Developer</label>
                                <input
                                    type="text"
                                    value={formData.developer}
                                    onChange={e => setFormData({ ...formData, developer: e.target.value })}
                                    className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-slate-300'} focus:ring-2 focus:ring-purple-500`}
                                />
                            </div>
                            <div>
                                <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>Version</label>
                                <input
                                    type="text"
                                    value={formData.version}
                                    onChange={e => setFormData({ ...formData, version: e.target.value })}
                                    className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-slate-300'} focus:ring-2 focus:ring-purple-500`}
                                />
                            </div>
                        </div>

                        <div className="flex items-center space-x-6 pt-2">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.is_active}
                                    onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                    className="rounded text-purple-600 focus:ring-purple-500"
                                />
                                <span className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>Active</span>
                            </label>
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.is_featured}
                                    onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                                    className="rounded text-purple-600 focus:ring-purple-500"
                                />
                                <span className={theme === 'dark' ? 'text-white' : 'text-slate-900'}>Featured</span>
                            </label>
                        </div>
                    </div>
                );
            case 'media':
                return (
                    <div className="space-y-4">
                        <div>
                            <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>Icon</label>
                            <div className="flex items-center space-x-4">
                                <div className={`w-16 h-16 rounded-xl overflow-hidden border flex-shrink-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center`}>
                                    {formData.icon_url ? (
                                        <img src={formData.icon_url} alt="Icon" className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-xs text-gray-400">No Icon</span>
                                    )}
                                </div>
                                <div className="flex-1 space-y-2">
                                    <div className="flex space-x-2">
                                        <input
                                            type="text"
                                            placeholder="Icon URL..."
                                            value={formData.icon_url}
                                            onChange={e => setFormData({ ...formData, icon_url: e.target.value })}
                                            className={`flex-1 px-4 py-2 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-slate-300'} focus:ring-2 focus:ring-purple-500`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowIconPicker(true)}
                                            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                                        >
                                            Browse
                                        </button>
                                    </div>
                                    <p className="text-xs text-gray-500">Recommended size: 512x512px (PNG/JPG)</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>Website URL</label>
                            <input
                                type="url"
                                value={formData.website_url}
                                onChange={e => setFormData({ ...formData, website_url: e.target.value })}
                                className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-slate-300'} focus:ring-2 focus:ring-purple-500`}
                            />
                        </div>
                        <div>
                            <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>Documentation URL</label>
                            <input
                                type="url"
                                value={formData.documentation_url}
                                onChange={e => setFormData({ ...formData, documentation_url: e.target.value })}
                                className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-slate-300'} focus:ring-2 focus:ring-purple-500`}
                            />
                        </div>
                    </div>
                );
            case 'details':
                return (
                    <div className="space-y-4">
                        <div>
                            <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>Short Description</label>
                            <input
                                type="text"
                                value={formData.short_description}
                                maxLength={150}
                                onChange={e => setFormData({ ...formData, short_description: e.target.value })}
                                className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-slate-300'} focus:ring-2 focus:ring-purple-500`}
                            />
                            <p className="text-xs text-right text-gray-500 mt-1">{formData.short_description.length}/150</p>
                        </div>
                        <div>
                            <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>Long Description</label>
                            <textarea
                                rows={6}
                                value={formData.long_description}
                                onChange={e => setFormData({ ...formData, long_description: e.target.value })}
                                className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-slate-300'} focus:ring-2 focus:ring-purple-500`}
                            />
                        </div>
                        <div>
                            <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>Categories</label>
                            <div className={`p-4 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-slate-300'}`}>
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {formData.categories.map(catId => {
                                        const cat = categories.find(c => c.id === catId);
                                        return (
                                            <span key={catId} className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 border border-purple-200 dark:border-purple-700">
                                                {cat ? cat.name : 'Unknown'}
                                                <button
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, categories: formData.categories.filter(id => id !== catId) })}
                                                    className="ml-1.5 hover:text-purple-600 dark:hover:text-purple-200"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </span>
                                        );
                                    })}
                                </div>
                                <select
                                    value=""
                                    onChange={(e) => {
                                        if (e.target.value && !formData.categories.includes(e.target.value)) {
                                            setFormData({ ...formData, categories: [...formData.categories, e.target.value] });
                                        }
                                    }}
                                    className={`w-full bg-transparent border-0 border-b border-gray-200 dark:border-gray-700 focus:ring-0 px-0 py-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}
                                >
                                    <option value="">+ Add category</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.id} disabled={formData.categories.includes(cat.id)}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                );
            case 'config':
                return (
                    <div className="space-y-4">
                        {[
                            { label: 'Supported Languages (JSON Array)', key: 'supported_languages', rows: 2 },
                            { label: 'Config Schema (JSON)', key: 'config_schema', rows: 6 },
                            { label: 'Capabilities (JSON)', key: 'capabilities', rows: 4 },
                            { label: 'Extra Configuration (JSON)', key: 'extra_configuration', rows: 4 },
                        ].map(field => (
                            <div key={field.key}>
                                <label className={`block text-xs font-medium mb-1 uppercase tracking-wider ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>{field.label}</label>
                                <div className="relative">
                                    <Code className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                    <textarea
                                        rows={field.rows}
                                        value={formData[field.key]}
                                        onChange={e => setFormData({ ...formData, [field.key]: e.target.value })}
                                        className={`w-full pl-10 pr-4 py-2 rounded-lg border font-mono text-sm ${theme === 'dark' ? 'bg-gray-900 border-gray-700 text-gray-300' : 'bg-gray-50 border-slate-300 text-slate-800'} focus:ring-2 focus:ring-purple-500`}
                                        spellCheck="false"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case 'pricing':
                return (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>Pricing Model</label>
                                <select
                                    value={formData.pricing_model}
                                    onChange={e => setFormData({ ...formData, pricing_model: e.target.value })}
                                    className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-slate-300'} focus:ring-2 focus:ring-purple-500`}
                                >
                                    <option value="free">Free</option>
                                    <option value="flat_rate">Flat Rate</option>
                                    <option value="usage_based">Usage Based</option>
                                    {/* Deprecated/Mapped: <option value="subscription">Subscription</option> */}
                                </select>
                            </div>
                            <div>
                                <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>Monthly Price ($)</label>
                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={formData.monthly_price}
                                    onChange={e => setFormData({ ...formData, monthly_price: parseFloat(e.target.value) })}
                                    className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-slate-300'} focus:ring-2 focus:ring-purple-500`}
                                />
                            </div>
                            <div>
                                <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>Hourly Rate ($)</label>
                                <input
                                    type="number"
                                    min="0"
                                    step="0.001"
                                    value={formData.hourly_rate}
                                    onChange={e => setFormData({ ...formData, hourly_rate: parseFloat(e.target.value) })}
                                    className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-slate-300'} focus:ring-2 focus:ring-purple-500`}
                                />
                            </div>
                            <div>
                                <label className={`block text-sm font-medium mb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-700'}`}>Runtime Type</label>
                                <select
                                    value={formData.runtime_type}
                                    onChange={e => setFormData({ ...formData, runtime_type: e.target.value })}
                                    className={`w-full px-4 py-2 rounded-lg border ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-slate-300'} focus:ring-2 focus:ring-purple-500`}
                                >
                                    <option value="cloud">Cloud</option>
                                    <option value="edge">Edge</option>
                                    <option value="hybrid">Hybrid</option>
                                </select>
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <IconPicker
                isOpen={showIconPicker}
                onClose={() => setShowIconPicker(false)}
                onSelect={handleIconSelect}
            />

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <div className={`w-full max-w-5xl h-[90vh] rounded-2xl shadow-xl flex flex-col ${theme === 'dark' ? 'bg-gray-900 border border-gray-800' : 'bg-white'}`}>

                    {/* Header */}
                    <div className={`p-6 border-b flex justify-between items-center ${theme === 'dark' ? 'border-gray-800' : 'border-slate-100'}`}>
                        <div>
                            <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                                {initialData ? 'Edit Agent' : 'Create New Agent'}
                            </h2>
                            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                                Configure your agent settings
                            </p>
                        </div>
                        <button onClick={onClose} className={`p-2 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-slate-100 text-slate-500'}`}>
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content Layout */}
                    <div className="flex-1 flex overflow-hidden">
                        {/* Sidebar / Tabs */}
                        <div className={`w-64 border-r overflow-y-auto ${theme === 'dark' ? 'bg-gray-900/50 border-gray-800' : 'bg-slate-50 border-slate-100'}`}>
                            <nav className="p-4 space-y-2">
                                {tabs.map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id
                                            ? 'bg-purple-600 text-white shadow-md'
                                            : `${theme === 'dark' ? 'text-gray-400 hover:bg-gray-800' : 'text-slate-600 hover:bg-slate-100'}`
                                            }`}
                                    >
                                        <tab.icon className="w-5 h-5" />
                                        <span>{tab.label}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Main Content Area */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {renderTabContent()}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className={`p-6 border-t flex justify-end items-center space-x-4 ${theme === 'dark' ? 'border-gray-800 bg-gray-900' : 'border-slate-100 bg-white'}`}>
                        <button onClick={onClose} className={`px-4 py-2 rounded-lg font-medium transition-colors ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}>
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={loading}
                            className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 shadow-lg shadow-purple-600/20 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <Save className="w-5 h-5" />
                            )}
                            <span>{initialData ? 'Update Agent' : 'Create Agent'}</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AgentFormModal;
