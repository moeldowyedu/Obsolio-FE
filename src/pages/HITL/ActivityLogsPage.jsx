import { useState } from 'react';
import {
  Download, Search, Filter, Clock, User, CheckCircle, XCircle,
  AlertTriangle, ChevronDown, ChevronUp, Calendar, Activity,
  TrendingUp, BarChart3, X, Radio, PlayCircle, PauseCircle
} from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';

const ActivityLogsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAgent, setFilterAgent] = useState('all');
  const [filterAction, setFilterAction] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterUser, setFilterUser] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [expandedRows, setExpandedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [realtimeStreaming, setRealtimeStreaming] = useState(false);
  const [dateRange, setDateRange] = useState('today');
  const itemsPerPage = 10;

  // Mock activity data
  const [activities] = useState([
    {
      id: '1',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      agent: 'Legal Document Analyzer',
      agentIcon: '⚖️',
      action: 'Contract Review',
      actionType: 'review',
      user: 'Sarah Johnson',
      userEmail: 'sarah.j@company.com',
      status: 'approved',
      duration: '3m 24s',
      confidence: 72,
      details: {
        documentName: 'Vendor_Agreement_2024.pdf',
        decision: 'Approved with amendments',
        comment: 'Reviewed manually - clauses acceptable',
        affectedSections: ['Section 3.2 - Payment Terms', 'Section 5.4 - Liability'],
        riskLevel: 'Medium',
        complianceCheck: 'Passed'
      }
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 1000 * 60 * 12),
      agent: 'Financial Audit AI',
      agentIcon: '💰',
      action: 'Transaction Validation',
      actionType: 'validation',
      user: 'Michael Chen',
      userEmail: 'michael.c@company.com',
      status: 'rejected',
      duration: '1m 45s',
      confidence: 68,
      details: {
        transactionId: 'TXN-2024-10847',
        amount: '$45,320.00',
        vendor: 'TechSupply Co',
        reason: 'Vendor not on approved list',
        comment: 'Requires vendor approval first',
        riskLevel: 'High'
      }
    },
    {
      id: '3',
      timestamp: new Date(Date.now() - 1000 * 60 * 20),
      agent: 'Content Moderation AI',
      agentIcon: '🛡️',
      action: 'Content Review',
      actionType: 'moderation',
      user: 'Emma Rodriguez',
      userEmail: 'emma.r@company.com',
      status: 'approved',
      duration: '2m 10s',
      confidence: 65,
      details: {
        contentId: 'POST-89234',
        contentType: 'User Comment',
        flags: ['Borderline language'],
        decision: 'Approved - context appropriate',
        comment: 'Context shows no violation',
        actionTaken: 'No action required'
      }
    },
    {
      id: '4',
      timestamp: new Date(Date.now() - 1000 * 60 * 35),
      agent: 'HR Recruitment Assistant',
      agentIcon: '👥',
      action: 'Candidate Screening',
      actionType: 'screening',
      user: 'David Kim',
      userEmail: 'david.k@company.com',
      status: 'approved',
      duration: '45s',
      confidence: 88,
      details: {
        candidateName: 'Alex Thompson',
        position: 'Senior Software Engineer',
        matchScore: '88%',
        decision: 'Proceed to interview',
        comment: 'Strong technical background',
        nextSteps: ['Schedule technical interview', 'Send coding challenge']
      }
    },
    {
      id: '5',
      timestamp: new Date(Date.now() - 1000 * 60 * 48),
      agent: 'Customer Support AI',
      agentIcon: '💬',
      action: 'Refund Authorization',
      actionType: 'authorization',
      user: 'Lisa Martinez',
      userEmail: 'lisa.m@company.com',
      status: 'escalated',
      duration: '5m 12s',
      confidence: 75,
      details: {
        ticketId: 'SUP-45678',
        customer: 'Premium Customer',
        orderValue: '$899.00',
        decision: 'Escalated to senior support',
        comment: 'Requires manager approval for partial refund',
        escalationReason: 'Outside policy window'
      }
    },
    {
      id: '6',
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      agent: 'Invoice Validator',
      agentIcon: '📄',
      action: 'Payment Approval',
      actionType: 'approval',
      user: 'Michael Chen',
      userEmail: 'michael.c@company.com',
      status: 'approved',
      duration: '1m 20s',
      confidence: 92,
      details: {
        invoiceId: 'INV-2024-3421',
        vendor: 'Office Supplies Plus',
        amount: '$2,847.50',
        decision: 'Approved',
        comment: 'PO match verified',
        variance: 'Minor (5 items)',
        autoApproved: false
      }
    },
    {
      id: '7',
      timestamp: new Date(Date.now() - 1000 * 60 * 80),
      agent: 'Code Review Assistant',
      agentIcon: '💻',
      action: 'Security Review',
      actionType: 'review',
      user: 'Emma Rodriguez',
      userEmail: 'emma.r@company.com',
      status: 'rejected',
      duration: '8m 35s',
      confidence: 78,
      details: {
        prNumber: 'PR-1247',
        repository: 'main-app',
        issues: ['SQL injection risk', 'Unvalidated input'],
        decision: 'Rejected - security fixes required',
        comment: 'Critical vulnerabilities must be addressed',
        severity: 'High'
      }
    },
    {
      id: '8',
      timestamp: new Date(Date.now() - 1000 * 60 * 120),
      agent: 'Compliance Monitor',
      agentIcon: '📋',
      action: 'Policy Exception',
      actionType: 'exception',
      user: 'James Wilson',
      userEmail: 'james.w@company.com',
      status: 'approved',
      duration: '4m 18s',
      confidence: 84,
      details: {
        policyId: 'POL-DATA-001',
        requestType: 'Data Access Exception',
        decision: 'Approved with conditions',
        comment: 'Temporary access granted with audit trail',
        expiryDate: '2024-12-31',
        conditions: ['Audit logging enabled', 'Senior oversight required']
      }
    },
    {
      id: '9',
      timestamp: new Date(Date.now() - 1000 * 60 * 150),
      agent: 'Social Media Monitor',
      agentIcon: '📱',
      action: 'Brand Sentiment Analysis',
      actionType: 'analysis',
      user: 'Sarah Johnson',
      userEmail: 'sarah.j@company.com',
      status: 'approved',
      duration: '2m 45s',
      confidence: 81,
      details: {
        platform: 'Twitter',
        mentions: 342,
        sentiment: 'Mixed',
        decision: 'Create support ticket',
        comment: 'Valid customer concern identified',
        ticketCreated: 'SUP-45679'
      }
    },
    {
      id: '10',
      timestamp: new Date(Date.now() - 1000 * 60 * 180),
      agent: 'Financial Audit AI',
      agentIcon: '💰',
      action: 'Expense Report Review',
      actionType: 'review',
      user: 'David Kim',
      userEmail: 'david.k@company.com',
      status: 'approved',
      duration: '1m 55s',
      confidence: 95,
      details: {
        reportId: 'EXP-2024-8923',
        employee: 'John Doe',
        totalAmount: '$1,247.50',
        decision: 'Approved',
        comment: 'All receipts verified',
        policyCompliance: 'Full'
      }
    }
  ]);

  // Unique values for filters
  const uniqueAgents = ['all', ...new Set(activities.map(a => a.agent))];
  const uniqueActions = ['all', ...new Set(activities.map(a => a.actionType))];
  const uniqueStatuses = ['all', 'approved', 'rejected', 'escalated'];
  const uniqueUsers = ['all', ...new Set(activities.map(a => a.user))];

  // Filter activities
  const filteredActivities = activities.filter(activity => {
    const matchesSearch = searchQuery === '' ||
      activity.agent.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.user.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesAgent = filterAgent === 'all' || activity.agent === filterAgent;
    const matchesAction = filterAction === 'all' || activity.actionType === filterAction;
    const matchesStatus = filterStatus === 'all' || activity.status === filterStatus;
    const matchesUser = filterUser === 'all' || activity.user === filterUser;

    return matchesSearch && matchesAgent && matchesAction && matchesStatus && matchesUser;
  });

  // Pagination
  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedActivities = filteredActivities.slice(startIndex, startIndex + itemsPerPage);

  // Stats
  const stats = {
    total: activities.length,
    approved: activities.filter(a => a.status === 'approved').length,
    rejected: activities.filter(a => a.status === 'rejected').length,
    escalated: activities.filter(a => a.status === 'escalated').length,
    successRate: ((activities.filter(a => a.status === 'approved').length / activities.length) * 100).toFixed(1),
    avgDuration: '3m 12s'
  };

  // Handle export
  const handleExport = (format) => {
    if (format === 'csv') {
      const csv = [
        ['Timestamp', 'Agent', 'Action', 'User', 'Status', 'Duration', 'Confidence'],
        ...filteredActivities.map(a => [
          a.timestamp.toISOString(),
          a.agent,
          a.action,
          a.user,
          a.status,
          a.duration,
          `${a.confidence}%`
        ])
      ].map(row => row.join(',')).join('\n');

      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `activity-logs-${new Date().toISOString()}.csv`;
      link.click();
    } else if (format === 'json') {
      const json = JSON.stringify(filteredActivities, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `activity-logs-${new Date().toISOString()}.json`;
      link.click();
    }
  };

  // Toggle row expansion
  const toggleRowExpansion = (id) => {
    if (expandedRows.includes(id)) {
      setExpandedRows(expandedRows.filter(rowId => rowId !== id));
    } else {
      setExpandedRows([...expandedRows, id]);
    }
  };

  // Reset filters
  const resetFilters = () => {
    setFilterAgent('all');
    setFilterAction('all');
    setFilterStatus('all');
    setFilterUser('all');
    setSearchQuery('');
    setDateRange('today');
  };

  const activeFiltersCount =
    (filterAgent !== 'all' ? 1 : 0) +
    (filterAction !== 'all' ? 1 : 0) +
    (filterStatus !== 'all' ? 1 : 0) +
    (filterUser !== 'all' ? 1 : 0);

  const getStatusBadge = (status) => {
    const configs = {
      approved: { color: 'bg-green-100 text-green-700 border-green-200', icon: CheckCircle },
      rejected: { color: 'bg-red-100 text-red-700 border-red-200', icon: XCircle },
      escalated: { color: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: AlertTriangle }
    };
    const config = configs[status];
    const Icon = config.icon;
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${config.color} inline-flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <MainLayout showSidebar={true}>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-secondary-900 flex items-center gap-3">
                <Activity className="w-8 h-8 text-primary-600" />
                Activity Logs
              </h1>
              <p className="text-secondary-600 mt-2">
                Complete history of all HITL decisions and actions
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setRealtimeStreaming(!realtimeStreaming)}
                className={`glass-btn-secondary rounded-xl px-4 py-2 inline-flex items-center gap-2 ${
                  realtimeStreaming ? 'bg-green-50 border-green-200' : ''
                }`}
              >
                {realtimeStreaming ? (
                  <>
                    <PauseCircle className="w-5 h-5 text-green-600" />
                    <span className="text-green-700 font-medium">Live</span>
                    <Radio className="w-4 h-4 text-green-600 animate-pulse" />
                  </>
                ) : (
                  <>
                    <PlayCircle className="w-5 h-5" />
                    Start Live Stream
                  </>
                )}
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="glass-btn-secondary rounded-xl px-4 py-2 inline-flex items-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Export
                  <ChevronDown className="w-4 h-4" />
                </button>
                {showFilters && (
                  <div className="absolute right-0 mt-2 w-48 glass-card rounded-xl p-2 shadow-xl z-10">
                    <button
                      onClick={() => {
                        handleExport('csv');
                        setShowFilters(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-secondary-700 hover:bg-gray-100 rounded-lg"
                    >
                      Export as CSV
                    </button>
                    <button
                      onClick={() => {
                        handleExport('json');
                        setShowFilters(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-secondary-700 hover:bg-gray-100 rounded-lg"
                    >
                      Export as JSON
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 className="w-5 h-5 text-secondary-600" />
              <p className="text-sm text-secondary-600">Total Events</p>
            </div>
            <p className="text-3xl font-bold text-secondary-900">{stats.total}</p>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <p className="text-sm text-secondary-600">Approved</p>
            </div>
            <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <XCircle className="w-5 h-5 text-red-600" />
              <p className="text-sm text-secondary-600">Rejected</p>
            </div>
            <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <p className="text-sm text-secondary-600">Escalated</p>
            </div>
            <p className="text-3xl font-bold text-yellow-600">{stats.escalated}</p>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-primary-600" />
              <p className="text-sm text-secondary-600">Success Rate</p>
            </div>
            <p className="text-3xl font-bold text-primary-600">{stats.successRate}%</p>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-purple-600" />
              <p className="text-sm text-secondary-600">Avg Duration</p>
            </div>
            <p className="text-2xl font-bold text-purple-600">{stats.avgDuration}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="glass-card rounded-2xl p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-grow">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by agent, action, or user..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-secondary-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="glass-btn-secondary rounded-lg px-4 py-2 inline-flex items-center gap-2"
            >
              <Filter className="w-5 h-5" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="bg-primary-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Date Range
                  </label>
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  >
                    <option value="today">Today</option>
                    <option value="yesterday">Yesterday</option>
                    <option value="week">Last 7 days</option>
                    <option value="month">Last 30 days</option>
                    <option value="custom">Custom Range</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Agent
                  </label>
                  <select
                    value={filterAgent}
                    onChange={(e) => setFilterAgent(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  >
                    {uniqueAgents.map(agent => (
                      <option key={agent} value={agent}>
                        {agent === 'all' ? 'All Agents' : agent}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Action Type
                  </label>
                  <select
                    value={filterAction}
                    onChange={(e) => setFilterAction(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  >
                    {uniqueActions.map(action => (
                      <option key={action} value={action}>
                        {action === 'all' ? 'All Actions' : action.charAt(0).toUpperCase() + action.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    Status
                  </label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  >
                    {uniqueStatuses.map(status => (
                      <option key={status} value={status}>
                        {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-2">
                    User
                  </label>
                  <select
                    value={filterUser}
                    onChange={(e) => setFilterUser(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                  >
                    {uniqueUsers.map(user => (
                      <option key={user} value={user}>
                        {user === 'all' ? 'All Users' : user}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <button
                  onClick={resetFilters}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  Reset All Filters
                </button>
                <span className="text-sm text-secondary-600">
                  {filteredActivities.length} of {activities.length} events
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Activity Table */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-secondary-700 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-secondary-700 uppercase tracking-wider">
                    Agent
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-secondary-700 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-secondary-700 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-secondary-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-secondary-700 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-secondary-700 uppercase tracking-wider">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedActivities.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                      <Activity className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                      <p className="font-medium">No activity logs found</p>
                      <p className="text-sm mt-1">Try adjusting your filters or search query</p>
                    </td>
                  </tr>
                ) : (
                  paginatedActivities.map((activity) => (
                    <>
                      <tr key={activity.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="text-sm text-secondary-900 font-medium">
                            {activity.timestamp.toLocaleTimeString()}
                          </div>
                          <div className="text-xs text-gray-500">
                            {getTimeAgo(activity.timestamp)}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{activity.agentIcon}</span>
                            <span className="text-sm font-medium text-secondary-900">{activity.agent}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-secondary-900">{activity.action}</div>
                          <div className="text-xs text-gray-500 capitalize">{activity.actionType}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-secondary-900">{activity.user}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {getStatusBadge(activity.status)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-secondary-900">{activity.duration}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => toggleRowExpansion(activity.id)}
                            className="text-primary-600 hover:text-primary-700"
                          >
                            {expandedRows.includes(activity.id) ? (
                              <ChevronUp className="w-5 h-5" />
                            ) : (
                              <ChevronDown className="w-5 h-5" />
                            )}
                          </button>
                        </td>
                      </tr>
                      {expandedRows.includes(activity.id) && (
                        <tr>
                          <td colSpan="7" className="px-6 py-4 bg-gray-50">
                            <div className="space-y-3">
                              <div className="flex items-center justify-between mb-3">
                                <h4 className="font-bold text-secondary-900">Detailed Information</h4>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-secondary-600">AI Confidence:</span>
                                  <div className="flex items-center gap-2">
                                    <div className="w-24 bg-gray-200 rounded-full h-2">
                                      <div
                                        className={`h-2 rounded-full ${
                                          activity.confidence >= 80
                                            ? 'bg-green-500'
                                            : activity.confidence >= 60
                                            ? 'bg-yellow-500'
                                            : 'bg-red-500'
                                        }`}
                                        style={{ width: `${activity.confidence}%` }}
                                      />
                                    </div>
                                    <span className="text-sm font-bold text-secondary-900">
                                      {activity.confidence}%
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {Object.entries(activity.details).map(([key, value]) => (
                                  <div key={key} className="bg-white rounded-lg p-3 border border-gray-200">
                                    <p className="text-xs text-secondary-600 mb-1 capitalize">
                                      {key.replace(/([A-Z])/g, ' $1').trim()}
                                    </p>
                                    <p className="text-sm font-medium text-secondary-900">
                                      {Array.isArray(value) ? value.join(', ') : value}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-secondary-600">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredActivities.length)} of{' '}
              {filteredActivities.length} events
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="glass-btn-secondary rounded-lg px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                      currentPage === page
                        ? 'bg-primary-600 text-white'
                        : 'glass-btn-secondary hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="glass-btn-secondary rounded-lg px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Close export dropdown on outside click */}
      {showFilters && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowFilters(false)}
        />
      )}
    </MainLayout>
  );
};

export default ActivityLogsPage;
