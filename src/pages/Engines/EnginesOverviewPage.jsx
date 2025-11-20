import { useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { EngineCard } from '../../components/engines';
import { Input } from '../../components/common';
import { ENGINES } from '../../utils/constants';
import { Search } from 'lucide-react';

const EnginesOverviewPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Get unique categories
  const categories = ['all', ...new Set(ENGINES.map((e) => e.category))];

  // Filter engines based on search and category
  const filteredEngines = ENGINES.filter((engine) => {
    const matchesSearch =
      engine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      engine.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || engine.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <MainLayout>
      <div className="py-6 space-y-8">
        {/* Header Section */}
        <div>
          <h1 className="text-4xl font-heading font-bold text-secondary-900 mb-2">
            Precision AI Engines
          </h1>
          <p className="text-lg text-secondary-600">
            7 powerful engines to build custom AI agents for any use case
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6 border border-primary-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-2xl">⚙️</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary-900">{ENGINES.length}</p>
                <p className="text-sm text-secondary-600">Precision Engines</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-xl p-6 border border-secondary-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-secondary-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-2xl">🎯</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary-900">
                  {ENGINES.reduce((sum, e) => sum + e.capabilities.length, 0)}
                </p>
                <p className="text-sm text-secondary-600">Total Capabilities</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-2xl">🚀</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary-900">Unlimited</p>
                <p className="text-sm text-secondary-600">Agent Combinations</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Input
              type="text"
              placeholder="Search engines by name or capability..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="w-5 h-5 text-gray-400" />}
              className="w-full"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-primary-300 hover:bg-primary-50'
                }`}
              >
                {category === 'all' ? 'All Categories' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Engines Grid */}
        <div>
          {filteredEngines.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEngines.map((engine, index) => (
                <EngineCard
                  key={engine.id}
                  engine={engine}
                  featured={index === 0}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">
                No engines found
              </h3>
              <p className="text-secondary-600">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl p-8 text-white">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-heading font-bold mb-3">
              Build Precision AI Agents
            </h2>
            <p className="text-primary-50 mb-6">
              Each engine provides specialized AI capabilities. Combine them to
              create powerful, custom agents tailored to your specific use case.
              From vision analysis to code optimization, we've got you covered.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => window.location.href = '/agentx/builder'}
                className="px-6 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Create Your First Agent →
              </button>
              <button
                onClick={() => window.location.href = '/agentx/marketplace'}
                className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-all"
              >
                Browse Marketplace
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default EnginesOverviewPage;
