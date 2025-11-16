import { useState } from 'react';
import WorkflowNode from './WorkflowNode';
import { Card, Button, EmptyState } from '../common';
import { Plus, ArrowDown, GitBranch } from 'lucide-react';

const WorkflowCanvas = ({
  nodes = [],
  selectedNodeId,
  onSelectNode,
  onConfigureNode,
  onAddNode,
  executionStatuses = {},
  isExecuting = false,
  readOnly = false
}) => {
  const [hoveredConnection, setHoveredConnection] = useState(null);

  // Organize nodes in a vertical flow
  const renderWorkflow = () => {
    if (nodes.length === 0) {
      return (
        <EmptyState
          icon={Plus}
          title="No Nodes Yet"
          description="Add nodes from the sidebar to start building your workflow"
        />
      );
    }

    return (
      <div className="flex flex-col items-center space-y-8 py-8">
        {nodes.map((node, index) => {
          const nextNode = nodes[index + 1];
          const isConditional = node.type === 'condition';

          return (
            <div key={node.id} className="flex flex-col items-center">
              {/* Node */}
              <WorkflowNode
                node={node}
                isSelected={selectedNodeId === node.id}
                onSelect={onSelectNode}
                onConfigure={readOnly ? null : onConfigureNode}
                isExecuting={isExecuting}
                executionStatus={executionStatuses[node.id]}
              />

              {/* Connection to next node */}
              {nextNode && (
                <div className="flex flex-col items-center my-2">
                  {isConditional ? (
                    <div className="flex items-center gap-8">
                      {/* True branch */}
                      <div className="flex flex-col items-center">
                        <div className="text-xs font-medium text-green-600 mb-1">True</div>
                        <ArrowDown className="w-5 h-5 text-green-600" />
                      </div>

                      {/* False branch */}
                      <div className="flex flex-col items-center">
                        <div className="text-xs font-medium text-red-600 mb-1">False</div>
                        <ArrowDown className="w-5 h-5 text-red-600" />
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      <ArrowDown
                        className={`w-6 h-6 transition-colors ${
                          executionStatuses[node.id] === 'success'
                            ? 'text-green-500'
                            : executionStatuses[node.id] === 'running'
                            ? 'text-blue-500 animate-pulse'
                            : 'text-gray-400'
                        }`}
                      />
                      {executionStatuses[node.id] === 'running' && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Add node button (between nodes) */}
              {!readOnly && nextNode && (
                <button
                  onClick={() => onAddNode && onAddNode(index + 1)}
                  onMouseEnter={() => setHoveredConnection(index)}
                  onMouseLeave={() => setHoveredConnection(null)}
                  className={`p-2 rounded-full border-2 border-dashed transition-all ${
                    hoveredConnection === index
                      ? 'bg-primary-100 border-primary-500 scale-110'
                      : 'bg-white border-gray-300 opacity-0 group-hover:opacity-100'
                  }`}
                >
                  <Plus className="w-4 h-4 text-gray-600" />
                </button>
              )}
            </div>
          );
        })}

        {/* Add node at end */}
        {!readOnly && nodes.length > 0 && (
          <Button
            onClick={() => onAddNode && onAddNode(nodes.length)}
            variant="outline"
            className="mt-4 border-dashed"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Node
          </Button>
        )}
      </div>
    );
  };

  return (
    <Card padding="none" className="h-full overflow-auto bg-gray-50">
      {/* Grid background */}
      <div
        className="min-h-full relative"
        style={{
          backgroundImage: `
            linear-gradient(to right, #e5e7eb 1px, transparent 1px),
            linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      >
        {renderWorkflow()}
      </div>
    </Card>
  );
};

export default WorkflowCanvas;
