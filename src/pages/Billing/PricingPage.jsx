import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import PlanCard from '../../components/billing/PlanCard';
import { getPlans } from '../../services/subscriptionsService';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuthStore } from '../../store/authStore';

const PricingPage = () => {
    const { theme } = useTheme();
    const { user } = useAuthStore();

    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isAnnual, setIsAnnual] = useState(true); // Default to Annual
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                setLoading(true);
                // Using the service we just updated
                const data = await getPlans();
                if (data.success || Array.isArray(data)) {
                    // Handle both structure types just in case
                    setPlans(data.data || data);
                } else {
                    console.error("Unexpected API structure:", data);
                }
            } catch (err) {
                console.error("Failed to fetch plans:", err);
                setError("Failed to load pricing plans. Please try again later.");
                // Fallback for dev/demo if API fails
                setPlans([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPlans();
    }, []);

    const handleSubscribe = (plan) => {
        console.log("Subscribing to:", plan.name, isAnnual ? "Annual" : "Monthly");
        // Implement subscription logic here (redirect to checkout or open modal)
        alert(`Starting subscription flow for ${plan.name} (${isAnnual ? 'Annual' : 'Monthly'})`);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <MainLayout>
            <div className={`min-h-screen py-20 px-4 sm:px-6 lg:px-8 ${theme === 'dark' ? 'bg-[#0B0E14]' : 'bg-slate-50'}`}>

                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`text-4xl md:text-5xl font-extrabold mb-6 tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}
                    >
                        Choose the perfect plan for your business
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className={`text-xl ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}
                    >
                        Scalable solutions for teams of all sizes. Unlock the full potential of your AI workforce.
                    </motion.p>

                    {/* Billing Toggle */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center justify-center mt-8 gap-4"
                    >
                        <span className={`text-sm font-medium ${!isAnnual ? (theme === 'dark' ? 'text-white' : 'text-slate-900') : (theme === 'dark' ? 'text-gray-500' : 'text-slate-500')}`}>
                            Monthly
                        </span>
                        <button
                            onClick={() => setIsAnnual(!isAnnual)}
                            className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${isAnnual ? 'bg-primary-600' : 'bg-gray-400'
                                }`}
                        >
                            <span
                                className={`${isAnnual ? 'translate-x-7' : 'translate-x-1'
                                    } inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-200 ease-in-out`}
                            />
                        </button>
                        <span className={`text-sm font-medium ${isAnnual ? (theme === 'dark' ? 'text-white' : 'text-slate-900') : (theme === 'dark' ? 'text-gray-500' : 'text-slate-500')}`}>
                            Annual <span className="text-green-500 text-xs ml-1 font-bold">(Save 20%)</span>
                        </span>
                    </motion.div>
                </div>

                {/* Plans Grid */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
                    </div>
                ) : error ? (
                    <div className="text-center py-20">
                        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                        <p className="text-red-500">{error}</p>
                    </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 max-w-7xl mx-auto"
                    >
                        {plans.map((plan) => (
                            <PlanCard
                                key={plan.id}
                                plan={plan}
                                isAnnual={isAnnual}
                                onSubscribe={handleSubscribe}
                                isCurrentPlan={user?.subscription?.planId === plan.id} // Example logic
                                isPopular={plan.tier === 'pro'} // Example logic: highlight 'pro' tier
                            />
                        ))}
                    </motion.div>
                )}

                {/* Enterprise CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`mt-20 max-w-4xl mx-auto rounded-3xl p-8 md:p-12 text-center border ${theme === 'dark'
                            ? 'bg-gradient-to-b from-[#1e293b] to-[#0B0E14] border-white/10'
                            : 'bg-gradient-to-b from-white to-slate-50 border-slate-200 shadow-xl'
                        }`}
                >
                    <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        Need a custom solution for your large organization?
                    </h2>
                    <p className={`mb-8 max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-400' : 'text-slate-600'}`}>
                        Contact our sales team for enterprise-grade features, dedicated support, and custom SLAs tailored to your specific needs.
                    </p>
                    <button className="px-8 py-3 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg">
                        Contact Sales
                    </button>
                </motion.div>

            </div>
        </MainLayout>
    );
};

export default PricingPage;
