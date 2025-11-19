import { Button } from '../';

const EmptyState = ({
  icon,
  title,
  description,
  action,
  actionLabel,
  secondaryAction,
  secondaryActionLabel,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-12 px-6 text-center ${className}`}>
      {icon && (
        <div className="mb-4 text-gray-400">
          {typeof icon === 'string' ? (
            <div className="text-6xl">{icon}</div>
          ) : (
            icon
          )}
        </div>
      )}

      {title && (
        <h3 className="text-xl font-semibold text-secondary-900 mb-2">
          {title}
        </h3>
      )}

      {description && (
        <p className="text-secondary-600 mb-6 max-w-md">
          {description}
        </p>
      )}

      {(action || secondaryAction) && (
        <div className="flex flex-col sm:flex-row gap-3">
          {action && (
            <Button onClick={action} variant="primary">
              {actionLabel || 'Get Started'}
            </Button>
          )}
          {secondaryAction && (
            <Button onClick={secondaryAction} variant="outline">
              {secondaryActionLabel || 'Learn More'}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
