import {
  Bot,
  Briefcase,
  Building2,
  MapPin,
  FolderKanban,
  User,
  Clock,
  Zap,
  Shield,
  Activity,
  Calendar,
  TrendingUp,
  CheckCircle,
  XCircle,
  Pause
} from 'lucide-react';
import Badge from '../common/Badge/Badge';
import Card from '../common/Card/Card';

const AgentProfile = ({ agent }) => {
  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-green-100 text-green-700',
      inactive: 'bg-gray-100 text-gray-700',
      'on-leave': 'bg-yellow-100 text-yellow-700',
      paused: 'bg-orange-100 text-orange-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const getEmploymentTypeColor = (type) => {
    const colors = {
      'full-time': 'bg-blue-100 text-blue-700',
      'part-time': 'bg-purple-100 text-purple-700',
      'on-demand': 'bg-pink-100 text-pink-700',
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  const formatEmploymentType = (type) => {
    return type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header Card */}
      <Card className="mb-6">
        <div className="flex items-start gap-6">
          {/* Agent Avatar */}
          <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center flex-shrink-0">
            <Bot className="w-12 h-12 text-white" />
          </div>

          {/* Agent Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-secondary-900 mb-1">{agent.name}</h1>
                <div className="flex items-center gap-2 text-lg text-secondary-600 mb-2">
                  <Briefcase className="w-5 h-5" />
                  <span>{agent.jobTitle}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(agent.status)}`}>
                  {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEmploymentTypeColor(agent.employmentType)}`}>
                  {formatEmploymentType(agent.employmentType)}
                </span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-secondary-900">{agent.performanceMetrics?.accuracy || 0}%</div>
                <div className="text-xs text-secondary-600">Accuracy</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-secondary-900">{agent.performanceMetrics?.tasksCompleted || 0}</div>
                <div className="text-xs text-secondary-600">Tasks Completed</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-secondary-900">{agent.performanceMetrics?.avgTime || 0}s</div>
                <div className="text-xs text-secondary-600">Avg. Time</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-secondary-900">{agent.performanceMetrics?.uptime || 0}%</div>
                <div className="text-xs text-secondary-600">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Assignment Information */}
          <Card>
            <h2 className="text-xl font-semibold text-secondary-900 mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary-600" />
              Assignment Information
            </h2>
            <div className="space-y-3">
              {agent.branch && (
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">Branch</div>
                    <div className="font-medium text-secondary-900">{agent.branch}</div>
                  </div>
                </div>
              )}
              {agent.department && (
                <div className="flex items-start gap-3">
                  <Briefcase className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">Department</div>
                    <div className="font-medium text-secondary-900">{agent.department}</div>
                  </div>
                </div>
              )}
              {agent.project && (
                <div className="flex items-start gap-3">
                  <FolderKanban className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">Project</div>
                    <div className="font-medium text-secondary-900">{agent.project}</div>
                  </div>
                </div>
              )}
              {agent.reportingTo && (
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">Reporting To</div>
                    <div className="font-medium text-secondary-900">{agent.reportingTo}</div>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Schedule Information */}
          <Card>
            <h2 className="text-xl font-semibold text-secondary-900 mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary-600" />
              Schedule
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <div className="text-sm text-gray-500">Frequency</div>
                  <div className="font-medium text-secondary-900">{agent.schedule?.frequency || 'N/A'}</div>
                </div>
              </div>
              {agent.schedule?.time && (
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">Time</div>
                    <div className="font-medium text-secondary-900">{agent.schedule.time} {agent.schedule.timezone}</div>
                  </div>
                </div>
              )}
              {agent.schedule?.nextRun && (
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm text-blue-700 font-medium">Next Scheduled Run</div>
                  <div className="text-blue-900">{new Date(agent.schedule.nextRun).toLocaleString()}</div>
                </div>
              )}
            </div>
          </Card>

          {/* HITL Supervision */}
          <Card>
            <h2 className="text-xl font-semibold text-secondary-900 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary-600" />
              HITL Supervision
            </h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <div className="text-sm text-gray-500">HITL Mode</div>
                  <div className="font-medium text-secondary-900">{agent.hitlMode || 'Fully AI-Driven'}</div>
                </div>
              </div>
              {agent.hitlSupervisor && (
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500">HITL Supervisor</div>
                    <div className="font-medium text-secondary-900">{agent.hitlSupervisor}</div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Engines Used */}
          <Card>
            <h2 className="text-xl font-semibold text-secondary-900 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary-600" />
              Engines Used
            </h2>
            <div className="flex flex-wrap gap-2">
              {agent.enginesUsed && agent.enginesUsed.length > 0 ? (
                agent.enginesUsed.map((engine, idx) => (
                  <Badge key={idx} className="bg-primary-100 text-primary-700 px-3 py-1">
                    {engine}
                  </Badge>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No engines configured</p>
              )}
            </div>
          </Card>

          {/* Performance Metrics */}
          <Card>
            <h2 className="text-xl font-semibold text-secondary-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary-600" />
              Performance Metrics
            </h2>
            <div className="space-y-4">
              {/* Accuracy */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-secondary-600">Accuracy</span>
                  <span className="font-medium text-secondary-900">{agent.performanceMetrics?.accuracy || 0}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all"
                    style={{ width: `${agent.performanceMetrics?.accuracy || 0}%` }}
                  />
                </div>
              </div>

              {/* Success Rate */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-secondary-600">Success Rate</span>
                  <span className="font-medium text-secondary-900">{agent.performanceMetrics?.successRate || 0}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${agent.performanceMetrics?.successRate || 0}%` }}
                  />
                </div>
              </div>

              {/* Uptime */}
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-secondary-600">Uptime</span>
                  <span className="font-medium text-secondary-900">{agent.performanceMetrics?.uptime || 0}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full transition-all"
                    style={{ width: `${agent.performanceMetrics?.uptime || 0}%` }}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Recent Activity */}
          <Card>
            <h2 className="text-xl font-semibold text-secondary-900 mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary-600" />
              Recent Activity
            </h2>
            <div className="space-y-3">
              {agent.recentActivity && agent.recentActivity.length > 0 ? (
                agent.recentActivity.map((activity, idx) => (
                  <div key={idx} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
                    <div className="mt-1">
                      {activity.status === 'success' ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : activity.status === 'failed' ? (
                        <XCircle className="w-5 h-5 text-red-500" />
                      ) : (
                        <Pause className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-secondary-900">{activity.task}</div>
                      <div className="text-xs text-gray-500">{activity.time}</div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No recent activity</p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AgentProfile;
