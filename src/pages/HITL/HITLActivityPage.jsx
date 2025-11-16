import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import { Button, Input, Card, Badge } from '../../components/common';
import { HITLActivityLog } from '../../components/hitl';
import {
  ArrowLeft,
  Search,
  Download,
  CheckCircle,
  XCircle,
  TrendingUp,
  Clock,
} from 'lucide-react';

const HITLActivityPage = () => {
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDecision, setFilterDecision] = useState('all');
  const [filterAgent, setFilterAgent] = useState('all');
  const [dateRange, setDateRange] = useState('7days');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadActivities();
  }, [dateRange]);

  useEffect(() => {
    filterActivities();
  }, [activities, searchQuery, filterDecision, filterAgent]);

  const loadActivities = async () => {
    // Mock data - in real app, fetch from API
    const mockActivities = [
      {
        id: '1',
        agentId: 'agent-1',
        agentName: 'Customer Support Assistant',
        executionId: 'exec-12345678',
        decision: 'approved',
        decidedBy: 'john.doe@example.com',
        decidedAt: new Date(Date.now() - 3600000).toISOString(),
        comment: 'Response is appropriate for the customer inquiry',
        duration: 45000, // 45 seconds
        priority: 'urgent',
        hitlMode: 'confidence',
        metrics: {
          confidence: 0.65,
        },
      },
      {
        id: '2',
        agentId: 'agent-2',
        agentName: 'Document Processor',
        executionId: 'exec-87654321',
        decision: 'rejected',
        decidedBy: 'jane.smith@example.com',
        decidedAt: new Date(Date.now() - 7200000).toISOString(),
        comment: 'Classification appears incorrect. Document needs manual review.',
        duration: 120000, // 2 minutes
        priority: 'high',
        hitlMode: 'uncertainty',
        metrics: {
          confidence: 0.72,
        },
      },
      {
        id: '3',
        agentId: 'agent-3',
        agentName: 'Market Research Analyst',
        executionId: 'exec-11223344',
        decision: 'approved',
        decidedBy: 'bob.johnson@example.com',
        decidedAt: new Date(Date.now() - 10800000).toISOString(),
        comment: 'Analysis is thorough and vendor has good track record',
        duration: 180000, // 3 minutes
        priority: 'high',
        hitlMode: 'critical',
        metrics: {
          confidence: 0.89,
        },
      },
      {
        id: '4',
        agentId: 'agent-1',
        agentName: 'Customer Support Assistant',
        executionId: 'exec-99887766',
        decision: 'approved',
        decidedBy: 'alice.williams@example.com',
        decidedAt: new Date(Date.now() - 14400000).toISOString(),
        comment: 'Escalation is appropriate given the negative sentiment',
        duration: 60000, // 1 minute
        priority: 'medium',
        hitlMode: 'sentiment',
        metrics: {
          confidence: 0.78,
        },
      },
      {
        id: '5',
        agentId: 'agent-2',
        agentName: 'Document Processor',
        executionId: 'exec-55443322',
        decision: 'auto_approved',
        decidedBy: null,
        decidedAt: new Date(Date.now() - 18000000).toISOString(),
        comment: 'Auto-approved based on high confidence score',
        duration: 0,
        priority: 'low',
        hitlMode: 'confidence',
        metrics: {
          confidence: 0.95,
        },
      },
    ];

    setActivities(mockActivities);
    setIsLoading(false);
  };

  const filterActivities = () => {
    let filtered = [...activities];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (activity) =>
          activity.agentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          activity.executionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          activity.decidedBy?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          activity.comment?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Decision filter
    if (filterDecision !== 'all') {
      filtered = filtered.filter((a) => a.decision === filterDecision);
    }

    // Agent filter
    if (filterAgent !== 'all') {
      filtered = filtered.filter((a) => a.agentName === filterAgent);
    }

    setFilteredActivities(filtered);
  };

  const handleExport = () => {
    // In real app, export to CSV or PDF
    const csv = [
      ['Date', 'Agent', 'Execution ID', 'Decision', 'Decided By', 'Comment'].join(','),
      ...filteredActivities.map((a) =>
        [
          new Date(a.decidedAt).toLocaleString(),
          a.agentName,
          a.executionId,
          a.decision,
          a.decidedBy || 'System',
          `"${a.comment}"`,
        ].join(',')
      ),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hitl-activity-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const uniqueAgents = [...new Set(activities.map((a) => a.agentName))];
  const approvedCount = activities.filter((a) => a.decision === 'approved').length;
  const rejectedCount = activities.filter((a) => a.decision === 'rejected').length;
  const autoApprovedCount = activities.filter((a) => a.decision === 'auto_approved').length;
  const avgResponseTime =
    activities.reduce((sum, a) => sum + a.duration, 0) / activities.length / 1000;

  if (isLoading) {
    return (
      <MainLayout>
        <div className="py-6 flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading activity log...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="py-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <Button onClick={() => navigate('/hitl/queue')} variant="ghost" size="sm">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-4xl font-heading font-bold text-gray-900 mb-2">
                HITL Activity Log
              </h1>
              <p className="text-lg text-gray-600">
                Complete history of human-in-the-loop decisions
              </p>
            </div>
          </div>
          <Button onClick={handleExport} variant="outline">
            <Download className="w-5 h-5 mr-2" />
            Export CSV
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card padding="md" className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <Badge variant="success" size="lg">
                {approvedCount}
              </Badge>
            </div>
            <p className="text-sm text-green-600 font-medium">Approved</p>
            <p className="text-xs text-green-600 mt-1">
              {((approvedCount / activities.length) * 100).toFixed(1)}% approval rate
            </p>
          </Card>

          <Card padding="md" className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
            <div className="flex items-center justify-between mb-2">
              <XCircle className="w-8 h-8 text-red-600" />
              <Badge variant="danger" size="lg">
                {rejectedCount}
              </Badge>
            </div>
            <p className="text-sm text-red-600 font-medium">Rejected</p>
            <p className="text-xs text-red-600 mt-1">
              {((rejectedCount / activities.length) * 100).toFixed(1)}% rejection rate
            </p>
          </Card>

          <Card padding="md" className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-blue-600" />
              <Badge variant="info" size="lg">
                {autoApprovedCount}
              </Badge>
            </div>
            <p className="text-sm text-blue-600 font-medium">Auto-Approved</p>
            <p className="text-xs text-blue-600 mt-1">
              High confidence executions
            </p>
          </Card>

          <Card padding="md" className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 text-purple-600" />
              <Badge variant="default" size="lg">
                {avgResponseTime.toFixed(0)}s
              </Badge>
            </div>
            <p className="text-sm text-purple-600 font-medium">Avg Response Time</p>
            <p className="text-xs text-purple-600 mt-1">
              Time to decision
            </p>
          </Card>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search by agent, execution ID, user, or comment..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-5 h-5 text-gray-400" />}
            />
          </div>

          <div className="flex gap-2">
            <select
              value={filterDecision}
              onChange={(e) => setFilterDecision(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Decisions</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="auto_approved">Auto-Approved</option>
            </select>

            <select
              value={filterAgent}
              onChange={(e) => setFilterAgent(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Agents</option>
              {uniqueAgents.map((agent) => (
                <option key={agent} value={agent}>
                  {agent}
                </option>
              ))}
            </select>

            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="today">Today</option>
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="all">All Time</option>
            </select>
          </div>
        </div>

        {/* Activity Log */}
        <HITLActivityLog activities={filteredActivities} />
      </div>
    </MainLayout>
  );
};

export default HITLActivityPage;
