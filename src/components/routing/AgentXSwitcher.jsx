import React from 'react';
import { useAuthStore } from '../../store/authStore';
import MarketplacePage from '../../pages/AgentX/MarketplacePage';
import PublicAgentCatalog from '../../pages/Public/PublicAgentCatalog';

const AgentXSwitcher = () => {
    const { isAuthenticated } = useAuthStore();

    if (isAuthenticated) {
        return <MarketplacePage />;
    }

    return <PublicAgentCatalog />;
};

export default AgentXSwitcher;
