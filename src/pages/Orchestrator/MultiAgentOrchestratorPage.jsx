import { useState } from 'react'
import MainLayout from '../../components/layout/MainLayout'
import toast from 'react-hot-toast'

const MultiAgentOrchestratorPage = () => {
  const [workflowName, setWorkflowName] = useState('My Workflow')
  const [selectedAgents, setSelectedAgents] = useState([])
  const [workflowMode, setWorkflowMode] = useState('sequential')

  const availableAgents = [
    { id: 'code-judge', name: 'Precision Code Analyzer', icon: 'code', color: 'blue' },
    { id: 'security-judge', name: 'Security Auditor', icon: 'security', color: 'red' },
    { id: 'performance-judge', name: 'Performance Analyzer', icon: 'speed', color: 'green' },
    { id: 'doc-judge', name: 'Documentation Reviewer', icon: 'description', color: 'purple' },
    { id: 'test-judge', name: 'Test Coverage Analyzer', icon: 'science', color: 'orange' },
    { id: 'legal-judge', name: 'Legal Compliance', icon: 'gavel', color: 'indigo' },
  ]

  const workflows = [
    {
      id: 1,
      name: 'Code Review Pipeline',
      agents: 3,
      mode: 'sequential',
      status: 'active',
      runs: 145
    },
    {
      id: 2,
      name: 'Legal Document Check',
      agents: 2,
      mode: 'parallel',
      status: 'active',
      runs: 78
    },
    {
      id: 3,
      name: 'Comprehensive Audit',
      agents: 4,
      mode: 'conditional',
      status: 'paused',
      runs: 234
    },
  ]

  const handleAddAgent = (agent) => {
    if (!selectedAgents.find(a => a.id === agent.id)) {
      setSelectedAgents([...selectedAgents, { ...agent, order: selectedAgents.length + 1 }])
      toast.success(`Added ${agent.name} to workflow`)
    }
  }

  const handleRemoveAgent = (agentId) => {
    setSelectedAgents(selectedAgents.filter(a => a.id !== agentId))
    toast.success('Agent removed from workflow')
  }

  const moveAgentUp = (index) => {
    if (index > 0) {
      const newAgents = [...selectedAgents]
      ;[newAgents[index - 1], newAgents[index]] = [newAgents[index], newAgents[index - 1]]
      setSelectedAgents(newAgents)
    }
  }

  const moveAgentDown = (index) => {
    if (index < selectedAgents.length - 1) {
      const newAgents = [...selectedAgents]
      ;[newAgents[index], newAgents[index + 1]] = [newAgents[index + 1], newAgents[index]]
      setSelectedAgents(newAgents)
    }
  }

  const saveWorkflow = () => {
    if (selectedAgents.length === 0) {
      toast.error('Please add at least one agent to the workflow')
      return
    }
    toast.success('Workflow saved successfully!')
  }

  return (
    <MainLayout>
      <div className="py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 font-heading">Multi-Agent Orchestrator</h1>
          <p className="text-xl text-gray-600">
            Create intelligent workflows by combining multiple AI agents
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Workflow Builder */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-3xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Workflow Builder</h2>

              {/* Workflow Name and Mode */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Workflow Name</label>
                  <input
                    type="text"
                    value={workflowName}
                    onChange={(e) => setWorkflowName(e.target.value)}
                    className="glass-input w-full"
                    placeholder="Enter workflow name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Execution Mode</label>
                  <select
                    value={workflowMode}
                    onChange={(e) => setWorkflowMode(e.target.value)}
                    className="glass-input w-full"
                  >
                    <option value="sequential">Sequential (One by One)</option>
                    <option value="parallel">Parallel (All at Once)</option>
                    <option value="conditional">Conditional (Rules Based)</option>
                  </select>
                </div>
              </div>

              {/* Mode Description */}
              <div className="mb-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
                <div className="flex items-start">
                  <span className="material-icons text-blue-600 mr-2">info</span>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {workflowMode === 'sequential' ? 'Sequential Execution' :
                       workflowMode === 'parallel' ? 'Parallel Execution' :
                       'Conditional Execution'}
                    </h4>
                    <p className="text-sm text-gray-700">
                      {workflowMode === 'sequential' ? 'Agents process submissions one after another. Output from one agent becomes input for the next.' :
                       workflowMode === 'parallel' ? 'All agents process the submission simultaneously for faster results.' :
                       'Agents execute based on conditions and rules you define (coming soon).'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Agent Workflow */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Workflow Steps ({selectedAgents.length} agents)</h3>
                {selectedAgents.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-2xl">
                    <span className="material-icons text-6xl text-gray-300 mb-4">hub</span>
                    <p className="text-gray-600">No agents added yet</p>
                    <p className="text-sm text-gray-500 mt-2">Add agents from the library on the right</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {selectedAgents.map((agent, index) => (
                      <div key={agent.id}>
                        <div className="glass-card rounded-xl p-4 flex items-center">
                          <div className="flex items-center flex-1">
                            <div className={`w-12 h-12 rounded-xl bg-${agent.color}-100 flex items-center justify-center mr-4`}>
                              <span className={`material-icons text-${agent.color}-600`}>{agent.icon}</span>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900">{agent.name}</h4>
                              <p className="text-sm text-gray-600">Step {index + 1} of {selectedAgents.length}</p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => moveAgentUp(index)}
                              disabled={index === 0}
                              className={`p-2 rounded-lg ${index === 0 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                              <span className="material-icons text-sm">arrow_upward</span>
                            </button>
                            <button
                              onClick={() => moveAgentDown(index)}
                              disabled={index === selectedAgents.length - 1}
                              className={`p-2 rounded-lg ${index === selectedAgents.length - 1 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}
                            >
                              <span className="material-icons text-sm">arrow_downward</span>
                            </button>
                            <button
                              onClick={() => handleRemoveAgent(agent.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            >
                              <span className="material-icons text-sm">delete</span>
                            </button>
                          </div>
                        </div>
                        {index < selectedAgents.length - 1 && workflowMode === 'sequential' && (
                          <div className="flex items-center justify-center py-2">
                            <span className="material-icons text-gray-400">arrow_downward</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex space-x-4">
                <button
                  onClick={saveWorkflow}
                  className="flex-1 glass-btn-primary rounded-xl py-3 font-semibold inline-flex items-center justify-center"
                >
                  <span className="material-icons mr-2">save</span>
                  Save Workflow
                </button>
                <button className="glass-btn-secondary rounded-xl px-6 py-3 font-semibold">
                  Test Run
                </button>
              </div>
            </div>

            {/* Existing Workflows */}
            <div className="glass-card rounded-3xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Workflows</h2>
              <div className="space-y-4">
                {workflows.map((workflow) => (
                  <div key={workflow.id} className="glass-card rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center mr-4">
                        <span className="material-icons text-primary-600">hub</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{workflow.name}</h4>
                        <p className="text-sm text-gray-600">
                          {workflow.agents} agents • {workflow.mode} • {workflow.runs} runs
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        workflow.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {workflow.status}
                      </span>
                      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                        <span className="material-icons text-sm">edit</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Agent Library */}
          <div className="lg:col-span-1">
            <div className="glass-card rounded-3xl p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Agent Library</h2>
              <p className="text-sm text-gray-600 mb-6">Click to add agents to your workflow</p>
              <div className="space-y-3">
                {availableAgents.map((agent) => (
                  <button
                    key={agent.id}
                    onClick={() => handleAddAgent(agent)}
                    className="w-full glass-card rounded-xl p-4 hover:shadow-lg transition-all text-left"
                  >
                    <div className="flex items-center">
                      <div className={`w-12 h-12 rounded-xl bg-${agent.color}-100 flex items-center justify-center mr-3`}>
                        <span className={`material-icons text-${agent.color}-600`}>{agent.icon}</span>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{agent.name}</h4>
                        {selectedAgents.find(a => a.id === agent.id) && (
                          <span className="text-xs text-green-600 font-semibold">✓ Added</span>
                        )}
                      </div>
                      <span className="material-icons text-gray-400">add</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default MultiAgentOrchestratorPage
