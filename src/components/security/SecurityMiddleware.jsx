import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SecurityMiddleware = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // 1. Check for Impersonation Handover
        const params = new URLSearchParams(location.search);
        if (params.get('impersonating') === 'true') {
            localStorage.setItem('is_impersonating', 'true');
            // Remove the param from URL to clean it up
            params.delete('impersonating');
            params.delete('console_session'); // consume this if present

            navigate({
                pathname: location.pathname,
                search: params.toString()
            }, { replace: true });
        }
    }, [location, navigate]);

    return null; // Renders nothing, just handles logic
};

export default SecurityMiddleware;
