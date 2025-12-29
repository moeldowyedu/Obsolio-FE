import { TrendingUp, TrendingDown } from 'lucide-react';
import { useTheme } from '../../../contexts/ThemeContext';

/**
 * StatCard Component
 * Displays statistics card with value, label, and optional trend
 * Based on FRONTEND_TENANT_MANAGEMENT.md specification
 */
const StatCard = ({ icon: Icon, label, value, trend, trendValue, color = 'blue', onClick }) => {
  const { theme } = useTheme();

  const colorConfig = {
    blue: {
      bgDark: 'bg-blue-500/20',
      bgLight: 'bg-blue-100',
      textDark: 'text-blue-400',
      textLight: 'text-blue-600',
      iconBgDark: 'bg-blue-500/10',
      iconBgLight: 'bg-blue-50',
    },
    green: {
      bgDark: 'bg-green-500/20',
      bgLight: 'bg-green-100',
      textDark: 'text-green-400',
      textLight: 'text-green-600',
      iconBgDark: 'bg-green-500/10',
      iconBgLight: 'bg-green-50',
    },
    purple: {
      bgDark: 'bg-purple-500/20',
      bgLight: 'bg-purple-100',
      textDark: 'text-purple-400',
      textLight: 'text-purple-600',
      iconBgDark: 'bg-purple-500/10',
      iconBgLight: 'bg-purple-50',
    },
    yellow: {
      bgDark: 'bg-yellow-500/20',
      bgLight: 'bg-yellow-100',
      textDark: 'text-yellow-400',
      textLight: 'text-yellow-600',
      iconBgDark: 'bg-yellow-500/10',
      iconBgLight: 'bg-yellow-50',
    },
    red: {
      bgDark: 'bg-red-500/20',
      bgLight: 'bg-red-100',
      textDark: 'text-red-400',
      textLight: 'text-red-600',
      iconBgDark: 'bg-red-500/10',
      iconBgLight: 'bg-red-50',
    },
    teal: {
      bgDark: 'bg-teal-500/20',
      bgLight: 'bg-teal-100',
      textDark: 'text-teal-400',
      textLight: 'text-teal-600',
      iconBgDark: 'bg-teal-500/10',
      iconBgLight: 'bg-teal-50',
    },
  };

  const config = colorConfig[color] || colorConfig.blue;

  const bgClass = theme === 'dark' ? config.bgDark : config.bgLight;
  const textClass = theme === 'dark' ? config.textDark : config.textLight;
  const iconBgClass = theme === 'dark' ? config.iconBgDark : config.iconBgLight;

  const cardClass = `rounded-xl p-6 transition-all duration-300 ${
    theme === 'dark'
      ? 'bg-gray-900/50 border border-white/10'
      : 'bg-white border border-slate-200 shadow-sm'
  } ${onClick ? 'cursor-pointer hover:shadow-lg hover:scale-[1.02]' : ''}`;

  return (
    <div className={cardClass} onClick={onClick}>
      <div className="flex items-start justify-between mb-4">
        {/* Icon */}
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${iconBgClass}`}>
          {Icon && <Icon className={`w-6 h-6 ${textClass}`} />}
        </div>

        {/* Trend */}
        {trend && trendValue && (
          <div
            className={`flex items-center gap-1 text-sm font-semibold ${
              trend === 'up' ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {trend === 'up' ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span>{trendValue}</span>
          </div>
        )}
      </div>

      {/* Value */}
      <div
        className={`text-3xl font-bold mb-1 ${
          theme === 'dark' ? 'text-white' : 'text-slate-900'
        }`}
      >
        {value}
      </div>

      {/* Label */}
      <div
        className={`text-sm font-medium ${
          theme === 'dark' ? 'text-gray-400' : 'text-slate-500'
        }`}
      >
        {label}
      </div>
    </div>
  );
};

export default StatCard;
