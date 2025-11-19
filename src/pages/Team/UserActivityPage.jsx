import { useState } from 'react';
import {
  Activity,
  User,
  Calendar,
  Search,
  Filter,
  Download,
} from 'lucide-react';
import Button from '../../components/common/Button/Button';
import Input from '../../components/common/Input/Input';
import Select from '../../components/common/Input/Select';
import Card from '../../components/common/Card/Card';
import Badge from '../../components/common/Badge/Badge';
import MainLayout from '../../components/layout/MainLayout';

const UserActivityPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activityTypeFilter, setActivityTypeFilter] = useState('all');
  const [userFilter, setUserFilter] = useState('all');

  const [activities] = useState([
    {
      id: 1,
      user: 'John Smith',
      action: 'Created new AI agent',
      details: 'Invoice Processing Specialist',
      timestamp: '2025-11-17 14:30:00',
      type: 'create',
    },
    {
      id: 2,
      user: 'Sarah Johnson',
      action: 'Approved HITL task',
      details: 'Candidate Screening #234',
      timestamp: '2025-11-17 13:45:00',
      type: 'approval',
    },
    {
      id: 3,
      user: 'Michael Chen',
      action: 'Invited new user',
      details: 'emma.rodriguez@company.com',
      timestamp: '2025-11-17 12:20:00',
      type: 'invite',
    },
    {
      id: 4,
      user: 'Emma Rodriguez',
      action: 'Logged in',
      details: 'From IP: 192.168.1.100',
      timestamp: '2025-11-17 11:00:00',
      type: 'login',
    },
    {
      id: 5,
      user: 'David Kim',
      action: 'Updated project',
      details: 'Customer Portal Redesign - Progress: 65%',
      timestamp: '2025-11-17 10:15:00',
      type: 'update',
    },
    {
      id: 6,
      user: 'Lisa Martinez',
      action: 'Deployed job flow',
      details: 'Customer Support Triage',
      timestamp: '2025-11-17 09:30:00',
      type: 'deploy',
    },
    {
      id: 7,
      user: 'James Wilson',
      action: 'Modified department',
      details: 'Added Operations - Data Entry team',
      timestamp: '2025-11-17 08:45:00',
      type: 'update',
    },
    {
      id: 8,
      user: 'Sarah Johnson',
      action: 'Rejected HITL task',
      details: 'Transaction Validation #445',
      timestamp: '2025-11-16 16:25:00',
      type: 'approval',
    },
  ]);

  const users = ['all', ...new Set(activities.map((a) => a.user))];

  const getActivityTypeColor = (type) => {
    const colors = {
      create: 'bg-green-100 text-green-700',
      update: 'bg-blue-100 text-blue-700',
      delete: 'bg-red-100 text-red-700',
      approval: 'bg-purple-100 text-purple-700',
      invite: 'bg-orange-100 text-orange-700',
      login: 'bg-gray-100 text-gray-700',
      deploy: 'bg-indigo-100 text-indigo-700',
    };
    return colors[type] || colors.login;
  };

  const getActivityTypeIcon = (type) => {
    const icons = {
      create: '➕',
      update: '✏️',
      delete: '🗑️',
      approval: '✅',
      invite: '📧',
      login: '🔐',
      deploy: '🚀',
    };
    return icons[type] || '📝';
  };

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch =
      activity.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.details.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = activityTypeFilter === 'all' || activity.type === activityTypeFilter;
    const matchesUser = userFilter === 'all' || activity.user === userFilter;

    return matchesSearch && matchesType && matchesUser;
  });

  return (
    <MainLayout>
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary-900">User Activity</h1>
          <p className="text-secondary-600 mt-1">
            Monitor team member activities and actions
          </p>
        </div>
        <Button
          variant="outline"
          leftIcon={<Download className="w-5 h-5" />}
          onClick={() => {/* Export activity log */}}
        >
          Export
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-900">{activities.length}</div>
              <div className="text-sm text-blue-700">Total Activities</div>
            </div>
            <Activity className="w-10 h-10 text-blue-500" />
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-900">
                {activities.filter((a) => a.type === 'create').length}
              </div>
              <div className="text-sm text-green-700">Created</div>
            </div>
            <div className="text-4xl">➕</div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-purple-900">
                {activities.filter((a) => a.type === 'approval').length}
              </div>
              <div className="text-sm text-purple-700">Approvals</div>
            </div>
            <div className="text-4xl">✅</div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-secondary-900">
                {new Set(activities.map((a) => a.user)).size}
              </div>
              <div className="text-sm text-secondary-700">Active Users</div>
            </div>
            <User className="w-10 h-10 text-gray-500" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="w-5 h-5" />}
              fullWidth
            />
          </div>
          <Select
            value={activityTypeFilter}
            onChange={(e) => setActivityTypeFilter(e.target.value)}
            options={[
              { value: 'all', label: 'All Types' },
              { value: 'create', label: 'Create' },
              { value: 'update', label: 'Update' },
              { value: 'delete', label: 'Delete' },
              { value: 'approval', label: 'Approval' },
              { value: 'invite', label: 'Invite' },
              { value: 'login', label: 'Login' },
              { value: 'deploy', label: 'Deploy' },
            ]}
            className="min-w-[180px]"
          />
          <Select
            value={userFilter}
            onChange={(e) => setUserFilter(e.target.value)}
            options={users.map((user) => ({
              value: user,
              label: user === 'all' ? 'All Users' : user,
            }))}
            className="min-w-[200px]"
          />
        </div>
      </Card>

      {/* Activity Timeline */}
      <div className="space-y-4">
        {filteredActivities.map((activity, index) => (
          <Card key={activity.id} className="hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                {getActivityTypeIcon(activity.type)}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-secondary-900">{activity.user}</span>
                      <Badge className={getActivityTypeColor(activity.type)}>
                        {activity.type.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-secondary-900">{activity.action}</p>
                    <p className="text-sm text-secondary-600 mt-1">{activity.details}</p>
                  </div>
                  <div className="text-right text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(activity.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline connector */}
            {index < filteredActivities.length - 1 && (
              <div className="ml-6 mt-4 border-l-2 border-gray-200 h-4"></div>
            )}
          </Card>
        ))}
      </div>

      {filteredActivities.length === 0 && (
        <Card>
          <div className="text-center py-12">
            <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-secondary-900 mb-2">
              No Activities Found
            </h3>
            <p className="text-secondary-600">
              {searchTerm || activityTypeFilter !== 'all' || userFilter !== 'all'
                ? 'Try adjusting your filters'
                : 'User activities will appear here'}
            </p>
          </div>
        </Card>
      )}
      </div>
    </MainLayout>
  );
};

export default UserActivityPage;
