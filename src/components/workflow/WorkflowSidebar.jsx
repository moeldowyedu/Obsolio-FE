import { useState } from 'react';
import { Card, Input, Textarea, Select, Button, Badge } from '../common';
import { Bot, GitBranch, Repeat, Zap, Filter, Merge, Clock, Trash2, Save } from 'lucide-react';

const WorkflowSidebar = ({
  selectedNode,
  onUpdateNode,
  onDeleteNode,
  onAddNodeType,
  availableAgents = [],
}) => {
  const [nodeConfig, setNodeConfig] = useState(selectedNode || {});

  const nodeTypes = [
    {
      type: 'agent',
      label: 'AI Agent',
      icon: Bot,
      description: 'Execute an AI agent',
      color: 'text-blue-600 bg-blue-50',
    },
    {
      type: 'condition',
      label: 'Condition',
      icon: GitBranch,
      description: 'Branch based on condition',
      color: 'text-yellow-600 bg-yellow-50',
    },
    {
      type: 'loop',
      label: 'Loop',
      icon: Repeat,
      description: 'Repeat actions',
      color: 'text-purple-600 bg-purple-50',
    },
    {
      type: 'trigger',
      label: 'Trigger',
      icon: Zap,
      description: 'Start the workflow',
      color: 'text-green-600 bg-green-50',
    },
    {
      type: 'filter',
      label: 'Filter',
      icon: Filter,
      description: 'Filter data',
      color: 'text-orange-600 bg-orange-50',
    },
    {
      type: 'merge',
      label: 'Merge',
      icon: Merge,
      description: 'Combine branches',
      color: 'text-pink-600 bg-pink-50',
    },
    {
      type: 'delay',
      label: 'Delay',
      icon: Clock,
      description: 'Wait before continuing',
      color: 'text-gray-600 bg-gray-50',
    },
  ];

  const handleSave = () => {
    if (onUpdateNode) {
      onUpdateNode(nodeConfig);
    }
  };

  // Node palette view
  if (!selectedNode) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-1">Node Palette</h3>
          <p className="text-sm text-gray-600">
            Click a node type to add it to your workflow
          </p>
        </div>

        <div className="p-4 space-y-2">
          {nodeTypes.map((nodeType) => {
            const Icon = nodeType.icon;
            return (
              <button
                key={nodeType.type}
                onClick={() => onAddNodeType && onAddNodeType(nodeType.type)}
                className={`w-full p-3 rounded-lg border-2 border-gray-200 hover:border-primary-500 transition-all text-left group ${nodeType.color}`}
              >
                <div className="flex items-start gap-3">
                  <Icon className="w-6 h-6 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 mb-0.5">{nodeType.label}</p>
                    <p className="text-xs text-gray-600">{nodeType.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Templates section */}
        <div className="p-4 border-t border-gray-200">
          <h4 className="font-medium text-gray-900 mb-2">Quick Templates</h4>
          <div className="space-y-2">
            <button className="w-full p-2 text-sm text-left rounded border border-gray-200 hover:bg-gray-50">
              Sequential Processing
            </button>
            <button className="w-full p-2 text-sm text-left rounded border border-gray-200 hover:bg-gray-50">
              Conditional Flow
            </button>
            <button className="w-full p-2 text-sm text-left rounded border border-gray-200 hover:bg-gray-50">
              Parallel Execution
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Configuration panel view
  return (
    <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-gray-900">Configure Node</h3>
          <Badge variant="default" size="sm">
            {selectedNode.type}
          </Badge>
        </div>
        <p className="text-sm text-gray-600">Edit node settings</p>
      </div>

      <div className="p-4 space-y-4">
        {/* Common fields */}
        <Input
          label="Node Label"
          value={nodeConfig.label || ''}
          onChange={(e) => setNodeConfig({ ...nodeConfig, label: e.target.value })}
          placeholder="Enter node name"
        />

        <Textarea
          label="Description"
          value={nodeConfig.description || ''}
          onChange={(e) => setNodeConfig({ ...nodeConfig, description: e.target.value })}
          placeholder="Describe what this node does"
          rows={3}
        />

        {/* Agent-specific fields */}
        {selectedNode.type === 'agent' && (
          <>
            <Select
              label="Select Agent"
              value={nodeConfig.agentId || ''}
              onChange={(e) => setNodeConfig({ ...nodeConfig, agentId: e.target.value })}
            >
              <option value="">Choose an agent</option>
              {availableAgents.map((agent) => (
                <option key={agent.id} value={agent.id}>
                  {agent.name}
                </option>
              ))}
            </Select>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Input Mapping
              </label>
              <Textarea
                value={nodeConfig.inputMapping || ''}
                onChange={(e) =>
                  setNodeConfig({ ...nodeConfig, inputMapping: e.target.value })
                }
                placeholder='{"field": "previousNode.output"}'
                rows={4}
              />
              <p className="text-xs text-gray-500 mt-1">JSON format</p>
            </div>
          </>
        )}

        {/* Condition-specific fields */}
        {selectedNode.type === 'condition' && (
          <>
            <Select
              label="Condition Type"
              value={nodeConfig.conditionType || 'equals'}
              onChange={(e) =>
                setNodeConfig({ ...nodeConfig, conditionType: e.target.value })
              }
            >
              <option value="equals">Equals</option>
              <option value="not_equals">Not Equals</option>
              <option value="greater_than">Greater Than</option>
              <option value="less_than">Less Than</option>
              <option value="contains">Contains</option>
            </Select>

            <Input
              label="Field Path"
              value={nodeConfig.fieldPath || ''}
              onChange={(e) => setNodeConfig({ ...nodeConfig, fieldPath: e.target.value })}
              placeholder="data.result.status"
            />

            <Input
              label="Compare Value"
              value={nodeConfig.compareValue || ''}
              onChange={(e) =>
                setNodeConfig({ ...nodeConfig, compareValue: e.target.value })
              }
              placeholder="success"
            />
          </>
        )}

        {/* Loop-specific fields */}
        {selectedNode.type === 'loop' && (
          <>
            <Select
              label="Loop Type"
              value={nodeConfig.loopType || 'count'}
              onChange={(e) => setNodeConfig({ ...nodeConfig, loopType: e.target.value })}
            >
              <option value="count">Fixed Count</option>
              <option value="foreach">For Each Item</option>
              <option value="while">While Condition</option>
            </Select>

            {nodeConfig.loopType === 'count' && (
              <Input
                label="Iterations"
                type="number"
                value={nodeConfig.iterations || 1}
                onChange={(e) =>
                  setNodeConfig({ ...nodeConfig, iterations: parseInt(e.target.value) })
                }
                min={1}
                max={100}
              />
            )}

            {nodeConfig.loopType === 'foreach' && (
              <Input
                label="Array Path"
                value={nodeConfig.arrayPath || ''}
                onChange={(e) => setNodeConfig({ ...nodeConfig, arrayPath: e.target.value })}
                placeholder="data.items"
              />
            )}
          </>
        )}

        {/* Delay-specific fields */}
        {selectedNode.type === 'delay' && (
          <Input
            label="Delay Duration (seconds)"
            type="number"
            value={nodeConfig.duration || 1}
            onChange={(e) =>
              setNodeConfig({ ...nodeConfig, duration: parseInt(e.target.value) })
            }
            min={1}
            max={3600}
          />
        )}

        {/* Filter-specific fields */}
        {selectedNode.type === 'filter' && (
          <Textarea
            label="Filter Expression"
            value={nodeConfig.filterExpression || ''}
            onChange={(e) =>
              setNodeConfig({ ...nodeConfig, filterExpression: e.target.value })
            }
            placeholder="item.status === 'active'"
            rows={4}
          />
        )}

        {/* Action buttons */}
        <div className="pt-4 border-t border-gray-200 space-y-2">
          <Button onClick={handleSave} variant="primary" className="w-full">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>

          {onDeleteNode && (
            <Button
              onClick={() => onDeleteNode(selectedNode.id)}
              variant="outline"
              className="w-full text-red-600 border-red-600 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Node
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkflowSidebar;
