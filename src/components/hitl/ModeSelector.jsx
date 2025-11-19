import Card from '../common/Card/Card';
import Badge from '../common/Badge/Badge';

const ModeSelector = ({ selectedMode, onSelectMode }) => {
  const modes = [
    {
      id: 'full-auto',
      name: 'Full Auto',
      icon: '⚡',
      description: 'AI operates autonomously with no human oversight',
      color: 'bg-green-500',
      badge: 'Fastest'
    },
    {
      id: 'spot-check',
      name: 'Spot Check',
      icon: '🎯',
      description: 'Random sampling for quality assurance',
      color: 'bg-blue-500',
      badge: 'Balanced'
    },
    {
      id: 'threshold',
      name: 'Threshold',
      icon: '📊',
      description: 'Review when confidence falls below threshold',
      color: 'bg-yellow-500',
      badge: 'Smart'
    },
    {
      id: 'pre-approval',
      name: 'Pre-Approval',
      icon: '✋',
      description: 'Approve all actions before execution',
      color: 'bg-orange-500',
      badge: 'Safe'
    },
    {
      id: 'co-pilot',
      name: 'Co-Pilot',
      icon: '🤝',
      description: 'Real-time collaboration with AI',
      color: 'bg-purple-500',
      badge: 'Interactive'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {modes.map((mode) => (
        <Card
          key={mode.id}
          hover
          onClick={() => onSelectMode(mode.id)}
          className={`cursor-pointer transition-all ${
            selectedMode === mode.id
              ? 'ring-2 ring-blue-500 shadow-lg'
              : ''
          }`}
        >
          <div className="flex items-start justify-between mb-3">
            <div className={`w-12 h-12 rounded-lg ${mode.color} flex items-center justify-center text-2xl`}>
              {mode.icon}
            </div>
            <Badge variant={selectedMode === mode.id ? 'primary' : 'default'} size="sm">
              {mode.badge}
            </Badge>
          </div>

          <h3 className="text-lg font-semibold text-secondary-900 mb-2">
            {mode.name}
          </h3>
          <p className="text-sm text-secondary-600">
            {mode.description}
          </p>

          {selectedMode === mode.id && (
            <div className="mt-4 flex items-center gap-2 text-blue-600">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">Active</span>
            </div>
          )}
        </Card>
      ))}
    </div>
  );
};

export default ModeSelector;
