import { useState, useRef, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useTenantStore } from '../../store/tenantStore';
import { useBillingStore } from '../../store/billingStore';
import { useTheme } from '../../contexts/ThemeContext';
import { LogOut, ChevronDown, Check, Building2, User, Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DashboardHeader = () => {
    const { user, logout } = useAuthStore();
    const { tenants, currentTenant, setCurrentTenant } = useTenantStore();
    const { currentSubscription, fetchSubscription } = useBillingStore();
    const { theme } = useTheme();
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        // Ensure subscription/balance is loaded
        if (!currentSubscription) {
            fetchSubscription().catch(err => console.warn("Balance fetch limited", err));
        }
    }, [currentSubscription, fetchSubscription]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSwitchTenant = async (tenantId) => {
        try {
            await setCurrentTenant(tenantId);
            setIsOpen(false);
            // Optional: refresh page or navigate to ensure state is clean
            window.location.reload();
        } catch (error) {
            console.error("Failed to switch tenant", error);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/signin');
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    // Get display name
    const displayName = user?.name || user?.fullName || user?.full_name || 'User';
    const initial = displayName.charAt(0).toUpperCase();

    // Mock balance deduction/display logic if backend field differs
    const credits = currentSubscription?.credits || currentSubscription?.balance || 0;

    return (
        <div className="flex items-center justify-end mb-8 relative z-50 gap-4">

            {/* Balance Display */}
            <div className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border ${theme === 'dark'
                ? 'bg-[#1e293b]/50 border-white/10 text-gray-300'
                : 'bg-white border-slate-200 text-slate-600 shadow-sm'
                }`}>
                <Wallet size={16} className={theme === 'dark' ? 'text-brand-orange' : 'text-brand-orange'} />
                <span className="text-sm font-medium">{credits} Credits</span>
            </div>

            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`flex items-center gap-3 p-2 pr-4 rounded-full transition-all border ${theme === 'dark'
                        ? 'bg-[#1e293b]/50 border-white/10 hover:bg-[#1e293b]'
                        : 'bg-white border-slate-200 hover:bg-slate-50 shadow-sm'
                        }`}
                >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-blue to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-brand-blue/20">
                        {initial}
                    </div>
                    <div className="text-left hidden sm:block">
                        <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                            {displayName}
                        </p>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>
                            {currentTenant?.name || 'Select Workspace'}
                        </p>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ${theme === 'dark' ? 'text-gray-400' : 'text-slate-400'}`} />
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                    <div className={`absolute right-0 mt-2 w-72 rounded-xl shadow-2xl border p-2 animate-in fade-in zoom-in-95 duration-200 origin-top-right ${theme === 'dark'
                        ? 'bg-[#1e293b] border-white/10 text-white'
                        : 'bg-white border-slate-100 text-slate-800'
                        }`}>
                        <div className="px-3 py-2 border-b border-white/5 mb-2">
                            <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${theme === 'dark' ? 'text-gray-500' : 'text-slate-400'}`}>
                                Switch Workspace
                            </p>
                            <div className="space-y-1 max-h-60 overflow-y-auto custom-scrollbar">
                                {tenants.map((tenant) => (
                                    <button
                                        key={tenant.id}
                                        onClick={() => handleSwitchTenant(tenant.id)}
                                        className={`w-full flex items-center justify-between p-2 rounded-lg transition-colors ${currentTenant?.id === tenant.id
                                            ? (theme === 'dark' ? 'bg-brand-blue/10 text-brand-blue' : 'bg-brand-blue/10 text-brand-blue')
                                            : (theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-slate-50')
                                            }`}
                                    >
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <div className={`p-1.5 rounded-md ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-100'}`}>
                                                {tenant.type === 'ORGANIZATION' ? <Building2 size={14} /> : <User size={14} />}
                                            </div>
                                            <span className="truncate text-sm font-medium">{tenant.name}</span>
                                        </div>
                                        {currentTenant?.id === tenant.id && <Check size={14} />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={handleLogout}
                            className={`w-full flex items-center gap-2 p-2 rounded-lg text-sm font-medium transition-colors ${theme === 'dark'
                                ? 'text-red-400 hover:bg-red-400/10'
                                : 'text-red-600 hover:bg-red-50'
                                }`}
                        >
                            <LogOut size={16} />
                            Sign Out
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardHeader;
