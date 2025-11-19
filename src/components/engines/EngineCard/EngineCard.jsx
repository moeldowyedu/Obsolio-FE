import { useNavigate } from 'react-router-dom';
import { Card } from '../../common';
import * as Icons from 'lucide-react';

const EngineCard = ({ engine, featured = false }) => {
  const navigate = useNavigate();

  // Get the icon component from lucide-react
  const getIcon = (iconName) => {
    // Convert icon names to PascalCase for lucide-react
    const iconMap = {
      'eye': 'Eye',
      'mic': 'Mic',
      'type': 'Type',
      'code': 'Code',
      'file-text': 'FileText',
      'database': 'Database',
      'globe': 'Globe',
    };
    const IconComponent = Icons[iconMap[iconName]] || Icons.Sparkles;
    return <IconComponent className="w-full h-full" />;
  };

  return (
    <Card
      onClick={() => navigate(`/engines/${engine.id}`)}
      padding="md"
      hover
      className={`cursor-pointer transition-all duration-300 ${
        featured ? 'ring-2 ring-primary-500 shadow-lg' : ''
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Icon and Category */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-md"
            style={{ backgroundColor: engine.color }}
          >
            {getIcon(engine.icon)}
          </div>
          {featured && (
            <span className="px-2 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full">
              Featured
            </span>
          )}
        </div>

        {/* Engine Name */}
        <h3 className="text-xl font-heading font-bold text-secondary-900 mb-2">
          {engine.name}
        </h3>

        {/* Category Badge */}
        <div className="mb-3">
          <span className="inline-block px-3 py-1 bg-gray-100 text-secondary-700 text-xs font-medium rounded-full">
            {engine.category}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-secondary-600 mb-4 flex-grow">
          {engine.description}
        </p>

        {/* Capabilities */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-secondary-700 mb-2">
            Key Capabilities:
          </p>
          <div className="flex flex-wrap gap-1">
            {engine.capabilities.slice(0, 3).map((capability, idx) => (
              <span
                key={idx}
                className="text-xs px-2 py-1 bg-white border border-gray-200 text-secondary-600 rounded"
              >
                {capability}
              </span>
            ))}
            {engine.capabilities.length > 3 && (
              <span className="text-xs px-2 py-1 text-gray-500">
                +{engine.capabilities.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* CTA Button */}
        <button
          className="w-full mt-auto py-2.5 px-4 rounded-lg font-medium text-sm transition-colors"
          style={{
            backgroundColor: `${engine.color}15`,
            color: engine.color,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = engine.color;
            e.currentTarget.style.color = '#ffffff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = `${engine.color}15`;
            e.currentTarget.style.color = engine.color;
          }}
        >
          Explore Engine →
        </button>
      </div>
    </Card>
  );
};

export default EngineCard;
