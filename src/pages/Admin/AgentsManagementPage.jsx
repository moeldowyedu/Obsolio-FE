import { useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import {
  Bot, Star, TrendingUp, FileText, Plus, Edit, Eye, Archive,
  CheckCircle, XCircle, Flag, Trash2, BarChart3, Users,
  Globe, Lock, AlertCircle, Crown, Zap, Shield
} from 'lucide-react';

const AgentsManagementPage = () => {
  const [activeTab, setActiveTab] = useState('official');

  // Official Agents Stats
  const officialStats = [
    {
      label: 'Total Official Agents',
      value: '24',
      change: '+3 this month',
      icon: Bot,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      label: 'Published',
      value: '18',
      change: '75% live',
      icon: CheckCircle,
      color: 'from-green-500 to-emerald-500'
    },
    {
      label: 'Draft',
      value: '4',
      change: 'In development',
      icon: FileText,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      label: 'Total Deployments',
      value: '12.4K',
      change: '+2.3K this month',
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-500'
    }
  ];

  // Tenant Agents Stats
  const tenantStats = [
    {
      label: 'Total Tenant Agents',
      value: '1,247',
      change: '+89 this week',
      icon: Users,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      label: 'Public (Marketplace)',
      value: '234',
      change: '18.8% published',
      icon: Globe,
      color: 'from-green-500 to-emerald-500'
    },
    {
      label: 'Private',
      value: '1,013',
      change: '81.2% private',
      icon: Lock,
      color: 'from-gray-500 to-slate-500'
    },
    {
      label: 'Flagged for Review',
      value: '12',
      change: 'Needs attention',
      icon: AlertCircle,
      color: 'from-red-500 to-orange-500'
    }
  ];

  // Mock Official Agents
  const officialAgents = [
    {
      id: 1,
      name: 'Customer Support Agent',
      category: 'Business',
      version: 'v2.1.0',
      status: 'Published',
      deployments: 2456,
      rating: 4.8,
      icon: '💬',
      description: 'AI-powered customer support automation'
    },
    {
      id: 2,
      name: 'Code Review Agent',
      category: 'Development',
      version: 'v3.0.2',
      status: 'Published',
      deployments: 1823,
      rating: 4.9,
      icon: '🔍',
      description: 'Automated code quality and security reviews'
    },
    {
      id: 3,
      name: 'Data Analysis Agent',
      category: 'Analytics',
      version: 'v1.8.5',
      status: 'Published',
      deployments: 1567,
      rating: 4.7,
      icon: '📊',
      description: 'Advanced data pattern recognition'
    },
    {
      id: 4,
      name: 'Content Writer Agent',
      category: 'Marketing',
      version: 'v2.3.1',
      status: 'Published',
      deployments: 2134,
      rating: 4.6,
      icon: '✍️',
      description: 'SEO-optimized content generation'
    },
    {
      id: 5,
      name: 'Email Assistant Agent',
      category: 'Productivity',
      version: 'v1.5.0',
      status: 'Published',
      deployments: 1892,
      rating: 4.5,
      icon: '📧',
      description: 'Smart email drafting and responses'
    },
    {
      id: 6,
      name: 'Research Agent',
      category: 'Research',
      version: 'v2.0.0',
      status: 'Draft',
      deployments: 0,
      rating: 0,
      icon: '🔬',
      description: 'Academic research and literature review'
    },
    {
      id: 7,
      name: 'Sales Intelligence Agent',
      category: 'Sales',
      version: 'v1.9.3',
      status: 'Published',
      deployments: 1456,
      rating: 4.7,
      icon: '💼',
      description: 'Lead scoring and sales insights'
    },
    {
      id: 8,
      name: 'HR Screening Agent',
      category: 'Human Resources',
      version: 'v1.2.0',
      status: 'Published',
      deployments: 987,
      rating: 4.4,
      icon: '👥',
      description: 'Resume screening and candidate matching'
    },
    {
      id: 9,
      name: 'Translation Agent',
      category: 'Language',
      version: 'v3.1.0',
      status: 'Published',
      deployments: 2789,
      rating: 4.9,
      icon: '🌍',
      description: 'Multi-language translation with context'
    },
    {
      id: 10,
      name: 'Sentiment Analysis Agent',
      category: 'Analytics',
      version: 'v1.7.2',
      status: 'Published',
      deployments: 1234,
      rating: 4.6,
      icon: '😊',
      description: 'Social media and feedback sentiment analysis'
    },
    {
      id: 11,
      name: 'Legal Document Agent',
      category: 'Legal',
      version: 'v0.9.0',
      status: 'Draft',
      deployments: 0,
      rating: 0,
      icon: '⚖️',
      description: 'Contract review and legal analysis'
    },
    {
      id: 12,
      name: 'Financial Advisor Agent',
      category: 'Finance',
      version: 'v2.2.0',
      status: 'Published',
      deployments: 1678,
      rating: 4.8,
      icon: '💰',
      description: 'Investment insights and financial planning'
    }
  ];

  // Mock Tenant Created Agents
  const tenantAgents = [
    {
      id: 1,
      name: 'Healthcare Diagnosis Assistant',
      createdBy: 'HealthTech Solutions',
      tenantId: 'HT-1234',
      visibility: 'Public',
      status: 'Approved',
      deployments: 234,
      flagged: false,
      createdDate: '2024-09-15'
    },
    {
      id: 2,
      name: 'E-commerce Product Recommender',
      createdBy: 'RetailBoost Co',
      tenantId: 'RB-5678',
      visibility: 'Public',
      status: 'Approved',
      deployments: 189,
      flagged: false,
      createdDate: '2024-08-22'
    },
    {
      id: 3,
      name: 'Internal IT Support Bot',
      createdBy: 'TechCorp Industries',
      tenantId: 'TC-9012',
      visibility: 'Private',
      status: 'Active',
      deployments: 1,
      flagged: false,
      createdDate: '2024-10-05'
    },
    {
      id: 4,
      name: 'Student Tutoring Agent',
      createdBy: 'EduLearn Platform',
      tenantId: 'EL-3456',
      visibility: 'Public',
      status: 'Pending Review',
      deployments: 0,
      flagged: true,
      createdDate: '2024-11-10'
    },
    {
      id: 5,
      name: 'Risk Assessment Agent',
      createdBy: 'FinTech Ventures',
      tenantId: 'FV-7890',
      visibility: 'Private',
      status: 'Active',
      deployments: 1,
      flagged: false,
      createdDate: '2024-07-18'
    },
    {
      id: 6,
      name: 'Social Media Manager',
      createdBy: 'Marketing Geniuses',
      tenantId: 'MG-2345',
      visibility: 'Public',
      status: 'Approved',
      deployments: 156,
      flagged: false,
      createdDate: '2024-06-30'
    },
    {
      id: 7,
      name: 'Inventory Optimizer',
      createdBy: 'LogisticsPro Network',
      tenantId: 'LP-6789',
      visibility: 'Private',
      status: 'Active',
      deployments: 1,
      flagged: false,
      createdDate: '2024-09-25'
    },
    {
      id: 8,
      name: 'Legal Case Analyzer',
      createdBy: 'Legal Eagle Partners',
      tenantId: 'LE-4567',
      visibility: 'Public',
      status: 'Pending Review',
      deployments: 0,
      flagged: true,
      createdDate: '2024-11-12'
    },
    {
      id: 9,
      name: 'DevOps Pipeline Monitor',
      createdBy: 'DevOps Masters',
      tenantId: 'DM-8901',
      visibility: 'Private',
      status: 'Active',
      deployments: 1,
      flagged: false,
      createdDate: '2024-10-20'
    },
    {
      id: 10,
      name: 'Patient Care Coordinator',
      createdBy: 'HealthTech Solutions',
      tenantId: 'HT-1234',
      visibility: 'Private',
      status: 'Active',
      deployments: 1,
      flagged: false,
      createdDate: '2024-08-15'
    },
    {
      id: 11,
      name: 'Content Moderation Agent',
      createdBy: 'Creative Studios XYZ',
      tenantId: 'CS-5432',
      visibility: 'Public',
      status: 'Pending Review',
      deployments: 0,
      flagged: true,
      createdDate: '2024-11-14'
    },
    {
      id: 12,
      name: 'Supply Chain Forecaster',
      createdBy: 'DataDrive Analytics',
      tenantId: 'DD-0987',
      visibility: 'Public',
      status: 'Approved',
      deployments: 278,
      flagged: false,
      createdDate: '2024-05-12'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Published':
      case 'Approved':
      case 'Active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Draft':
      case 'Pending Review':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Deprecated':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getVisibilityIcon = (visibility) => {
    return visibility === 'Public' ? <Globe className="w-4 h-4" /> : <Lock className="w-4 h-4" />;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Agents Management</h1>
            <p className="text-gray-400">Manage official and tenant-created AI agents</p>
          </div>
          {activeTab === 'official' && (
            <button className="mt-4 md:mt-0 flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all">
              <Plus className="w-5 h-5" />
              <span className="font-semibold">Create Official Agent</span>
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex space-x-2 bg-gray-800/50 backdrop-blur-sm rounded-xl p-2 border border-gray-700/50">
          <button
            onClick={() => setActiveTab('official')}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'official'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Crown className="w-5 h-5" />
              <span>Aasim Official Agents</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('tenant')}
            className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === 'tenant'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <div className="flex items-center justify-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Tenant Created Agents</span>
            </div>
          </button>
        </div>

        {/* Official Agents Tab */}
        {activeTab === 'official' && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {officialStats.map((stat, index) => {
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

            {/* Official Agents Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {officialAgents.map((agent) => (
                <div
                  key={agent.id}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-purple-500/50 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{agent.icon}</div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(agent.status)}`}>
                      {agent.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2">{agent.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{agent.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Category</span>
                      <span className="text-white font-semibold">{agent.category}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Version</span>
                      <span className="text-purple-400 font-mono">{agent.version}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Deployments</span>
                      <span className="text-green-400 font-semibold">{agent.deployments.toLocaleString()}</span>
                    </div>
                    {agent.rating > 0 && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Rating</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-white font-semibold">{agent.rating}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button className="flex items-center justify-center space-x-1 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-xs">
                      <Edit className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                    <button className="flex items-center justify-center space-x-1 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-xs">
                      <BarChart3 className="w-3 h-3" />
                      <span>Analytics</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <button className="flex items-center justify-center space-x-1 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-xs">
                      {agent.status === 'Published' ? (
                        <>
                          <Archive className="w-3 h-3" />
                          <span>Unpublish</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-3 h-3" />
                          <span>Publish</span>
                        </>
                      )}
                    </button>
                    <button className="flex items-center justify-center space-x-1 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-xs">
                      <XCircle className="w-3 h-3" />
                      <span>Deprecate</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Tenant Created Agents Tab */}
        {activeTab === 'tenant' && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {tenantStats.map((stat, index) => {
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

            {/* Tenant Agents Table */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-900/80">
                    <tr>
                      <th className="text-left py-4 px-6 text-xs font-bold text-gray-400 uppercase">Agent Name</th>
                      <th className="text-left py-4 px-6 text-xs font-bold text-gray-400 uppercase">Created By</th>
                      <th className="text-left py-4 px-6 text-xs font-bold text-gray-400 uppercase">Visibility</th>
                      <th className="text-left py-4 px-6 text-xs font-bold text-gray-400 uppercase">Status</th>
                      <th className="text-left py-4 px-6 text-xs font-bold text-gray-400 uppercase">Deployments</th>
                      <th className="text-left py-4 px-6 text-xs font-bold text-gray-400 uppercase">Created</th>
                      <th className="text-right py-4 px-6 text-xs font-bold text-gray-400 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tenantAgents.map((agent) => (
                      <tr key={agent.id} className="border-t border-gray-700/50 hover:bg-gray-900/50 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-2">
                            {agent.flagged && <Flag className="w-4 h-4 text-red-400" />}
                            <span className="font-semibold text-white">{agent.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div>
                            <div className="text-white font-medium">{agent.createdBy}</div>
                            <div className="text-xs text-gray-400">{agent.tenantId}</div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-2">
                            {getVisibilityIcon(agent.visibility)}
                            <span className="text-white text-sm">{agent.visibility}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(agent.status)}`}>
                            {agent.status}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-white font-semibold">{agent.deployments}</span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-gray-400 text-sm">{agent.createdDate}</span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center justify-end space-x-2">
                            <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors" title="View Details">
                              <Eye className="w-4 h-4 text-blue-400" />
                            </button>
                            {agent.status === 'Pending Review' && (
                              <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors" title="Approve">
                                <CheckCircle className="w-4 h-4 text-green-400" />
                              </button>
                            )}
                            <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors" title={agent.flagged ? 'Unflag' : 'Flag'}>
                              <Flag className={`w-4 h-4 ${agent.flagged ? 'text-red-400' : 'text-gray-400'}`} />
                            </button>
                            <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors" title="Delete">
                              <Trash2 className="w-4 h-4 text-red-400" />
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
      </div>
    </AdminLayout>
  );
};

export default AgentsManagementPage;
