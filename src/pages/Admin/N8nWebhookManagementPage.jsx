import { useState } from 'react'
import MainLayout from '../../components/layout/MainLayout'

const N8nWebhookManagementPage = () => {
  const [webhooks, setWebhooks] = useState([
    {
      id: 1,
      name: 'Code Review Pipeline',
      url: 'https://n8n.example.com/webhook/code-review',
      status: 'active',
      agents: ['code-judge', 'security-judge', 'performance-judge'],
      trigger: 'on_submission',
      lastExecuted: '2025-11-06 14:23:00',
      executions: 145,
      successRate: 98.5
    },
    {
      id: 2,
      name: 'Content Moderation Workflow',
      url: 'https://n8n.example.com/webhook/content-moderation',
      status: 'active',
      agents: ['essay-judge', 'legal-judge'],
      trigger: 'on_completion',
      lastExecuted: '2025-11-06 13:15:00',
      executions: 89,
      successRate: 100
    },
    {
      id: 3,
      name: 'Quality Assurance Suite',
      url: 'https://n8n.example.com/webhook/qa-suite',
      status: 'paused',
      agents: ['test-judge', 'doc-judge'],
      trigger: 'scheduled',
      lastExecuted: '2025-11-05 09:00:00',
      executions: 234,
      successRate: 96.2
    }
  ])

  const [showModal, setShowModal] = useState(false)
  const [editingWebhook, setEditingWebhook] = useState(null)
  const [selectedWebhook, setSelectedWebhook] = useState(null)
  const [activeTab, setActiveTab] = useState('list') // list, logs, create

  const [formData, setFormData] = useState({
    name: '',
    url: '',
    method: 'POST',
    authentication: 'none',
    apiKey: '',
    username: '',
    password: '',
    agents: [],
    trigger: 'on_submission',
    retryAttempts: 3,
    timeout: 30,
    headers: [{ key: '', value: '' }],
    notifyOnFailure: true,
    notifyEmail: ''
  })

  const availableAgents = [
    { id: 'code-judge', name: 'Precision Code Analyzer', icon: 'code', color: 'blue' },
    { id: 'security-judge', name: 'Security Auditor', icon: 'security', color: 'red' },
    { id: 'performance-judge', name: 'Performance Analyzer', icon: 'speed', color: 'green' },
    { id: 'doc-judge', name: 'Documentation Reviewer', icon: 'description', color: 'purple' },
    { id: 'test-judge', name: 'Test Coverage Analyzer', icon: 'science', color: 'orange' },
    { id: 'legal-judge', name: 'Legal Compliance', icon: 'gavel', color: 'indigo' },
    { id: 'essay-judge', name: 'Precision Writing Analyzer', icon: 'edit', color: 'green' },
    { id: 'video-judge', name: 'Precision Video Analyzer', icon: 'videocam', color: 'red' },
    { id: 'design-judge', name: 'Precision Design Analyzer', icon: 'palette', color: 'pink' }
  ]

  const webhookLogs = [
    {
      id: 1,
      webhookId: 1,
      timestamp: '2025-11-06 14:23:00',
      status: 'success',
      statusCode: 200,
      duration: 1.2,
      payload: { submissionId: 'sub_123', agentIds: ['code-judge'] },
      response: { success: true, workflowId: 'wf_abc123' }
    },
    {
      id: 2,
      webhookId: 1,
      timestamp: '2025-11-06 13:45:00',
      status: 'success',
      statusCode: 200,
      duration: 0.9,
      payload: { submissionId: 'sub_122', agentIds: ['code-judge', 'security-judge'] },
      response: { success: true, workflowId: 'wf_abc124' }
    },
    {
      id: 3,
      webhookId: 2,
      timestamp: '2025-11-06 13:15:00',
      status: 'failed',
      statusCode: 500,
      duration: 5.0,
      payload: { submissionId: 'sub_121', agentIds: ['essay-judge'] },
      error: 'Connection timeout'
    }
  ]

  const handleCreateWebhook = () => {
    setEditingWebhook(null)
    setFormData({
      name: '',
      url: '',
      method: 'POST',
      authentication: 'none',
      apiKey: '',
      username: '',
      password: '',
      agents: [],
      trigger: 'on_submission',
      retryAttempts: 3,
      timeout: 30,
      headers: [{ key: '', value: '' }],
      notifyOnFailure: true,
      notifyEmail: ''
    })
    setShowModal(true)
  }

  const handleEditWebhook = (webhook) => {
    setEditingWebhook(webhook)
    setFormData({
      name: webhook.name,
      url: webhook.url,
      method: 'POST',
      authentication: 'api_key',
      apiKey: '••••••••',
      username: '',
      password: '',
      agents: webhook.agents,
      trigger: webhook.trigger,
      retryAttempts: 3,
      timeout: 30,
      headers: [{ key: 'Content-Type', value: 'application/json' }],
      notifyOnFailure: true,
      notifyEmail: 'admin@example.com'
    })
    setShowModal(true)
  }

  const handleSaveWebhook = () => {
    if (editingWebhook) {
      // Update existing webhook
      setWebhooks(webhooks.map(w =>
        w.id === editingWebhook.id
          ? { ...w, name: formData.name, url: formData.url, agents: formData.agents, trigger: formData.trigger }
          : w
      ))
    } else {
      // Create new webhook
      const newWebhook = {
        id: webhooks.length + 1,
        name: formData.name,
        url: formData.url,
        status: 'active',
        agents: formData.agents,
        trigger: formData.trigger,
        lastExecuted: null,
        executions: 0,
        successRate: 0
      }
      setWebhooks([...webhooks, newWebhook])
    }
    setShowModal(false)
  }

  const handleDeleteWebhook = (id) => {
    if (window.confirm('Are you sure you want to delete this webhook?')) {
      setWebhooks(webhooks.filter(w => w.id !== id))
    }
  }

  const handleToggleStatus = (id) => {
    setWebhooks(webhooks.map(w =>
      w.id === id
        ? { ...w, status: w.status === 'active' ? 'paused' : 'active' }
        : w
    ))
  }

  const handleTestWebhook = async (webhook) => {
    alert(`Testing webhook: ${webhook.name}\n\nSending test payload to:\n${webhook.url}\n\nThis will trigger the n8n workflow with sample data.`)
  }

  const toggleAgentSelection = (agentId) => {
    if (formData.agents.includes(agentId)) {
      setFormData({ ...formData, agents: formData.agents.filter(id => id !== agentId) })
    } else {
      setFormData({ ...formData, agents: [...formData.agents, agentId] })
    }
  }

  const addHeaderRow = () => {
    setFormData({
      ...formData,
      headers: [...formData.headers, { key: '', value: '' }]
    })
  }

  const updateHeader = (index, field, value) => {
    const newHeaders = [...formData.headers]
    newHeaders[index][field] = value
    setFormData({ ...formData, headers: newHeaders })
  }

  const removeHeader = (index) => {
    setFormData({
      ...formData,
      headers: formData.headers.filter((_, i) => i !== index)
    })
  }

  return (
    <MainLayout>
      <div className="py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">N8N Webhook Management</h1>
          <p className="text-gray-600">Manage webhook integrations and connect AI agents to n8n workflows</p>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-2 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('list')}
              className={`px-6 py-3 font-semibold transition-colors ${
                activeTab === 'list'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="flex items-center">
                <span className="material-icons mr-2">webhook</span>
                Webhooks
              </span>
            </button>
            <button
              onClick={() => setActiveTab('logs')}
              className={`px-6 py-3 font-semibold transition-colors ${
                activeTab === 'logs'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="flex items-center">
                <span className="material-icons mr-2">history</span>
                Execution Logs
              </span>
            </button>
          </div>
        </div>

        {/* Webhooks List Tab */}
        {activeTab === 'list' && (
          <>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="material-icons text-3xl text-blue-600">webhook</span>
                  <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    Active
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900">{webhooks.filter(w => w.status === 'active').length}</h3>
                <p className="text-gray-600 text-sm">Active Webhooks</p>
              </div>

              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="material-icons text-3xl text-purple-600">play_arrow</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900">{webhooks.reduce((sum, w) => sum + w.executions, 0)}</h3>
                <p className="text-gray-600 text-sm">Total Executions</p>
              </div>

              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="material-icons text-3xl text-green-600">check_circle</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900">
                  {(webhooks.reduce((sum, w) => sum + w.successRate, 0) / webhooks.length).toFixed(1)}%
                </h3>
                <p className="text-gray-600 text-sm">Avg Success Rate</p>
              </div>

              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="material-icons text-3xl text-orange-600">psychology</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900">{availableAgents.length}</h3>
                <p className="text-gray-600 text-sm">Available Agents</p>
              </div>
            </div>

            {/* Action Bar */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <span className="material-icons absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                    search
                  </span>
                  <input
                    type="text"
                    placeholder="Search webhooks..."
                    className="glass-input pl-10 pr-4 py-2 rounded-xl"
                  />
                </div>
                <select className="glass-input px-4 py-2 rounded-xl">
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Paused</option>
                </select>
              </div>
              <button
                onClick={handleCreateWebhook}
                className="glass-btn-primary px-6 py-3 rounded-xl font-semibold inline-flex items-center"
              >
                <span className="material-icons mr-2">add</span>
                Create Webhook
              </button>
            </div>

            {/* Webhooks Table */}
            <div className="glass-card rounded-2xl p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Webhook Name
                      </th>
                      <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Connected Agents
                      </th>
                      <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Trigger
                      </th>
                      <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Executions
                      </th>
                      <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Success Rate
                      </th>
                      <th className="text-left py-4 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Last Executed
                      </th>
                      <th className="text-center py-4 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {webhooks.map((webhook) => (
                      <tr key={webhook.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                        <td className="py-4 px-4">
                          <div>
                            <p className="text-gray-900 font-semibold">{webhook.name}</p>
                            <p className="text-gray-500 text-xs font-mono mt-1">{webhook.url}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                            webhook.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            <span className="material-icons text-xs mr-1">
                              {webhook.status === 'active' ? 'check_circle' : 'pause_circle'}
                            </span>
                            {webhook.status === 'active' ? 'Active' : 'Paused'}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex flex-wrap gap-1">
                            {webhook.agents.slice(0, 3).map((agentId) => {
                              const agent = availableAgents.find(a => a.id === agentId)
                              return agent ? (
                                <span
                                  key={agentId}
                                  className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-${agent.color}-100 text-${agent.color}-800`}
                                >
                                  <span className="material-icons text-xs mr-1">{agent.icon}</span>
                                  {agent.name.split(' ')[0]}
                                </span>
                              ) : null
                            })}
                            {webhook.agents.length > 3 && (
                              <span className="inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-800">
                                +{webhook.agents.length - 3}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-gray-700 text-sm capitalize">{webhook.trigger.replace('_', ' ')}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-gray-900 font-semibold">{webhook.executions}</span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center">
                            <span className="text-gray-900 font-semibold">{webhook.successRate}%</span>
                            <div className="w-16 h-2 bg-gray-200 rounded-full ml-2">
                              <div
                                className="h-full bg-green-500 rounded-full"
                                style={{ width: `${webhook.successRate}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-gray-600 text-sm">{webhook.lastExecuted || 'Never'}</span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              onClick={() => handleTestWebhook(webhook)}
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Test webhook"
                            >
                              <span className="material-icons text-blue-600 text-sm">play_arrow</span>
                            </button>
                            <button
                              onClick={() => handleToggleStatus(webhook.id)}
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                              title={webhook.status === 'active' ? 'Pause' : 'Activate'}
                            >
                              <span className="material-icons text-orange-600 text-sm">
                                {webhook.status === 'active' ? 'pause' : 'play_circle'}
                              </span>
                            </button>
                            <button
                              onClick={() => handleEditWebhook(webhook)}
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <span className="material-icons text-green-600 text-sm">edit</span>
                            </button>
                            <button
                              onClick={() => handleDeleteWebhook(webhook.id)}
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <span className="material-icons text-red-600 text-sm">delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* Execution Logs Tab */}
        {activeTab === 'logs' && (
          <div className="glass-card rounded-2xl p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Execution Logs</h2>
              <select className="glass-input px-4 py-2 rounded-xl">
                <option>All Webhooks</option>
                {webhooks.map(w => (
                  <option key={w.id}>{w.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-4">
              {webhookLogs.map((log) => {
                const webhook = webhooks.find(w => w.id === log.webhookId)
                return (
                  <div key={log.id} className="glass-card rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          log.status === 'success' ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          <span className={`material-icons ${
                            log.status === 'success' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {log.status === 'success' ? 'check_circle' : 'error'}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{webhook?.name}</h3>
                          <p className="text-gray-600 text-sm">{log.timestamp}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-gray-900">Status: {log.statusCode}</div>
                        <div className="text-xs text-gray-600">Duration: {log.duration}s</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Payload</h4>
                        <pre className="bg-gray-50 p-3 rounded-lg text-xs overflow-x-auto">
                          {JSON.stringify(log.payload, null, 2)}
                        </pre>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">
                          {log.status === 'success' ? 'Response' : 'Error'}
                        </h4>
                        <pre className="bg-gray-50 p-3 rounded-lg text-xs overflow-x-auto">
                          {log.status === 'success'
                            ? JSON.stringify(log.response, null, 2)
                            : log.error}
                        </pre>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Create/Edit Webhook Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-900">
                  {editingWebhook ? 'Edit Webhook' : 'Create New Webhook'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <span className="material-icons">close</span>
                </button>
              </div>

              <div className="space-y-6">
                {/* Basic Information */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Webhook Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="glass-input w-full px-4 py-2 rounded-xl"
                        placeholder="e.g., Code Review Pipeline"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Trigger Event *
                      </label>
                      <select
                        value={formData.trigger}
                        onChange={(e) => setFormData({ ...formData, trigger: e.target.value })}
                        className="glass-input w-full px-4 py-2 rounded-xl"
                      >
                        <option value="on_submission">On Submission</option>
                        <option value="on_completion">On Completion</option>
                        <option value="on_approval">On Approval</option>
                        <option value="on_rejection">On Rejection</option>
                        <option value="scheduled">Scheduled</option>
                        <option value="manual">Manual</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Webhook URL */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    N8N Webhook URL *
                  </label>
                  <input
                    type="url"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    className="glass-input w-full px-4 py-2 rounded-xl"
                    placeholder="https://your-n8n-instance.com/webhook/your-webhook-id"
                  />
                </div>

                {/* Authentication */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Authentication</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Authentication Type
                      </label>
                      <select
                        value={formData.authentication}
                        onChange={(e) => setFormData({ ...formData, authentication: e.target.value })}
                        className="glass-input w-full px-4 py-2 rounded-xl"
                      >
                        <option value="none">None</option>
                        <option value="api_key">API Key</option>
                        <option value="basic">Basic Auth</option>
                        <option value="bearer">Bearer Token</option>
                      </select>
                    </div>
                    {formData.authentication === 'api_key' && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          API Key
                        </label>
                        <input
                          type="password"
                          value={formData.apiKey}
                          onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                          className="glass-input w-full px-4 py-2 rounded-xl"
                          placeholder="Enter API key"
                        />
                      </div>
                    )}
                    {formData.authentication === 'basic' && (
                      <>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Username
                          </label>
                          <input
                            type="text"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            className="glass-input w-full px-4 py-2 rounded-xl"
                            placeholder="Username"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Password
                          </label>
                          <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="glass-input w-full px-4 py-2 rounded-xl"
                            placeholder="Password"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Connected Agents */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Connected AI Agents</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Select which agents should trigger this webhook when they complete evaluations
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {availableAgents.map((agent) => (
                      <label
                        key={agent.id}
                        className={`glass-card p-4 rounded-xl cursor-pointer transition-all ${
                          formData.agents.includes(agent.id)
                            ? 'border-2 border-primary-500 bg-primary-50'
                            : 'hover:shadow-md'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={formData.agents.includes(agent.id)}
                            onChange={() => toggleAgentSelection(agent.id)}
                            className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                          />
                          <div className={`w-10 h-10 rounded-lg bg-${agent.color}-100 flex items-center justify-center`}>
                            <span className={`material-icons text-${agent.color}-600`}>{agent.icon}</span>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{agent.name}</p>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Advanced Settings */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Advanced Settings</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Retry Attempts
                      </label>
                      <input
                        type="number"
                        value={formData.retryAttempts}
                        onChange={(e) => setFormData({ ...formData, retryAttempts: parseInt(e.target.value) })}
                        className="glass-input w-full px-4 py-2 rounded-xl"
                        min="0"
                        max="10"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Timeout (seconds)
                      </label>
                      <input
                        type="number"
                        value={formData.timeout}
                        onChange={(e) => setFormData({ ...formData, timeout: parseInt(e.target.value) })}
                        className="glass-input w-full px-4 py-2 rounded-xl"
                        min="5"
                        max="300"
                      />
                    </div>
                  </div>
                </div>

                {/* Custom Headers */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Custom Headers</h3>
                  <div className="space-y-3">
                    {formData.headers.map((header, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <input
                          type="text"
                          value={header.key}
                          onChange={(e) => updateHeader(index, 'key', e.target.value)}
                          className="glass-input flex-1 px-4 py-2 rounded-xl"
                          placeholder="Header name"
                        />
                        <input
                          type="text"
                          value={header.value}
                          onChange={(e) => updateHeader(index, 'value', e.target.value)}
                          className="glass-input flex-1 px-4 py-2 rounded-xl"
                          placeholder="Header value"
                        />
                        <button
                          onClick={() => removeHeader(index)}
                          className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          <span className="material-icons text-red-600">delete</span>
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={addHeaderRow}
                      className="text-primary-600 hover:text-primary-700 font-semibold text-sm flex items-center"
                    >
                      <span className="material-icons mr-1 text-sm">add</span>
                      Add Header
                    </button>
                  </div>
                </div>

                {/* Notifications */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Notifications</h3>
                  <label className="flex items-center space-x-3 mb-4">
                    <input
                      type="checkbox"
                      checked={formData.notifyOnFailure}
                      onChange={(e) => setFormData({ ...formData, notifyOnFailure: e.target.checked })}
                      className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                    />
                    <span className="text-gray-700">Notify on webhook failure</span>
                  </label>
                  {formData.notifyOnFailure && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Notification Email
                      </label>
                      <input
                        type="email"
                        value={formData.notifyEmail}
                        onChange={(e) => setFormData({ ...formData, notifyEmail: e.target.value })}
                        className="glass-input w-full px-4 py-2 rounded-xl"
                        placeholder="admin@example.com"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="mt-8 flex items-center justify-end space-x-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="glass-btn-secondary px-6 py-3 rounded-xl font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveWebhook}
                  className="glass-btn-primary px-6 py-3 rounded-xl font-semibold"
                >
                  {editingWebhook ? 'Update Webhook' : 'Create Webhook'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  )
}

export default N8nWebhookManagementPage
