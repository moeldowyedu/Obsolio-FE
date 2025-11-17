import { useState, useEffect } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import {
  Activity, Clock, CheckCircle, XCircle, Loader, PauseCircle,
  Play, Square, FileText, TrendingUp, Zap, Filter, RefreshCw,
  Eye, Database, AlertCircle
} from 'lucide-react';

const ActiveAgentsMonitorPage = () => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(10);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  // Simulated auto-refresh
  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        setLastRefresh(new Date());
      }, refreshInterval * 1000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, refreshInterval]);

  // Mock Stats
  const stats = [
    {
      label: 'Currently Running',
      value: '34',
      change: 'Active executions',
      icon: Play,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      label: 'Queued',
      value: '12',
      change: 'Waiting to execute',
      icon: Clock,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      label: 'Completed Today',
      value: '1,247',
      change: '98.6% success rate',
      icon: CheckCircle,
      color: 'from-green-500 to-emerald-500'
    },
    {
      label: 'Failed Today',
      value: '18',
      change: '1.4% error rate',
      icon: XCircle,
      color: 'from-red-500 to-pink-500'
    }
  ];

  // Mock Active Agents
  const activeAgents = [
    {
      id: 1,
      name: 'Customer Support Agent',
      tenant: 'TechCorp Industries',
      status: 'Running',
      progress: 65,
      started: '5 min ago',
      duration: '5m 23s',
      engine: 'Text Engine',
      user: 'John Doe'
    },
    {
      id: 2,
      name: 'Code Review Agent',
      tenant: 'DataDrive Analytics',
      status: 'Running',
      progress: 42,
      started: '12 min ago',
      duration: '12m 08s',
      engine: 'Code Engine',
      user: 'Sarah Johnson'
    },
    {
      id: 3,
      name: 'Data Analysis Agent',
      tenant: 'FinTech Ventures',
      status: 'Queued',
      progress: 0,
      started: 'In queue',
      duration: '-',
      engine: 'Data Engine',
      user: 'Mike Chen'
    },
    {
      id: 4,
      name: 'Content Writer Agent',
      tenant: 'Marketing Geniuses',
      status: 'Running',
      progress: 88,
      started: '3 min ago',
      duration: '3m 45s',
      engine: 'Text Engine',
      user: 'Emily Davis'
    },
    {
      id: 5,
      name: 'Email Assistant Agent',
      tenant: 'CloudScale Systems',
      status: 'Completed',
      progress: 100,
      started: '15 min ago',
      duration: '2m 18s',
      engine: 'Text Engine',
      user: 'Tom Wilson'
    },
    {
      id: 6,
      name: 'Research Agent',
      tenant: 'EduLearn Platform',
      status: 'Running',
      progress: 23,
      started: '18 min ago',
      duration: '18m 34s',
      engine: 'Web Engine',
      user: 'Lisa Anderson'
    },
    {
      id: 7,
      name: 'Sales Intelligence Agent',
      tenant: 'Innovate Solutions',
      status: 'Failed',
      progress: 45,
      started: '8 min ago',
      duration: '7m 56s',
      engine: 'Data Engine',
      user: 'David Brown'
    },
    {
      id: 8,
      name: 'HR Screening Agent',
      tenant: 'TechCorp Industries',
      status: 'Running',
      progress: 76,
      started: '6 min ago',
      duration: '6m 12s',
      engine: 'Document Engine',
      user: 'Jennifer White'
    },
    {
      id: 9,
      name: 'Translation Agent',
      tenant: 'HealthTech Solutions',
      status: 'Queued',
      progress: 0,
      started: 'In queue',
      duration: '-',
      engine: 'Text Engine',
      user: 'Robert Garcia'
    },
    {
      id: 10,
      name: 'Sentiment Analysis Agent',
      tenant: 'RetailBoost Co',
      status: 'Running',
      progress: 54,
      started: '9 min ago',
      duration: '9m 28s',
      engine: 'Text Engine',
      user: 'Maria Rodriguez'
    },
    {
      id: 11,
      name: 'Financial Advisor Agent',
      tenant: 'FinTech Ventures',
      status: 'Completed',
      progress: 100,
      started: '20 min ago',
      duration: '5m 42s',
      engine: 'Data Engine',
      user: 'James Martinez'
    },
    {
      id: 12,
      name: 'Healthcare Diagnosis Assistant',
      tenant: 'HealthTech Solutions',
      status: 'Running',
      progress: 31,
      started: '14 min ago',
      duration: '14m 19s',
      engine: 'Vision Engine',
      user: 'Patricia Lee'
    },
    {
      id: 13,
      name: 'E-commerce Product Recommender',
      tenant: 'RetailBoost Co',
      status: 'Queued',
      progress: 0,
      started: 'In queue',
      duration: '-',
      engine: 'Data Engine',
      user: 'Michael Taylor'
    },
    {
      id: 14,
      name: 'Legal Document Agent',
      tenant: 'Legal Eagle Partners',
      status: 'Running',
      progress: 67,
      started: '7 min ago',
      duration: '7m 03s',
      engine: 'Document Engine',
      user: 'Linda Thomas'
    },
    {
      id: 15,
      name: 'DevOps Pipeline Monitor',
      tenant: 'DevOps Masters',
      status: 'Failed',
      progress: 28,
      started: '11 min ago',
      duration: '10m 45s',
      engine: 'Code Engine',
      user: 'Charles Jackson'
    }
  ];

  // Mock Activity Feed
  const activityFeed = [
    { id: 1, type: 'completed', message: 'Customer Support Agent completed successfully', time: '30s ago', tenant: 'TechCorp' },
    { id: 2, type: 'started', message: 'Data Analysis Agent started execution', time: '1m ago', tenant: 'FinTech' },
    { id: 3, type: 'failed', message: 'Code Review Agent failed with error', time: '2m ago', tenant: 'DataDrive' },
    { id: 4, type: 'queued', message: 'Translation Agent added to queue', time: '3m ago', tenant: 'HealthTech' },
    { id: 5, type: 'completed', message: 'Email Assistant Agent completed', time: '4m ago', tenant: 'CloudScale' },
    { id: 6, type: 'started', message: 'Research Agent started execution', time: '5m ago', tenant: 'EduLearn' },
    { id: 7, type: 'paused', message: 'Sentiment Analysis Agent paused by user', time: '6m ago', tenant: 'RetailBoost' },
    { id: 8, type: 'completed', message: 'HR Screening Agent completed', time: '7m ago', tenant: 'TechCorp' },
    { id: 9, type: 'started', message: 'Financial Advisor Agent started', time: '8m ago', tenant: 'FinTech' },
    { id: 10, type: 'failed', message: 'Sales Intelligence Agent encountered error', time: '9m ago', tenant: 'Innovate' }
  ];

  // Performance Metrics
  const performanceMetrics = {
    avgExecutionTime: '4m 32s',
    successRate: '98.6%',
    engineUsage: {
      'Text Engine': 42,
      'Data Engine': 28,
      'Code Engine': 15,
      'Document Engine': 8,
      'Web Engine': 4,
      'Vision Engine': 2,
      'Audio Engine': 1
    }
  };

  // Filter logic
  const filteredAgents = activeAgents.filter(agent => {
    if (filterStatus === 'all') return true;
    return agent.status.toLowerCase() === filterStatus.toLowerCase();
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Running':
        return <Loader className="w-4 h-4 text-blue-400 animate-spin" />;
      case 'Queued':
        return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'Completed':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'Failed':
        return <XCircle className="w-4 h-4 text-red-400" />;
      case 'Paused':
        return <PauseCircle className="w-4 h-4 text-gray-400" />;
      default:
        return <Activity className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Running':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Queued':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Failed':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Paused':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getActivityTypeColor = (type) => {
    switch (type) {
      case 'completed':
        return 'text-green-400';
      case 'started':
        return 'text-blue-400';
      case 'failed':
        return 'text-red-400';
      case 'queued':
        return 'text-yellow-400';
      case 'paused':
        return 'text-gray-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Active Agents Monitor</h1>
            <p className="text-gray-400">Real-time monitoring of agent executions</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            {/* Auto Refresh Toggle */}
            <div className="flex items-center space-x-2 bg-gray-800 rounded-lg px-4 py-2 border border-gray-700">
              <RefreshCw className={`w-4 h-4 ${autoRefresh ? 'text-green-400 animate-spin' : 'text-gray-400'}`} />
              <span className="text-white text-sm font-semibold">Auto-refresh:</span>
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                  autoRefresh ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300'
                }`}
              >
                {autoRefresh ? 'ON' : 'OFF'}
              </button>
            </div>

            {/* Refresh Interval */}
            {autoRefresh && (
              <select
                value={refreshInterval}
                onChange={(e) => setRefreshInterval(Number(e.target.value))}
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500"
              >
                <option value={5}>5s</option>
                <option value={10}>10s</option>
                <option value={30}>30s</option>
              </select>
            )}
          </div>
        </div>

        {/* Last Refresh Info */}
        <div className="text-sm text-gray-400 text-right">
          Last updated: {lastRefresh.toLocaleTimeString()}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
                <p className="text-gray-400 text-sm font-medium mb-2">{stat.label}</p>
                <p className="text-gray-500 text-xs">{stat.change}</p>
              </div>
            );
          })}
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center space-x-2 mb-4">
              <Clock className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-bold text-white">Avg Execution Time</h3>
            </div>
            <div className="text-3xl font-bold text-white">{performanceMetrics.avgExecutionTime}</div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <h3 className="text-lg font-bold text-white">Success Rate</h3>
            </div>
            <div className="text-3xl font-bold text-green-400">{performanceMetrics.successRate}</div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
            <div className="flex items-center space-x-2 mb-4">
              <Database className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-bold text-white">Engine Usage</h3>
            </div>
            <div className="space-y-1">
              {Object.entries(performanceMetrics.engineUsage).slice(0, 3).map(([engine, percentage]) => (
                <div key={engine} className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">{engine}</span>
                  <span className="text-white font-semibold">{percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <span className="text-white font-semibold">Filter:</span>
            </div>
            <div className="flex items-center space-x-2">
              {['all', 'running', 'queued', 'completed', 'failed'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-colors ${
                    filterStatus === status
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Active Agents Table */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900/80">
                <tr>
                  <th className="text-left py-4 px-6 text-xs font-bold text-gray-400 uppercase">Agent</th>
                  <th className="text-left py-4 px-6 text-xs font-bold text-gray-400 uppercase">Tenant</th>
                  <th className="text-left py-4 px-6 text-xs font-bold text-gray-400 uppercase">Status</th>
                  <th className="text-left py-4 px-6 text-xs font-bold text-gray-400 uppercase">Progress</th>
                  <th className="text-left py-4 px-6 text-xs font-bold text-gray-400 uppercase">Started</th>
                  <th className="text-left py-4 px-6 text-xs font-bold text-gray-400 uppercase">Duration</th>
                  <th className="text-left py-4 px-6 text-xs font-bold text-gray-400 uppercase">Engine</th>
                  <th className="text-right py-4 px-6 text-xs font-bold text-gray-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAgents.map((agent) => (
                  <tr key={agent.id} className="border-t border-gray-700/50 hover:bg-gray-900/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-semibold text-white">{agent.name}</div>
                      <div className="text-xs text-gray-400">by {agent.user}</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-white">{agent.tenant}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(agent.status)}
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(agent.status)}`}>
                          {agent.status}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="w-full">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-400">{agent.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all ${
                              agent.status === 'Failed' ? 'bg-red-500' :
                              agent.status === 'Completed' ? 'bg-green-500' :
                              'bg-blue-500'
                            }`}
                            style={{ width: `${agent.progress}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-gray-400 text-sm">{agent.started}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-white font-mono text-sm">{agent.duration}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-purple-400 text-sm">{agent.engine}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors" title="View Logs">
                          <FileText className="w-4 h-4 text-blue-400" />
                        </button>
                        {agent.status === 'Running' && (
                          <>
                            <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors" title="Pause">
                              <PauseCircle className="w-4 h-4 text-yellow-400" />
                            </button>
                            <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors" title="Terminate">
                              <Square className="w-4 h-4 text-red-400" />
                            </button>
                          </>
                        )}
                        {agent.status === 'Paused' && (
                          <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors" title="Resume">
                            <Play className="w-4 h-4 text-green-400" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Real-time Activity Feed */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <Activity className="w-6 h-6 mr-2 text-purple-400" />
              Real-time Activity Feed
            </h2>
            <span className="text-sm text-gray-400">Last 20 events</span>
          </div>
          <div className="space-y-3">
            {activityFeed.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start justify-between p-3 bg-gray-900/50 rounded-lg border border-gray-700/50"
              >
                <div className="flex items-start space-x-3">
                  <div className={`mt-0.5 ${getActivityTypeColor(activity.type)}`}>
                    {activity.type === 'completed' && <CheckCircle className="w-4 h-4" />}
                    {activity.type === 'started' && <Play className="w-4 h-4" />}
                    {activity.type === 'failed' && <XCircle className="w-4 h-4" />}
                    {activity.type === 'queued' && <Clock className="w-4 h-4" />}
                    {activity.type === 'paused' && <PauseCircle className="w-4 h-4" />}
                  </div>
                  <div>
                    <p className="text-white text-sm">{activity.message}</p>
                    <p className="text-gray-400 text-xs mt-1">Tenant: {activity.tenant}</p>
                  </div>
                </div>
                <span className="text-gray-500 text-xs whitespace-nowrap">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ActiveAgentsMonitorPage;
