import { useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import {
  Cpu, Eye, Ear, FileText, Code, File, Database, Globe,
  Activity, CheckCircle, AlertTriangle, XCircle, Settings,
  TrendingUp, Zap, Clock, BarChart3, RefreshCw, Power
} from 'lucide-react';

const EngineManagementPage = () => {
  const [selectedEngine, setSelectedEngine] = useState(null);

  // Mock Stats
  const stats = [
    {
      label: 'Total Engines',
      value: '7',
      change: 'All systems operational',
      icon: Cpu,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      label: 'Active Engines',
      value: '6',
      change: '1 under maintenance',
      icon: CheckCircle,
      color: 'from-green-500 to-emerald-500'
    },
    {
      label: 'Total Requests',
      value: '2.4M',
      change: 'This month',
      icon: Activity,
      color: 'from-purple-500 to-pink-500'
    },
    {
      label: 'Avg Latency',
      value: '245ms',
      change: '-12ms vs last month',
      icon: Zap,
      color: 'from-orange-500 to-red-500'
    }
  ];

  // Mock Engines Data
  const engines = [
    {
      id: 1,
      name: 'Vision Engine',
      icon: Eye,
      status: 'Operational',
      version: 'v3.2.1',
      uptime: 99.98,
      requestCount: 456789,
      avgLatency: '180ms',
      color: 'from-blue-500 to-cyan-500',
      iconColor: 'text-blue-400',
      description: 'Image recognition and computer vision AI'
    },
    {
      id: 2,
      name: 'Audio Engine',
      icon: Ear,
      status: 'Operational',
      version: 'v2.8.3',
      uptime: 99.95,
      requestCount: 234567,
      avgLatency: '210ms',
      color: 'from-green-500 to-emerald-500',
      iconColor: 'text-green-400',
      description: 'Speech recognition and audio processing'
    },
    {
      id: 3,
      name: 'Text Engine',
      icon: FileText,
      status: 'Operational',
      version: 'v4.1.0',
      uptime: 99.99,
      requestCount: 892345,
      avgLatency: '125ms',
      color: 'from-purple-500 to-pink-500',
      iconColor: 'text-purple-400',
      description: 'Natural language processing and understanding'
    },
    {
      id: 4,
      name: 'Code Engine',
      icon: Code,
      status: 'Degraded',
      version: 'v3.5.2',
      uptime: 97.50,
      requestCount: 178234,
      avgLatency: '450ms',
      color: 'from-yellow-500 to-orange-500',
      iconColor: 'text-yellow-400',
      description: 'Code analysis, generation, and debugging'
    },
    {
      id: 5,
      name: 'Document Engine',
      icon: File,
      status: 'Operational',
      version: 'v2.9.1',
      uptime: 99.92,
      requestCount: 345678,
      avgLatency: '290ms',
      color: 'from-indigo-500 to-purple-500',
      iconColor: 'text-indigo-400',
      description: 'Document parsing and content extraction'
    },
    {
      id: 6,
      name: 'Data Engine',
      icon: Database,
      status: 'Operational',
      version: 'v3.0.5',
      uptime: 99.96,
      requestCount: 567890,
      avgLatency: '195ms',
      color: 'from-cyan-500 to-blue-500',
      iconColor: 'text-cyan-400',
      description: 'Data analysis and pattern recognition'
    },
    {
      id: 7,
      name: 'Web Engine',
      icon: Globe,
      status: 'Operational',
      version: 'v2.7.8',
      uptime: 99.94,
      requestCount: 423456,
      avgLatency: '320ms',
      color: 'from-pink-500 to-rose-500',
      iconColor: 'text-pink-400',
      description: 'Web scraping and content understanding'
    }
  ];

  // Mock Error Logs
  const recentErrors = [
    {
      id: 1,
      engine: 'Code Engine',
      type: 'warning',
      message: 'High latency detected (>400ms)',
      timestamp: '2 minutes ago'
    },
    {
      id: 2,
      engine: 'Vision Engine',
      type: 'info',
      message: 'Cache cleared successfully',
      timestamp: '15 minutes ago'
    },
    {
      id: 3,
      engine: 'Code Engine',
      type: 'error',
      message: 'Rate limit exceeded for tenant TC-1234',
      timestamp: '1 hour ago'
    },
    {
      id: 4,
      engine: 'Audio Engine',
      type: 'warning',
      message: 'Memory usage at 85%',
      timestamp: '2 hours ago'
    },
    {
      id: 5,
      engine: 'Data Engine',
      type: 'info',
      message: 'Version updated to v3.0.5',
      timestamp: '3 hours ago'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Operational':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'Degraded':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'Down':
        return <XCircle className="w-5 h-5 text-red-400" />;
      default:
        return <Activity className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Operational':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Degraded':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Down':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getErrorTypeColor = (type) => {
    switch (type) {
      case 'error':
        return 'bg-red-900/50 border-red-500/50 text-red-300';
      case 'warning':
        return 'bg-yellow-900/50 border-yellow-500/50 text-yellow-300';
      case 'info':
        return 'bg-blue-900/50 border-blue-500/50 text-blue-300';
      default:
        return 'bg-gray-900/50 border-gray-500/50 text-gray-300';
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Engine Management</h1>
            <p className="text-gray-400">Monitor and manage Precision AI Engines Suite</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all">
              <RefreshCw className="w-5 h-5" />
              <span className="font-semibold">Refresh Status</span>
            </button>
            <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all">
              <Settings className="w-5 h-5" />
              <span className="font-semibold">System Config</span>
            </button>
          </div>
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

        {/* Engines Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {engines.map((engine) => {
            const Icon = engine.icon;
            return (
              <div
                key={engine.id}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all cursor-pointer"
                onClick={() => setSelectedEngine(engine)}
              >
                {/* Engine Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${engine.color} flex items-center justify-center`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(engine.status)}
                  </div>
                </div>

                {/* Engine Name */}
                <h3 className="text-xl font-bold text-white mb-1">{engine.name}</h3>
                <p className="text-gray-400 text-xs mb-4">{engine.description}</p>

                {/* Status Badge */}
                <div className="mb-4">
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(engine.status)}`}>
                    {engine.status}
                  </span>
                </div>

                {/* Stats */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Version</span>
                    <span className="text-white font-semibold">{engine.version}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Uptime</span>
                    <span className="text-green-400 font-semibold">{engine.uptime}%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Requests</span>
                    <span className="text-white font-semibold">{engine.requestCount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Latency</span>
                    <span className="text-purple-400 font-semibold">{engine.avgLatency}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2">
                  <button className="flex items-center justify-center space-x-1 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-xs">
                    <Settings className="w-3 h-3" />
                    <span>Configure</span>
                  </button>
                  <button className="flex items-center justify-center space-x-1 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-xs">
                    <BarChart3 className="w-3 h-3" />
                    <span>Metrics</span>
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <button className="flex items-center justify-center space-x-1 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-xs">
                    <RefreshCw className="w-3 h-3" />
                    <span>Update</span>
                  </button>
                  <button className="flex items-center justify-center space-x-1 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-xs">
                    <Power className="w-3 h-3" />
                    <span>Toggle</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Performance Charts Section */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <BarChart3 className="w-6 h-6 mr-2 text-purple-400" />
              Performance Overview
            </h2>
            <select className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500">
              <option>Last 24 Hours</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-900/50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-400 mb-2">Request Volume</h3>
              <div className="text-3xl font-bold text-white mb-1">2.4M</div>
              <div className="text-xs text-green-400">+18.5% from last period</div>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-400 mb-2">Success Rate</h3>
              <div className="text-3xl font-bold text-white mb-1">99.2%</div>
              <div className="text-xs text-green-400">+0.3% from last period</div>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-400 mb-2">Error Rate</h3>
              <div className="text-3xl font-bold text-white mb-1">0.8%</div>
              <div className="text-xs text-red-400">+0.1% from last period</div>
            </div>
          </div>
        </div>

        {/* Recent Errors/Warnings */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white flex items-center">
              <AlertTriangle className="w-6 h-6 mr-2 text-yellow-400" />
              Recent Events & Logs
            </h2>
            <button className="text-purple-400 hover:text-purple-300 text-sm font-semibold">
              View All Logs
            </button>
          </div>
          <div className="space-y-3">
            {recentErrors.map((error) => (
              <div
                key={error.id}
                className={`rounded-lg p-4 border ${getErrorTypeColor(error.type)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold">{error.engine}</span>
                      <span className={`px-2 py-0.5 rounded text-xs font-semibold uppercase ${
                        error.type === 'error' ? 'bg-red-500/30' :
                        error.type === 'warning' ? 'bg-yellow-500/30' : 'bg-blue-500/30'
                      }`}>
                        {error.type}
                      </span>
                    </div>
                    <p className="text-sm">{error.message}</p>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{error.timestamp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Version Management */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <TrendingUp className="w-6 h-6 mr-2 text-green-400" />
            Version Management
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-900/50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-400 mb-3">Current Versions</h3>
              <div className="space-y-2">
                {engines.slice(0, 4).map((engine) => (
                  <div key={engine.id} className="flex items-center justify-between text-sm">
                    <span className="text-white">{engine.name}</span>
                    <span className="text-purple-400 font-mono">{engine.version}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-400 mb-3">Available Updates</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white">Vision Engine</span>
                  <span className="text-green-400 font-mono">v3.3.0 available</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white">Code Engine</span>
                  <span className="text-green-400 font-mono">v3.6.0 available</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white">Audio Engine</span>
                  <span className="text-green-400 font-mono">v2.9.0 available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EngineManagementPage;
