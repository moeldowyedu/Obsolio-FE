import { useState } from 'react';
import Card from '../common/Card/Card';
import Badge from '../common/Badge/Badge';

const MarketplaceFilters = ({ filters, onFilterChange, activeFilters }) => {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    industry: true,
    pricing: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFilterToggle = (filterType, value) => {
    const currentFilters = activeFilters[filterType] || [];
    const newFilters = currentFilters.includes(value)
      ? currentFilters.filter(f => f !== value)
      : [...currentFilters, value];

    onFilterChange({
      ...activeFilters,
      [filterType]: newFilters
    });
  };

  const clearFilters = () => {
    onFilterChange({});
  };

  const FilterSection = ({ title, items, filterType }) => (
    <div className="mb-6">
      <button
        onClick={() => toggleSection(filterType)}
        className="flex items-center justify-between w-full mb-3"
      >
        <h3 className="text-sm font-semibold text-secondary-900">{title}</h3>
        <svg
          className={`w-4 h-4 transition-transform ${expandedSections[filterType] ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {expandedSections[filterType] && (
        <div className="space-y-2">
          {items.map((item) => {
            const isActive = (activeFilters[filterType] || []).includes(item.value);
            return (
              <label key={item.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={() => handleFilterToggle(filterType, item.value)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-secondary-700">{item.label}</span>
                {item.count !== undefined && (
                  <span className="text-xs text-gray-500">({item.count})</span>
                )}
              </label>
            );
          })}
        </div>
      )}
    </div>
  );

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-secondary-900">Filters</h2>
        {Object.keys(activeFilters).length > 0 && (
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Clear all
          </button>
        )}
      </div>

      <FilterSection
        title="Category"
        items={filters.categories || []}
        filterType="category"
      />

      <FilterSection
        title="Industry"
        items={filters.industries || []}
        filterType="industry"
      />

      <FilterSection
        title="Pricing"
        items={filters.pricing || []}
        filterType="pricing"
      />
    </Card>
  );
};

export default MarketplaceFilters;
