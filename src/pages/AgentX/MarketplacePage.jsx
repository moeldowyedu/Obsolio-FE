import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, TrendingUp, Grid3x3, List, ChevronDown, CheckCircle, AlertCircle, X } from 'lucide-react'; // Added icons
import MainLayout from '../../components/layout/MainLayout';
import AgentCard from '../../components/marketplace/AgentCard';
import marketplaceService from '../../services/marketplaceService';
import { useTheme } from '../../contexts/ThemeContext';
// import { toast } from 'react-hot-toast'; // Assuming you have toast
import Button from '../../components/common/Button/Button';
import Skeleton from '../../components/common/Skeleton/Skeleton'; // Assuming Skeleton exists

const MarketplacePage = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  // Data State
  const [agents, setAgents] = useState([]);
  const [featuredAgents, setFeaturedAgents] = useState([]);
  const [categories, setCategories] = useState([]); // Array of { name, count } or string
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination & Filters State
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('popular'); // 'popular', 'newest', 'price_asc', 'price_desc'

  // Fetch Initial Data (Featured & Categories)
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [featuredRes, categoriesRes] = await Promise.all([
          marketplaceService.getFeaturedAgents(),
          marketplaceService.getCategories()
        ]);

        if (featuredRes.success) {
          setFeaturedAgents(featuredRes.data || []);
        }

        // Handle Categories Response structure
        // Assuming response: { success: true, data: [ { name: 'Legal', count: 5 }, ... ] }
        if (categoriesRes.success) {
          setCategories(categoriesRes.data || []);
        }
      } catch (err) {
        console.error("Failed to load initial marketplace data:", err);
        // toast.error("Failed to load some marketplace data.");
      }
    };
    fetchInitialData();
  }, []);

  // Fetch Agents (Search, Filter, Pagination)
  const fetchAgents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        page: currentPage,
        per_page: itemsPerPage,
        q: searchQuery,
        sort: sortBy,
      };

      // If category selected, use getAgentsByCategory or filter params
      let response;
      if (selectedCategory !== 'all') {
        response = await marketplaceService.getAgentsByCategory(selectedCategory, params);
      } else {
        response = await marketplaceService.browseAgents(params);
      }

      if (response.success) {
        // Handle pagination structure
        // API Example: { data: { data: [...], current_page: 1, last_page: 5, total: 50 ... } }
        const result = response.data;
        setAgents(result.data || []);
        setTotalPages(result.last_page || Math.ceil((result.total || 0) / itemsPerPage) || 1);
        setTotalItems(result.total || 0);
      } else {
        setError("Failed to fetch agents.");
      }

    } catch (err) {
      console.error("Error fetching agents:", err);
      setError("Something went wrong while loading agents.");
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage, searchQuery, selectedCategory, sortBy]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchAgents();
    }, 500); // Debounce search
    return () => clearTimeout(timeoutId);
  }, [fetchAgents]);


  // Handlers
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <MainLayout showSidebar={true}>
      <div className={`min-h-screen pb-20 ${theme === 'dark' ? 'bg-[#0B0E14]' : 'bg-slate-50'}`}>

        {/* Hero / Featured Section */}
        {!searchQuery && selectedCategory === 'all' && currentPage === 1 && featuredAgents.length > 0 && (
          <div className={`border-b ${theme === 'dark' ? 'bg-[#0f172a]/50 border-white/10' : 'bg-white border-slate-200'}`}>
            <div className="max-w-[1600px] mx-auto px-6 py-12">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="text-amber-500 w-6 h-6" />
                <h2 className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Featured Agents</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredAgents.slice(0, 3).map(agent => (
                  <AgentCard key={agent.id} agent={agent} />
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="max-w-[1600px] mx-auto px-6 py-8">

          {/* Header & Controls */}
          <div className="flex flex-col xl:flex-row gap-6 justify-between items-start xl:items-center mb-8">
            <div>
              <h1 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Agent Marketplace</h1>
              <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'} mt-2`}>
                Discover, test, and deploy AI agents for your specific needs.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto">
              {/* Search */}
              <div className="relative flex-grow sm:flex-grow-0 sm:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search agents..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className={`w-full pl-10 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all ${theme === 'dark' ? 'bg-[#1e293b] border-gray-700 text-white placeholder-gray-500' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                />
              </div>

              {/* Category Filter Desktop */}
              <div className="hidden md:block min-w-[200px]">
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer appearance-none ${theme === 'dark' ? 'bg-[#1e293b] border-gray-700 text-white' : 'bg-white border-slate-200 text-slate-900'
                    }`}
                >
                  <option value="all">All Categories</option>
                  {categories.map((cat, idx) => (
                    <option key={idx} value={cat.name || cat}>{cat.name || cat}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Mobile Category Filter (if needed) */}
          {/* ... mobile filter implementation ... */}

          {/* Content Grid */}
          {loading ? (
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6`}>
              {[...Array(8)].map((_, i) => (
                <div key={i} className={`h-80 rounded-2xl animate-pulse ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-200'}`} />
              ))}
            </div>
          ) : error ? (
            <div className="py-20 text-center">
              <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Failed to load agents</h3>
              <p className="text-gray-500">{error}</p>
              <Button onClick={fetchAgents} className="mt-4" variant="outline">Try Again</Button>
            </div>
          ) : agents.length === 0 ? (
            <div className="py-20 text-center">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>No agents found</h3>
              <p className="text-gray-500">Try adjusting your search or filters.</p>
              <Button onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }} className="mt-4" variant="primary">Clear Filters</Button>
            </div>
          ) : (
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6`}>
              {agents.map(agent => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-12">
              <div className="flex items-center gap-2">
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-slate-500'}`}>Show:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className={`px-2 py-1 text-sm rounded-lg border focus:outline-none focus:ring-1 focus:ring-primary-500 cursor-pointer ${theme === 'dark'
                    ? 'bg-[#1e293b] border-white/10 text-white'
                    : 'bg-white border-slate-200 text-slate-700'
                    }`}
                >
                  <option value={8}>8</option>
                  <option value={12}>12</option>
                  <option value={24}>24</option>
                  <option value={48}>48</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${theme === 'dark' ? 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                >
                  Previous
                </button>
                <span className={`text-sm font-medium mx-2 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-600'}`}>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${theme === 'dark' ? 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default MarketplacePage;
