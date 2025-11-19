import { useState } from 'react';
import { Card, Badge } from '../common';
import { INDUSTRIES, ENGINES } from '../../utils/constants';
import { Filter, X } from 'lucide-react';

const MarketplaceFilters = ({ filters, onFilterChange, onClearFilters }) => {
  const [isOpen, setIsOpen] = useState(false);

  const priceRanges = [
    { id: 'free', label: 'Free', min: 0, max: 0 },
    { id: 'under-50', label: 'Under $50', min: 0, max: 50 },
    { id: '50-100', label: '$50 - $100', min: 50, max: 100 },
    { id: 'over-100', label: 'Over $100', min: 100, max: 999999 },
  ];

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'featured', name: 'Featured' },
    { id: 'popular', name: 'Most Popular' },
    { id: 'new', name: 'New Arrivals' },
    ...INDUSTRIES,
  ];

  const handleCategoryChange = (categoryId) => {
    onFilterChange({ ...filters, category: categoryId });
  };

  const handleEngineToggle = (engineId) => {
    const currentEngines = filters.engines || [];
    const newEngines = currentEngines.includes(engineId)
      ? currentEngines.filter((id) => id !== engineId)
      : [...currentEngines, engineId];
    onFilterChange({ ...filters, engines: newEngines });
  };

  const handlePriceRangeChange = (rangeId) => {
    const range = priceRanges.find((r) => r.id === rangeId);
    onFilterChange({
      ...filters,
      priceRange: rangeId,
      minPrice: range.min,
      maxPrice: range.max,
    });
  };

  const activeFilterCount =
    (filters.category && filters.category !== 'all' ? 1 : 0) +
    (filters.engines?.length || 0) +
    (filters.priceRange ? 1 : 0);

  return (
    <div>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            <span className="font-medium">Filters</span>
            {activeFilterCount > 0 && (
              <Badge variant="primary" size="sm">
                {activeFilterCount}
              </Badge>
            )}
          </div>
          <span className="text-gray-500">{isOpen ? '▲' : '▼'}</span>
        </button>
      </div>

      {/* Filters Panel */}
      <div className={`space-y-6 ${isOpen ? 'block' : 'hidden lg:block'}`}>
        {/* Active Filters & Clear */}
        {activeFilterCount > 0 && (
          <Card padding="sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-secondary-700">
                {activeFilterCount} filter{activeFilterCount !== 1 ? 's' : ''} active
              </span>
              <button
                onClick={onClearFilters}
                className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1"
              >
                <X className="w-4 h-4" />
                Clear all
              </button>
            </div>
          </Card>
        )}

        {/* Categories */}
        <Card padding="md">
          <h3 className="font-semibold text-secondary-900 mb-3">Categories</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  filters.category === category.id
                    ? 'bg-primary-100 text-primary-700 font-medium'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </Card>

        {/* Engines */}
        <Card padding="md">
          <h3 className="font-semibold text-secondary-900 mb-3">AI Engines</h3>
          <div className="space-y-2">
            {ENGINES.map((engine) => (
              <label
                key={engine.id}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
              >
                <input
                  type="checkbox"
                  checked={filters.engines?.includes(engine.id) || false}
                  onChange={() => handleEngineToggle(engine.id)}
                  className="w-4 h-4 text-primary-600 rounded"
                />
                <div
                  className="w-3 h-3 rounded"
                  style={{ backgroundColor: engine.color }}
                />
                <span className="text-sm text-secondary-700">{engine.name}</span>
              </label>
            ))}
          </div>
        </Card>

        {/* Price Range */}
        <Card padding="md">
          <h3 className="font-semibold text-secondary-900 mb-3">Price</h3>
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <label
                key={range.id}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
              >
                <input
                  type="radio"
                  name="priceRange"
                  checked={filters.priceRange === range.id}
                  onChange={() => handlePriceRangeChange(range.id)}
                  className="w-4 h-4 text-primary-600"
                />
                <span className="text-sm text-secondary-700">{range.label}</span>
              </label>
            ))}
          </div>
        </Card>

        {/* Rating */}
        <Card padding="md">
          <h3 className="font-semibold text-secondary-900 mb-3">Rating</h3>
          <div className="space-y-2">
            {[5, 4, 3].map((rating) => (
              <label
                key={rating}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
              >
                <input
                  type="radio"
                  name="rating"
                  checked={filters.minRating === rating}
                  onChange={() =>
                    onFilterChange({ ...filters, minRating: rating })
                  }
                  className="w-4 h-4 text-primary-600"
                />
                <span className="text-sm text-secondary-700">
                  {rating}+ ⭐
                </span>
              </label>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MarketplaceFilters;
