import { Search, Filter, X } from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';

/**
 * TenantFilters Component
 * Search and filter controls for tenant list
 * Based on FRONTEND_TENANT_MANAGEMENT.md specification
 */
const TenantFilters = ({ filters, onFilterChange, onClearFilters, plans = [] }) => {
  const { theme } = useTheme();

  const statusOptions = [
    { value: '', label: 'All Statuses' },
    { value: 'active', label: 'Active' },
    { value: 'trial', label: 'Trial' },
    { value: 'suspended', label: 'Suspended' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'pending_verification', label: 'Pending' },
  ];

  const typeOptions = [
    { value: '', label: 'All Types' },
    { value: 'organization', label: 'Organization' },
    { value: 'personal', label: 'Personal' },
  ];

  const sortByOptions = [
    { value: 'created_at', label: 'Created Date' },
    { value: 'name', label: 'Name' },
    { value: 'subdomain', label: 'Subdomain' },
  ];

  const sortOrderOptions = [
    { value: 'desc', label: 'Descending' },
    { value: 'asc', label: 'Ascending' },
  ];

  const inputClass = `px-4 py-2 rounded-lg border transition-colors ${
    theme === 'dark'
      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-purple-500'
      : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-purple-600'
  } focus:outline-none focus:ring-2 focus:ring-purple-500/20`;

  const selectClass = `px-4 py-2 rounded-lg border transition-colors ${
    theme === 'dark'
      ? 'bg-gray-800 border-gray-700 text-white focus:border-purple-500'
      : 'bg-white border-slate-300 text-slate-900 focus:border-purple-600'
  } focus:outline-none focus:ring-2 focus:ring-purple-500/20`;

  const hasActiveFilters =
    filters.search || filters.status || filters.plan_id || filters.type;

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search
          className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${
            theme === 'dark' ? 'text-gray-500' : 'text-slate-400'
          }`}
        />
        <input
          type="text"
          placeholder="Search by name, email, domain..."
          value={filters.search || ''}
          onChange={(e) => onFilterChange({ search: e.target.value })}
          className={`${inputClass} pl-10 w-full`}
        />
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap gap-3 items-center">
        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <Filter
            className={`w-4 h-4 ${
              theme === 'dark' ? 'text-gray-400' : 'text-slate-500'
            }`}
          />
          <select
            value={filters.status || ''}
            onChange={(e) => onFilterChange({ status: e.target.value || null })}
            className={selectClass}
          >
            {statusOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Plan Filter */}
        <select
          value={filters.plan_id || ''}
          onChange={(e) => onFilterChange({ plan_id: e.target.value || null })}
          className={selectClass}
        >
          <option
            value=""
            className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
          >
            All Plans
          </option>
          {plans.map((plan) => (
            <option
              key={plan.id}
              value={plan.id}
              className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
            >
              {plan.name}
            </option>
          ))}
        </select>

        {/* Type Filter */}
        <select
          value={filters.type || ''}
          onChange={(e) => onFilterChange({ type: e.target.value || null })}
          className={selectClass}
        >
          {typeOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
            >
              {option.label}
            </option>
          ))}
        </select>

        {/* Sort By */}
        <select
          value={filters.sort_by || 'created_at'}
          onChange={(e) => onFilterChange({ sort_by: e.target.value })}
          className={selectClass}
        >
          {sortByOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
            >
              Sort: {option.label}
            </option>
          ))}
        </select>

        {/* Sort Order */}
        <select
          value={filters.sort_order || 'desc'}
          onChange={(e) => onFilterChange({ sort_order: e.target.value })}
          className={selectClass}
        >
          {sortOrderOptions.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
            >
              {option.label}
            </option>
          ))}
        </select>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              theme === 'dark'
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <X className="w-4 h-4" />
            <span>Clear Filters</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default TenantFilters;
