import { useTheme } from '../../../contexts/ThemeContext';

/**
 * StatusBadge Component
 * Displays tenant status with appropriate colors and icons
 * Based on FRONTEND_TENANT_MANAGEMENT.md specification
 */
const StatusBadge = ({ status, size = 'md' }) => {
  const { theme } = useTheme();

  const statusConfig = {
    active: {
      label: 'Active',
      icon: '●',
      bgDark: 'bg-green-500/20',
      bgLight: 'bg-green-100',
      textDark: 'text-green-400',
      textLight: 'text-green-700',
      borderDark: 'border-green-500/30',
      borderLight: 'border-green-300',
    },
    trial: {
      label: 'Trial',
      icon: '○',
      bgDark: 'bg-yellow-500/20',
      bgLight: 'bg-yellow-100',
      textDark: 'text-yellow-400',
      textLight: 'text-yellow-700',
      borderDark: 'border-yellow-500/30',
      borderLight: 'border-yellow-300',
    },
    suspended: {
      label: 'Suspended',
      icon: '⊗',
      bgDark: 'bg-red-500/20',
      bgLight: 'bg-red-100',
      textDark: 'text-red-400',
      textLight: 'text-red-700',
      borderDark: 'border-red-500/30',
      borderLight: 'border-red-300',
    },
    inactive: {
      label: 'Inactive',
      icon: '○',
      bgDark: 'bg-gray-500/20',
      bgLight: 'bg-gray-100',
      textDark: 'text-gray-400',
      textLight: 'text-gray-600',
      borderDark: 'border-gray-500/30',
      borderLight: 'border-gray-300',
    },
    pending_verification: {
      label: 'Pending',
      icon: '◐',
      bgDark: 'bg-blue-500/20',
      bgLight: 'bg-blue-100',
      textDark: 'text-blue-400',
      textLight: 'text-blue-700',
      borderDark: 'border-blue-500/30',
      borderLight: 'border-blue-300',
    },
  };

  const config = statusConfig[status] || statusConfig.inactive;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5',
  };

  const bgClass = theme === 'dark' ? config.bgDark : config.bgLight;
  const textClass = theme === 'dark' ? config.textDark : config.textLight;
  const borderClass = theme === 'dark' ? config.borderDark : config.borderLight;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-semibold border ${bgClass} ${textClass} ${borderClass} ${sizeClasses[size]}`}
    >
      <span className="text-xs">{config.icon}</span>
      <span>{config.label}</span>
    </span>
  );
};

export default StatusBadge;
