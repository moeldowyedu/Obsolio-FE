import { useState } from 'react';
import { Bot, ShoppingCart, Plus, CheckCircle } from 'lucide-react';
import Button from '../common/Button/Button';
import Card from '../common/Card/Card';
import { useAgentDeploymentStore } from '../../store/agentDeploymentStore';

const SelectAgentSourceStep = ({ onNext }) => {
  const { agentSource, setAgentSource } = useAgentDeploymentStore();
  const [selectedSource, setSelectedSource] = useState(agentSource.type);
  const [selectedAgentId, setSelectedAgentId] = useState(agentSource.agentId);

  // Mock data - would come from API
  const myAgents = [
    {
      id: 'agent-1',
      name: 'Document Processor',
      description: 'Processes legal documents and extracts key information',
      engine: 'Document Engine',
      created: '2024-01-15',
    },
    {
      id: 'agent-2',
      name: 'Email Classifier',
      description: 'Classifies and routes incoming emails',
      engine: 'Text Engine',
      created: '2024-01-20',
    },
    {
      id: 'agent-3',
      name: 'Invoice Analyzer',
      description: 'Analyzes invoices and extracts billing data',
      engine: 'Data Engine',
      created: '2024-02-01',
    },
  ];

  const handleSelectSource = (type) => {
    setSelectedSource(type);
    if (type !== 'existing') {
      setSelectedAgentId(null);
    }
  };

  const handleSelectAgent = (agentId) => {
    setSelectedAgentId(agentId);
  };

  const handleContinue = () => {
    if (selectedSource) {
      const selectedAgent = myAgents.find(a => a.id === selectedAgentId);
      setAgentSource(selectedSource, selectedAgentId, selectedAgent);
      onNext();
    }
  };

  const canContinue = () => {
    if (selectedSource === 'existing') {
      return selectedAgentId !== null;
    }
    return selectedSource !== null;
  };

  const sourceOptions = [
    {
      id: 'existing',
      title: 'Use Existing Agent',
      description: 'Select from your already created agents',
      icon: Bot,
      color: 'bg-blue-500',
    },
    {
      id: 'marketplace',
      title: 'Buy from Marketplace',
      description: 'Browse and purchase agents from AgentX Hub',
      icon: ShoppingCart,
      color: 'bg-purple-500',
    },
    {
      id: 'new',
      title: 'Create New Agent',
      description: 'Build a new agent from scratch using Agent Builder',
      icon: Plus,
      color: 'bg-green-500',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Select Agent Source</h2>
        <p className="text-gray-600">
          Choose where you want to get the agent you'll deploy to this job
        </p>
      </div>

      {/* Source Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {sourceOptions.map((option) => {
          const Icon = option.icon;
          const isSelected = selectedSource === option.id;

          return (
            <div
              key={option.id}
              onClick={() => handleSelectSource(option.id)}
              className={`
                relative p-6 rounded-xl border-2 cursor-pointer transition-all
                ${
                  isSelected
                    ? 'border-primary-500 bg-primary-50 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                }
              `}
            >
              {isSelected && (
                <div className="absolute top-4 right-4">
                  <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                </div>
              )}

              <div className={`w-12 h-12 ${option.color} rounded-lg flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">{option.title}</h3>
              <p className="text-sm text-gray-600">{option.description}</p>
            </div>
          );
        })}
      </div>

      {/* Agent Selection (for existing agents) */}
      {selectedSource === 'existing' && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Select an Agent</h3>
          <div className="grid grid-cols-1 gap-4">
            {myAgents.map((agent) => {
              const isSelected = selectedAgentId === agent.id;

              return (
                <Card
                  key={agent.id}
                  onClick={() => handleSelectAgent(agent.id)}
                  className={`
                    cursor-pointer transition-all
                    ${
                      isSelected
                        ? 'border-2 border-primary-500 shadow-md'
                        : 'border border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    }
                  `}
                >
                  <div className="flex items-start gap-4">
                    <div className={`
                      w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0
                      ${isSelected ? 'bg-primary-500' : 'bg-gray-100'}
                    `}>
                      <Bot className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="text-lg font-semibold text-gray-900">{agent.name}</h4>
                        {isSelected && (
                          <CheckCircle className="w-5 h-5 text-primary-500" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{agent.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="px-2 py-1 bg-gray-100 rounded">
                          {agent.engine}
                        </span>
                        <span>Created: {agent.created}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Marketplace Preview */}
      {selectedSource === 'marketplace' && (
        <div className="mb-8">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
            <ShoppingCart className="w-12 h-12 text-purple-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">AgentX Hub Marketplace</h3>
            <p className="text-gray-600 mb-4">
              You'll be redirected to browse and purchase agents from our marketplace
            </p>
          </div>
        </div>
      )}

      {/* Agent Builder Preview */}
      {selectedSource === 'new' && (
        <div className="mb-8">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <Plus className="w-12 h-12 text-green-500 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Agent Builder</h3>
            <p className="text-gray-600 mb-4">
              You'll be redirected to create a new agent using our Agent Builder wizard
            </p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-end">
        <Button
          variant="primary"
          size="lg"
          onClick={handleContinue}
          disabled={!canContinue()}
          className="min-w-[200px]"
        >
          Continue
        </Button>
      </div>

      {!canContinue() && selectedSource === 'existing' && (
        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">Please select an agent to continue</p>
        </div>
      )}
    </div>
  );
};

export default SelectAgentSourceStep;
