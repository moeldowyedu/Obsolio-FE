import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import AdminLayout from '../../components/layout/AdminLayout';
import { Card } from '../../components/common';
import { useTheme } from '../../contexts/ThemeContext';
import {
  Activity, Clock, CheckCircle, XCircle, Loader, PauseCircle,
  Play, Square, FileText, TrendingUp, Zap, Filter, RefreshCw,
  Eye, Database, AlertCircle
} from 'lucide-react';

const ActiveAgentsMonitorPage = () => {
  const { theme } = useTheme();
  const [filterStatus, setFilterStatus] = useState('all');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [refreshInterval, setRefreshInterval] = useState(10);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const location = useLocation();

  // Styles
  const textPrimary = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const textSecondary = theme === 'dark' ? 'text-gray-400' : 'text-slate-500';

  const COLORS = {
    blue: { bg: 'bg-blue-500', text: 'text-blue-500', lightBg: 'bg-blue-500/20', lightText: 'text-blue-400', paleBg: 'bg-blue-100', paleText: 'text-blue-600' },
    purple: { bg: 'bg-purple-500', text: 'text-purple-500', lightBg: 'bg-purple-500/20', lightText: 'text-purple-400', paleBg: 'bg-purple-100', paleText: 'text-purple-600' },
    green: { bg: 'bg-green-500', text: 'text-green-500', lightBg: 'bg-green-500/20', lightText: 'text-green-400', paleBg: 'bg-green-100', paleText: 'text-green-600' },
    indigo: { bg: 'bg-indigo-500', text: 'text-indigo-500', lightBg: 'bg-indigo-500/20', lightText: 'text-indigo-400', paleBg: 'bg-indigo-100', paleText: 'text-indigo-600' },
    yellow: { bg: 'bg-yellow-500', text: 'text-yellow-500', lightBg: 'bg-yellow-500/20', lightText: 'text-yellow-400', paleBg: 'bg-yellow-100', paleText: 'text-yellow-600' },
    red: { bg: 'bg-red-500', text: 'text-red-500', lightBg: 'bg-red-500/20', lightText: 'text-red-400', paleBg: 'bg-red-100', paleText: 'text-red-600' },
    orange: { bg: 'bg-orange-500', text: 'text-orange-500', lightBg: 'bg-orange-500/20', lightText: 'text-orange-400', paleBg: 'bg-orange-100', paleText: 'text-orange-600' },
    gray: { bg: 'bg-gray-500', text: 'text-gray-500', lightBg: 'bg-gray-500/20', lightText: 'text-gray-400', paleBg: 'bg-gray-100', paleText: 'text-gray-600' },
    cyan: { bg: 'bg-cyan-500', text: 'text-cyan-500', lightBg: 'bg-cyan-500/20', lightText: 'text-cyan-400', paleBg: 'bg-cyan-100', paleText: 'text-cyan-600' },
  };

  const getColor = (colorName) => {
    // Handle complex names or defaults
    let base = 'blue';
    if (colorName.includes('blue')) base = 'blue';
    else if (colorName.includes('green') || colorName.includes('emerald')) base = 'green';
    else if (colorName.includes('purple')) base = 'purple';
    else if (colorName.includes('yellow') || colorName.includes('orange')) base = 'yellow'; // Map orange/yellow together or separate if needed
    else if (colorName.includes('red') || colorName.includes('pink')) base = 'red';
    else if (colorName.includes('gray')) base = 'gray';
    else if (colorName.includes('cyan')) base = 'cyan';

    // Specific override for the 'queue' type colors often used
    if (colorName.includes('yellow') && colorName.includes('orange')) base = 'orange';

    const pal = COLORS[base] || COLORS.blue;
    return theme === 'dark'
      ? { bg: pal.lightBg, text: pal.lightText, raw: pal.bg }
      : { bg: pal.paleBg, text: pal.paleText, raw: pal.bg }
  };

  // Simulated auto-refresh
  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        setLastRefresh(new Date());
      }, refreshInterval * 1000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh, refreshInterval]);

  // TODO: Backend API needed - GET /admin/agent-runs/active-statistics
  // This endpoint should return real-time statistics of currently running agents
  const [stats, setStats] = useState([
    {
      label: 'Currently Running',
      value: '0',
      change: 'Active executions',
      icon: Play,
      color: 'blue'
    },
    {
      label: 'Queued',
      value: '0',
      change: 'Waiting to execute',
      icon: Clock,
      color: 'orange'
    },
    {
      label: 'Completed Today',
      value: '0',
      change: '0% success rate',
      icon: CheckCircle,
      color: 'green'
    },
    {
      label: 'Failed Today',
      value: '0',
      change: '0% error rate',
      icon: XCircle,
      color: 'red'
    }
  ]);

  // TODO: Backend API needed - GET /admin/agent-runs/active (real-time)
  // This endpoint should return currently executing agents with WebSocket updates or short polling
  // Expected response: array of { id, name, tenant, status, progress, started_at, duration_ms, engine, triggered_by_user }
  const [activeAgents, setActiveAgents] = useState([]);

  // TODO: Backend API needed - GET /admin/agent-runs/activity-feed (real-time)
  // This endpoint should return recent agent activity events (started, completed, failed, queued)
  const [activityFeed, setActivityFeed] = useState([]);

  // TODO: Backend API needed - GET /admin/agent-runs/performance-metrics
  // This endpoint should return aggregated performance metrics
  const [performanceMetrics, setPerformanceMetrics] = useState({
    avgExecutionTime: '-',
    successRate: '0%',
    engineUsage: {}
  });

  // Filter logic
  const filteredAgents = activeAgents.filter(agent => {
    if (filterStatus === 'all') return true;
    return agent.status.toLowerCase() === filterStatus.toLowerCase();
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Running':
        return <Loader className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'Queued':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'Completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      case 'Paused':
        return <PauseCircle className="w-4 h-4 text-gray-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
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
        return 'text-green-500';
      case 'started':
        return 'text-blue-500';
      case 'failed':
        return 'text-red-500';
      case 'queued':
        return 'text-yellow-500';
      case 'paused':
        return 'text-gray-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className={`text-3xl font-bold mb-2 ${textPrimary}`}>Active Agents Monitor</h1>
            <p className={textSecondary}>Real-time monitoring of agent executions</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            {/* Auto Refresh Toggle */}
            <div className={`flex items-center space-x-2 rounded-lg px-4 py-2 border transition-all ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-slate-200 shadow-sm'}`}>
              <RefreshCw className={`w-4 h-4 ${autoRefresh ? 'text-green-500 animate-spin' : textSecondary}`} />
              <span className={`text-sm font-semibold ${textPrimary}`}>Auto-refresh:</span>
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`px-3 py-1 rounded text-xs font-bold transition-colors ${autoRefresh
                  ? 'bg-green-600 text-white'
                  : theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-slate-200 text-slate-500'
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
                className={`px-4 py-2 border rounded-lg text-sm focus:outline-none focus:border-purple-500 transition-all ${theme === 'dark'
                    ? 'bg-gray-800 border-gray-700 text-white'
                    : 'bg-white border-slate-200 text-slate-700 shadow-sm'
                  }`}
              >
                <option value={5}>5s</option>
                <option value={10}>10s</option>
                <option value={30}>30s</option>
              </select>
            )}
          </div>
        </div>

        {/* Last Refresh Info */}
        <div className={`text-sm text-right ${textSecondary}`}>
          Last updated: {lastRefresh.toLocaleTimeString()}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const colors = getColor(stat.color);
            return (
              <Card key={index} hover>
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${colors.bg}`}>
                    <Icon className={`w-6 h-6 ${colors.text}`} />
                  </div>
                </div>
                <h3 className={`text-3xl font-bold mb-1 ${textPrimary}`}>{stat.value}</h3>
                <p className={`${textSecondary} text-sm font-medium mb-2`}>{stat.label}</p>
                <p className={`${textSecondary} text-xs`}>{stat.change}</p>
              </Card>
            );
          })}
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <div className="flex items-center space-x-2 mb-4">
              <Clock className="w-5 h-5 text-purple-500" />
              <h3 className={`text-lg font-bold ${textPrimary}`}>Avg Execution Time</h3>
            </div>
            <div className={`text-3xl font-bold ${textPrimary}`}>{performanceMetrics.avgExecutionTime}</div>
          </Card>

          <Card>
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <h3 className={`text-lg font-bold ${textPrimary}`}>Success Rate</h3>
            </div>
            <div className="text-3xl font-bold text-green-500">{performanceMetrics.successRate}</div>
          </Card>

          <Card>
            <div className="flex items-center space-x-2 mb-4">
              <Database className="w-5 h-5 text-blue-500" />
              <h3 className={`text-lg font-bold ${textPrimary}`}>Engine Usage</h3>
            </div>
            <div className="space-y-1">
              {Object.entries(performanceMetrics.engineUsage).slice(0, 3).map(([engine, percentage]) => (
                <div key={engine} className="flex items-center justify-between text-sm">
                  <span className={textSecondary}>{engine}</span>
                  <span className={`${textPrimary} font-semibold`}>{percentage}%</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card padding="sm" className="transition-all">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className={`w-5 h-5 ${textSecondary}`} />
              <span className={`${textPrimary} font-semibold`}>Filter:</span>
            </div>
            <div className="flex items-center space-x-2">
              {['all', 'running', 'queued', 'completed', 'failed'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-colors ${filterStatus === status
                    ? 'bg-purple-600 text-white shadow-md'
                    : theme === 'dark'
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </Card>

        {/* Active Agents Table */}
        <Card padding="none" className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className={theme === 'dark' ? 'bg-gray-900/50' : 'bg-slate-50'}>
                <tr>
                  <th className={`text-left py-4 px-6 text-xs font-bold uppercase ${textSecondary}`}>Agent</th>
                  <th className={`text-left py-4 px-6 text-xs font-bold uppercase ${textSecondary}`}>Tenant</th>
                  <th className={`text-left py-4 px-6 text-xs font-bold uppercase ${textSecondary}`}>Status</th>
                  <th className={`text-left py-4 px-6 text-xs font-bold uppercase ${textSecondary}`}>Progress</th>
                  <th className={`text-left py-4 px-6 text-xs font-bold uppercase ${textSecondary}`}>Started</th>
                  <th className={`text-left py-4 px-6 text-xs font-bold uppercase ${textSecondary}`}>Duration</th>
                  <th className={`text-left py-4 px-6 text-xs font-bold uppercase ${textSecondary}`}>Engine</th>
                  <th className={`text-right py-4 px-6 text-xs font-bold uppercase ${textSecondary}`}>Actions</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${theme === 'dark' ? 'divide-gray-800' : 'divide-slate-100'}`}>
                {filteredAgents.map((agent) => (
                  <tr key={agent.id} className={`transition-colors ${theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-slate-50'}`}>
                    <td className="py-4 px-6">
                      <div className={`font-semibold ${textPrimary}`}>{agent.name}</div>
                      <div className={`text-xs ${textSecondary}`}>by {agent.user}</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={textPrimary}>{agent.tenant}</span>
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
                          <span className={`text-xs ${textSecondary}`}>{agent.progress}%</span>
                        </div>
                        <div className={`w-full rounded-full h-2 ${theme === 'dark' ? 'bg-gray-700' : 'bg-slate-200'}`}>
                          <div
                            className={`h-2 rounded-full transition-all ${agent.status === 'Failed' ? 'bg-red-500' :
                                agent.status === 'Completed' ? 'bg-green-500' :
                                  'bg-blue-500'
                              }`}
                            style={{ width: `${agent.progress}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`${textSecondary} text-sm`}>{agent.started}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`${textPrimary} font-mono text-sm`}>{agent.duration}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-purple-500 text-sm">{agent.engine}</span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end space-x-2">
                        <button className={`p-2 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-slate-200'}`} title="View Logs">
                          <FileText className="w-4 h-4 text-blue-500" />
                        </button>
                        {agent.status === 'Running' && (
                          <>
                            <button className={`p-2 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-slate-200'}`} title="Pause">
                              <PauseCircle className="w-4 h-4 text-yellow-500" />
                            </button>
                            <button className={`p-2 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-slate-200'}`} title="Terminate">
                              <Square className="w-4 h-4 text-red-500" />
                            </button>
                          </>
                        )}
                        {agent.status === 'Paused' && (
                          <button className={`p-2 rounded-lg transition-colors ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-slate-200'}`} title="Resume">
                            <Play className="w-4 h-4 text-green-500" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Real-time Activity Feed */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-2xl font-bold ${textPrimary} flex items-center`}>
              <Activity className="w-6 h-6 mr-2 text-purple-500" />
              Real-time Activity Feed
            </h2>
            <span className={`text-sm ${textSecondary}`}>Last 20 events</span>
          </div>
          <div className="space-y-3">
            {activityFeed.map((activity) => (
              <div
                key={activity.id}
                className={`flex items-start justify-between p-3 rounded-lg border transition-all ${theme === 'dark'
                    ? 'bg-gray-900/50 border-gray-700/50'
                    : 'bg-slate-50 border-slate-200'
                  }`}
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
                    <p className={`${textPrimary} text-sm`}>{activity.message}</p>
                    <p className={`${textSecondary} text-xs mt-1`}>Tenant: {activity.tenant}</p>
                  </div>
                </div>
                <span className={`${textSecondary} text-xs whitespace-nowrap`}>{activity.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default ActiveAgentsMonitorPage;
