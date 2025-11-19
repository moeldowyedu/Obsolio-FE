import { Badge, Button, Card } from '../common';
import { Play, Pause, Edit, Trash2, MoreVertical, Clock, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { ENGINES } from '../../utils/constants';

const AgentListCard = ({ agent, onRun, onEdit, onDelete, onToggleStatus }) => {
  const [showMenu, setShowMenu] = useState(false);

  const getStatusVariant = (status) => {
    const variants = {
      active: 'success',
      inactive: 'default',
      error: 'danger',
      paused: 'warning',
    };
    return variants[status] || 'default';
  };

  const getEngineInfo = (engineId) => {
    return ENGINES.find((e) => e.id === engineId) || { name: engineId, color: 'gray' };
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <Card padding="md" className="group hover:shadow-lg transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-semibold text-secondary-900 group-hover:text-primary-600 transition-colors">
              {agent.name}
            </h3>
            <Badge variant={getStatusVariant(agent.status)} size="sm">
              {agent.status}
            </Badge>
          </div>
          <p className="text-sm text-secondary-600 line-clamp-2">{agent.description}</p>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors"
          >
            <MoreVertical className="w-5 h-5 text-gray-400" />
          </button>
          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
              <button
                onClick={() => {
                  onEdit(agent.id);
                  setShowMenu(false);
                }}
                className="w-full px-4 py-2 text-left text-sm text-secondary-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit Agent
              </button>
              <button
                onClick={() => {
                  onToggleStatus(agent.id);
                  setShowMenu(false);
                }}
                className="w-full px-4 py-2 text-left text-sm text-secondary-700 hover:bg-gray-50 flex items-center gap-2"
              >
                {agent.status === 'active' ? (
                  <>
                    <Pause className="w-4 h-4" />
                    Pause Agent
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Activate Agent
                  </>
                )}
              </button>
              <button
                onClick={() => {
                  onDelete(agent.id);
                  setShowMenu(false);
                }}
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete Agent
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Engines */}
      <div className="flex flex-wrap gap-2 mb-4">
        {agent.engines?.map((engineId) => {
          const engine = getEngineInfo(engineId);
          return (
            <Badge key={engineId} variant="default" size="sm">
              {engine.name}
            </Badge>
          );
        })}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4 py-3 border-t border-b border-gray-100">
        <div>
          <p className="text-xs text-secondary-600 mb-1">Total Runs</p>
          <p className="text-xl font-bold text-secondary-900">
            {agent.stats?.totalRuns?.toLocaleString() || 0}
          </p>
        </div>
        <div>
          <p className="text-xs text-secondary-600 mb-1">Success Rate</p>
          <div className="flex items-center gap-1">
            <p className="text-xl font-bold text-green-600">
              {agent.stats?.successRate || 0}%
            </p>
            <TrendingUp className="w-4 h-4 text-green-500" />
          </div>
        </div>
        <div>
          <p className="text-xs text-secondary-600 mb-1">Avg Duration</p>
          <p className="text-xl font-bold text-secondary-900">
            {agent.stats?.avgDuration || '0'}s
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Clock className="w-4 h-4" />
          <span>Last run: {agent.lastRun ? formatDate(agent.lastRun) : 'Never'}</span>
        </div>
        <Button
          onClick={() => onRun(agent.id)}
          variant="primary"
          size="sm"
          disabled={agent.status !== 'active'}
        >
          <Play className="w-4 h-4 mr-1" />
          Run Now
        </Button>
      </div>
    </Card>
  );
};

export default AgentListCard;
