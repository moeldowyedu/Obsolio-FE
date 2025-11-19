import { Card, Badge, Button } from '../common';
import { Play, Copy, Eye, GitBranch, TrendingUp } from 'lucide-react';

const WorkflowTemplateCard = ({ template, onUse, onView, onCopy }) => {
  return (
    <Card padding="md" className="hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-semibold text-secondary-900">{template.name}</h3>
            {template.isPopular && (
              <Badge variant="success" size="sm">
                <TrendingUp className="w-3 h-3 mr-1" />
                Popular
              </Badge>
            )}
          </div>
          <p className="text-sm text-secondary-600">{template.description}</p>
        </div>
      </div>

      {/* Visual Preview */}
      <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex items-center justify-center gap-2 text-sm">
          {template.nodes?.slice(0, 4).map((node, index) => (
            <div key={index} className="flex items-center">
              <div className="px-3 py-1 bg-white border border-gray-300 rounded text-xs font-medium">
                {node.type}
              </div>
              {index < Math.min(3, template.nodes.length - 1) && (
                <div className="mx-1 text-gray-400">→</div>
              )}
            </div>
          ))}
          {template.nodes?.length > 4 && (
            <span className="text-gray-500 text-xs">+{template.nodes.length - 4} more</span>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4 pb-4 border-b border-gray-200">
        <div>
          <p className="text-xs text-secondary-600 mb-1">Nodes</p>
          <p className="text-lg font-bold text-secondary-900">{template.nodeCount || 0}</p>
        </div>
        <div>
          <p className="text-xs text-secondary-600 mb-1">Used</p>
          <p className="text-lg font-bold text-secondary-900">{template.usageCount || 0}</p>
        </div>
        <div>
          <p className="text-xs text-secondary-600 mb-1">Category</p>
          <Badge variant="default" size="sm">
            {template.category || 'General'}
          </Badge>
        </div>
      </div>

      {/* Tags */}
      {template.tags && template.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {template.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 text-xs text-secondary-700 rounded"
            >
              {tag}
            </span>
          ))}
          {template.tags.length > 3 && (
            <span className="px-2 py-1 text-xs text-gray-500">
              +{template.tags.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2">
        {onView && (
          <Button onClick={() => onView(template.id)} variant="outline" size="sm" className="flex-1">
            <Eye className="w-4 h-4 mr-1" />
            Preview
          </Button>
        )}
        {onCopy && (
          <Button onClick={() => onCopy(template.id)} variant="outline" size="sm">
            <Copy className="w-4 h-4" />
          </Button>
        )}
        {onUse && (
          <Button onClick={() => onUse(template.id)} variant="primary" size="sm" className="flex-1">
            <Play className="w-4 h-4 mr-1" />
            Use Template
          </Button>
        )}
      </div>
    </Card>
  );
};

export default WorkflowTemplateCard;
