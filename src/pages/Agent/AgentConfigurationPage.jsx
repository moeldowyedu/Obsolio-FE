import { useState } from 'react'
import MainLayout from '../../components/layout/MainLayout'
import { useParams, Link } from 'react-router-dom'
import toast from 'react-hot-toast'

const AgentConfigurationPage = () => {
  const { agentId } = useParams()
  const [activeTab, setActiveTab] = useState('deployment')

  const [config, setConfig] = useState({
    deploymentMode: 'scheduled', // one-time, scheduled, integrated
    schedule: {
      frequency: 'daily',
      time: '09:00',
      days: [1, 2, 3, 4, 5], // Mon-Fri
    },
    criteria: {
      useDefault: true,
      customWeights: {
        quality: 30,
        accuracy: 25,
        completeness: 25,
        originality: 20,
      }
    },
    integration: {
      webhookUrl: '',
      apiKey: '',
      autoSubmit: false,
    },
    notifications: {
      email: true,
      slack: false,
      webhook: false,
    }
  })

  // Mock agent data
  const agent = {
    id: agentId,
    name: 'Precision Code Analyzer',
    icon: 'code',
    color: 'blue',
    description: 'Expert at evaluating source code quality, best practices, and architecture',
    price: 99,
  }

  const frequencies = [
    { value: 'hourly', label: 'Every Hour', icon: 'schedule' },
    { value: 'daily', label: 'Daily', icon: 'today' },
    { value: 'weekly', label: 'Weekly', icon: 'date_range' },
    { value: 'monthly', label: 'Monthly', icon: 'calendar_month' },
  ]

  const weekDays = [
    { value: 0, label: 'Sunday', short: 'Sun' },
    { value: 1, label: 'Monday', short: 'Mon' },
    { value: 2, label: 'Tuesday', short: 'Tue' },
    { value: 3, label: 'Wednesday', short: 'Wed' },
    { value: 4, label: 'Thursday', short: 'Thu' },
    { value: 5, label: 'Friday', short: 'Fri' },
    { value: 6, label: 'Saturday', short: 'Sat' },
  ]

  const handleDeploymentChange = (mode) => {
    setConfig({ ...config, deploymentMode: mode })
  }

  const toggleDay = (day) => {
    const days = config.schedule.days.includes(day)
      ? config.schedule.days.filter(d => d !== day)
      : [...config.schedule.days, day]
    setConfig({
      ...config,
      schedule: { ...config.schedule, days }
    })
  }

  const handleSaveConfiguration = () => {
    toast.success('Agent configuration saved successfully!')
  }

  const handleActivateAgent = () => {
    toast.success(`${agent.name} activated and running!`)
  }

  const tabs = [
    { id: 'deployment', label: 'Deployment', icon: 'rocket_launch' },
    { id: 'criteria', label: 'Evaluation Criteria', icon: 'tune' },
    { id: 'integration', label: 'Integration', icon: 'integration_instructions' },
    { id: 'notifications', label: 'Notifications', icon: 'notifications' },
  ]

  return (
    <MainLayout>
      <div className="py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/marketplace" className="text-primary-600 hover:text-primary-700 font-semibold mb-4 inline-flex items-center">
            <span className="material-icons text-sm mr-1">arrow_back</span>
            Back to Marketplace
          </Link>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              <div className={`w-16 h-16 rounded-2xl bg-${agent.color}-100 flex items-center justify-center mr-4`}>
                <span className={`material-icons text-4xl text-${agent.color}-600`}>{agent.icon}</span>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 font-heading">{agent.name}</h1>
                <p className="text-gray-600">{agent.description}</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleSaveConfiguration}
                className="glass-btn-secondary rounded-xl px-6 py-3 font-semibold inline-flex items-center"
              >
                <span className="material-icons mr-2">save</span>
                Save Config
              </button>
              <button
                onClick={handleActivateAgent}
                className="glass-btn-primary rounded-xl px-6 py-3 font-semibold inline-flex items-center glow"
              >
                <span className="material-icons mr-2">play_arrow</span>
                Activate Agent
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-2 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all flex items-center ${
                  activeTab === tab.id
                    ? 'glass-btn-primary'
                    : 'glass-btn-secondary'
                }`}
              >
                <span className="material-icons text-sm mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="glass-card rounded-3xl p-8">
          {/* Deployment Mode */}
          {activeTab === 'deployment' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Deployment Mode</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* One-Time Run */}
                <div
                  onClick={() => handleDeploymentChange('one-time')}
                  className={`glass-card rounded-2xl p-6 cursor-pointer transition-all ${
                    config.deploymentMode === 'one-time'
                      ? 'ring-4 ring-primary-500 bg-primary-50'
                      : 'hover:shadow-xl'
                  }`}
                >
                  <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                    <span className="material-icons text-3xl text-green-600">play_arrow</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">One-Time Run</h3>
                  <p className="text-gray-700 text-sm mb-4">Execute the agent on-demand whenever you need</p>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Manual trigger</li>
                    <li>• Instant execution</li>
                    <li>• Pay per use</li>
                  </ul>
                </div>

                {/* Scheduled */}
                <div
                  onClick={() => handleDeploymentChange('scheduled')}
                  className={`glass-card rounded-2xl p-6 cursor-pointer transition-all ${
                    config.deploymentMode === 'scheduled'
                      ? 'ring-4 ring-primary-500 bg-primary-50'
                      : 'hover:shadow-xl'
                  }`}
                >
                  <div className="w-14 h-14 rounded-xl bg-primary-100 flex items-center justify-center mb-4">
                    <span className="material-icons text-3xl text-primary-600">schedule</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Custom Schedule</h3>
                  <p className="text-gray-700 text-sm mb-4">Automated recurring execution on your schedule</p>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• Automated workflow</li>
                    <li>• Flexible timing</li>
                    <li>• Set and forget</li>
                  </ul>
                </div>

                {/* Integrated */}
                <div
                  onClick={() => handleDeploymentChange('integrated')}
                  className={`glass-card rounded-2xl p-6 cursor-pointer transition-all ${
                    config.deploymentMode === 'integrated'
                      ? 'ring-4 ring-primary-500 bg-primary-50'
                      : 'hover:shadow-xl'
                  }`}
                >
                  <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                    <span className="material-icons text-3xl text-purple-600">code</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">API Integration</h3>
                  <p className="text-gray-700 text-sm mb-4">Embed into your website or application</p>
                  <ul className="space-y-1 text-sm text-gray-600">
                    <li>• REST API access</li>
                    <li>• Webhook support</li>
                    <li>• Real-time results</li>
                  </ul>
                </div>
              </div>

              {/* Schedule Configuration */}
              {config.deploymentMode === 'scheduled' && (
                <div className="glass-card rounded-2xl p-6 bg-primary-50/50">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Schedule Configuration</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Frequency</label>
                      <select
                        value={config.schedule.frequency}
                        onChange={(e) => setConfig({
                          ...config,
                          schedule: { ...config.schedule, frequency: e.target.value }
                        })}
                        className="glass-input w-full"
                      >
                        {frequencies.map(freq => (
                          <option key={freq.value} value={freq.value}>{freq.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-2">Execution Time</label>
                      <input
                        type="time"
                        value={config.schedule.time}
                        onChange={(e) => setConfig({
                          ...config,
                          schedule: { ...config.schedule, time: e.target.value }
                        })}
                        className="glass-input w-full"
                      />
                    </div>
                  </div>

                  {config.schedule.frequency === 'weekly' && (
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-3">Select Days</label>
                      <div className="grid grid-cols-7 gap-2">
                        {weekDays.map(day => (
                          <button
                            key={day.value}
                            onClick={() => toggleDay(day.value)}
                            className={`py-3 rounded-xl font-semibold transition-all ${
                              config.schedule.days.includes(day.value)
                                ? 'bg-primary-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {day.short}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Integration Info */}
              {config.deploymentMode === 'integrated' && (
                <div className="glass-card rounded-2xl p-6 bg-purple-50/50">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Integration Setup</h3>
                  <p className="text-gray-700 mb-6">
                    Configure API integration settings in the Integration tab to connect this agent to your application.
                  </p>
                  <button
                    onClick={() => setActiveTab('integration')}
                    className="glass-btn-primary rounded-xl px-6 py-3 font-semibold inline-flex items-center"
                  >
                    <span className="material-icons mr-2">settings</span>
                    Configure Integration
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Evaluation Criteria */}
          {activeTab === 'criteria' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Evaluation Criteria</h2>

              <div className="mb-6">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.criteria.useDefault}
                    onChange={(e) => setConfig({
                      ...config,
                      criteria: { ...config.criteria, useDefault: e.target.checked }
                    })}
                    className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                  />
                  <span className="text-gray-800 font-semibold">Use default evaluation criteria</span>
                </label>
              </div>

              {!config.criteria.useDefault && (
                <div className="space-y-6">
                  <p className="text-gray-600">Customize the weight of each criterion (total must equal 100%)</p>
                  {Object.entries(config.criteria.customWeights).map(([key, value]) => (
                    <div key={key}>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-gray-800 font-semibold capitalize">{key}</label>
                        <div className="flex items-center">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            value={value}
                            onChange={(e) => setConfig({
                              ...config,
                              criteria: {
                                ...config.criteria,
                                customWeights: {
                                  ...config.criteria.customWeights,
                                  [key]: parseInt(e.target.value) || 0
                                }
                              }
                            })}
                            className="glass-input w-20 text-center mr-2"
                          />
                          <span className="text-gray-600">%</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all"
                          style={{ width: `${value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                  <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
                    <p className="text-sm text-gray-700">
                      Total: <strong>{Object.values(config.criteria.customWeights).reduce((a, b) => a + b, 0)}%</strong>
                      {Object.values(config.criteria.customWeights).reduce((a, b) => a + b, 0) !== 100 && (
                        <span className="text-red-600 ml-2">⚠️ Must equal 100%</span>
                      )}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Integration */}
          {activeTab === 'integration' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">API Integration</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Webhook URL</label>
                  <input
                    type="url"
                    value={config.integration.webhookUrl}
                    onChange={(e) => setConfig({
                      ...config,
                      integration: { ...config.integration, webhookUrl: e.target.value }
                    })}
                    placeholder="https://your-domain.com/webhook"
                    className="glass-input w-full"
                  />
                  <p className="text-sm text-gray-600 mt-1">We'll send evaluation results to this URL</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">API Key</label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={config.integration.apiKey}
                      readOnly
                      placeholder="Click generate to create an API key"
                      className="glass-input flex-1"
                    />
                    <button
                      onClick={() => {
                        const newKey = 'aasim_' + Math.random().toString(36).substring(2, 15)
                        setConfig({
                          ...config,
                          integration: { ...config.integration, apiKey: newKey }
                        })
                        toast.success('API key generated')
                      }}
                      className="glass-btn-primary rounded-xl px-6 py-2 font-semibold whitespace-nowrap"
                    >
                      Generate Key
                    </button>
                  </div>
                </div>

                <div>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.integration.autoSubmit}
                      onChange={(e) => setConfig({
                        ...config,
                        integration: { ...config.integration, autoSubmit: e.target.checked }
                      })}
                      className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
                    />
                    <span className="text-gray-800 font-semibold">Auto-submit evaluations to webhook</span>
                  </label>
                </div>

                <Link
                  to="/integration"
                  className="inline-block glass-btn-secondary rounded-xl px-6 py-3 font-semibold mt-4"
                >
                  <span className="material-icons text-sm mr-2">code</span>
                  View Integration Docs & Code Examples
                </Link>
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeTab === 'notifications' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Notification Preferences</h2>

              <div className="space-y-6">
                <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="material-icons text-blue-600 text-2xl mr-3">email</span>
                      <div>
                        <h3 className="font-semibold text-gray-900">Email Notifications</h3>
                        <p className="text-sm text-gray-600">Receive updates via email</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setConfig({
                        ...config,
                        notifications: { ...config.notifications, email: !config.notifications.email }
                      })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        config.notifications.email ? 'bg-primary-600' : 'bg-gray-300'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        config.notifications.email ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="material-icons text-purple-600 text-2xl mr-3">chat</span>
                      <div>
                        <h3 className="font-semibold text-gray-900">Slack Notifications</h3>
                        <p className="text-sm text-gray-600">Post updates to Slack channel</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setConfig({
                        ...config,
                        notifications: { ...config.notifications, slack: !config.notifications.slack }
                      })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        config.notifications.slack ? 'bg-primary-600' : 'bg-gray-300'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        config.notifications.slack ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="material-icons text-green-600 text-2xl mr-3">webhook</span>
                      <div>
                        <h3 className="font-semibold text-gray-900">Webhook Notifications</h3>
                        <p className="text-sm text-gray-600">Send to custom webhook endpoint</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setConfig({
                        ...config,
                        notifications: { ...config.notifications, webhook: !config.notifications.webhook }
                      })}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        config.notifications.webhook ? 'bg-primary-600' : 'bg-gray-300'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        config.notifications.webhook ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  )
}

export default AgentConfigurationPage
