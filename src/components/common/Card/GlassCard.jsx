import { clsx } from 'clsx';

const GlassCard = ({
  children,
  className = '',
  padding = 'md',
  blur = 'md',
  ...props
}) => {
  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const blurs = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
  };

  return (
    <div
      className={clsx(
        'bg-glass-white border border-glass-border rounded-xl',
        blurs[blur],
        paddings[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default GlassCard;
