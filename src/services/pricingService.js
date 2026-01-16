import api from './api';

const pricingService = {
    /**
     * Get all subscription plans
     * @returns {Promise} Object containing plans grouped by name
     */
    getPlans: async () => {
        try {
            // Per instructions: GET https://api.obsolio.com/api/v1/pricing/plans
            // The api instance base URL is usually /api/v1.
            const response = await api.get('/pricing/plans');
            if (response.data && response.data.success) {
                return response.data.data;
            }
            return {};
        } catch (error) {
            console.error('Error fetching pricing plans:', error);
            throw error;
        }
    }
};

export default pricingService;
