import { Badge } from '../common';
import {
  Play,
  CheckCircle,
  XCircle,
  Clock,
  Settings,
  GitBranch,
  Repeat,
  AlertCircle,
  Bot,
  Zap,
  Filter,
  Merge
} from 'lucide-react';

const WorkflowNode = ({ node, isSelected, onSelect, onConfigure, isExecuting, executionStatus }) => {
  const getNodeIcon = (type) => {
    const icons = {
      agent: Bot,
      condition: GitBranch,
      loop: Repeat,
      trigger: Zap,
      filter: Filter,
      merge: Merge,
      delay: Clock,
    };
    return icons[type] || Play;
  };

  const getNodeColor = (type) => {
    const colors = {
      agent: 'from-blue-400 to-blue-600',
      condition: 'from-yellow-400 to-yellow-600',
      loop: 'from-purple-400 to-purple-600',
      trigger: 'from-green-400 to-green-600',
      filter: 'from-orange-400 to-orange-600',
      merge: 'from-pink-400 to-pink-600',
      delay: 'from-gray-400 to-gray-600',
    };
    return colors[type] || 'from-blue-400 to-blue-600';
  };

  const getExecutionStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'running':
        return <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-gray-400" />;
      default:
        return null;
    }
  };

  const NodeIcon = getNodeIcon(node.type);
  const nodeColor = getNodeColor(node.type);

  return (
    <div
      onClick={() => onSelect && onSelect(node.id)}
      className={`relative group cursor-pointer ${
        isSelected ? 'ring-2 ring-primary-500' : ''
      }`}
    >
      {/* Connection Points */}
      {node.type !== 'trigger' && (
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white border-2 border-gray-400 rounded-full z-10" />
      )}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white border-2 border-gray-400 rounded-full z-10" />

      {/* Node Card */}
      <div className={`bg-white rounded-lg shadow-md border-2 ${
        isSelected ? 'border-primary-600' : 'border-gray-200'
      } transition-all hover:shadow-lg min-w-[180px]`}>
        {/* Header */}
        <div className={`bg-gradient-to-r ${nodeColor} text-white px-4 py-2 rounded-t-lg flex items-center justify-between`}>
          <div className="flex items-center gap-2">
            <NodeIcon className="w-5 h-5" />
            <span className="font-medium text-sm">{node.type.charAt(0).toUpperCase() + node.type.slice(1)}</span>
          </div>
          {executionStatus && getExecutionStatusIcon(executionStatus)}
        </div>

        {/* Content */}
        <div className="p-3">
          <p className="font-semibold text-secondary-900 text-sm mb-1">{node.label || 'Unnamed Node'}</p>
          {node.agentName && (
            <p className="text-xs text-secondary-600 mb-2">{node.agentName}</p>
          )}

          {/* Node-specific details */}
          {node.type === 'condition' && node.condition && (
            <div className="text-xs text-secondary-600 mb-2">
              <Badge variant="default" size="sm">{node.condition}</Badge>
            </div>
          )}

          {node.type === 'loop' && node.iterations && (
            <div className="text-xs text-secondary-600">
              <Badge variant="default" size="sm">{node.iterations} iterations</Badge>
            </div>
          )}

          {node.type === 'delay' && node.duration && (
            <div className="text-xs text-secondary-600">
              <Badge variant="default" size="sm">{node.duration}s delay</Badge>
            </div>
          )}

          {/* Execution info */}
          {isExecuting && executionStatus && (
            <div className="mt-2 pt-2 border-t border-gray-200">
              <div className="flex items-center justify-between text-xs">
                <span className="text-secondary-600">Status:</span>
                <Badge
                  variant={
                    executionStatus === 'success' ? 'success' :
                    executionStatus === 'failed' ? 'danger' :
                    executionStatus === 'running' ? 'info' :
                    'default'
                  }
                  size="sm"
                >
                  {executionStatus}
                </Badge>
              </div>
            </div>
          )}
        </div>

        {/* Configure button (shows on hover) */}
        {onConfigure && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onConfigure(node.id);
            }}
            className="absolute -top-2 -right-2 p-1 bg-white border-2 border-gray-300 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:border-primary-600"
          >
            <Settings className="w-4 h-4 text-secondary-600" />
          </button>
        )}

        {/* Error indicator */}
        {executionStatus === 'failed' && (
          <div className="absolute -top-2 -left-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkflowNode;
