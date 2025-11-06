import { useState, useEffect } from 'react'
import MainLayout from '../../components/layout/MainLayout'
import { useAuthStore } from '../../store/authStore'
import { Link } from 'react-router-dom'

const DashboardPage = () => {
  const { user } = useAuthStore()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const stats = [
    {
      label: 'Total Submissions',
      value: '124',
      change: '+12.5%',
      trend: 'up',
      icon: 'upload_file',
      color: 'primary',
      description: 'This month'
    },
    {
      label: 'Completed Evaluations',
      value: '98',
      change: '+8.2%',
      trend: 'up',
      icon: 'check_circle',
      color: 'green',
      description: 'Success rate: 94%'
    },
    {
      label: 'In Progress',
      value: '26',
      change: '-5.3%',
      trend: 'down',
      icon: 'pending',
      color: 'yellow',
      description: 'Avg. completion: 2.3 days'
    },
    {
      label: 'Average Score',
      value: '87.5',
      change: '+3.1%',
      trend: 'up',
      icon: 'star',
      color: 'accent',
      description: 'Across all evaluations'
    },
  ]

  const recentSubmissions = [
    {
      id: 1,
      title: 'Machine Learning Model Assessment',
      agent: 'Code Assessment',
      industry: 'Technology',
      status: 'completed',
      score: 92,
      date: '2025-11-01',
      evaluator: 'AI Agent Pro'
    },
    {
      id: 2,
      title: 'Legal Document Review - Contract Analysis',
      agent: 'Document Review',
      industry: 'Law',
      status: 'in_progress',
      score: null,
      date: '2025-11-03',
      evaluator: 'AI Agent Pro'
    },
    {
      id: 3,
      title: 'Educational Content Evaluation',
      agent: 'Custom Criteria',
      industry: 'Education',
      status: 'completed',
      score: 88,
      date: '2025-10-28',
      evaluator: 'AI Agent Pro'
    },
    {
      id: 4,
      title: 'Marketing Presentation Analysis',
      agent: 'Video Analysis',
      industry: 'Business',
      status: 'completed',
      score: 85,
      date: '2025-10-25',
      evaluator: 'AI Agent Pro'
    },
    {
      id: 5,
      title: 'Healthcare Compliance Review',
      agent: 'Document Review',
      industry: 'Healthcare',
      status: 'pending',
      score: null,
      date: '2025-11-04',
      evaluator: 'AI Agent Pro'
    },
  ]

  const recentActivity = [
    {
      id: 1,
      type: 'evaluation_complete',
      message: 'Machine Learning Model Assessment completed',
      time: '2 hours ago',
      icon: 'check_circle',
      color: 'green'
    },
    {
      id: 2,
      type: 'submission_created',
      message: 'New submission: Legal Document Review',
      time: '5 hours ago',
      icon: 'upload_file',
      color: 'blue'
    },
    {
      id: 3,
      type: 'criteria_updated',
      message: 'Evaluation criteria updated for Education',
      time: '1 day ago',
      icon: 'tune',
      color: 'purple'
    },
    {
      id: 4,
      type: 'report_generated',
      message: 'AI Report generated for Educational Content',
      time: '2 days ago',
      icon: 'description',
      color: 'orange'
    },
  ]

  const quickActions = [
    {
      title: 'Hire new Aasim',
      description: 'Your Precision AI Agent',
      icon: 'psychology',
      color: 'primary',
      link: '/agent-select',
      shortcut: 'N'
    },
    {
      title: 'Agent Marketplace',
      description: 'Browse specialized AI agents',
      icon: 'store',
      color: 'blue',
      link: '/marketplace',
      shortcut: 'M'
    },
    {
      title: 'Orchestrator',
      description: 'Create multi-agent workflows',
      icon: 'account_tree',
      color: 'purple',
      link: '/orchestrator',
      shortcut: 'O'
    },
    {
      title: 'Scheduler',
      description: 'Automate agent execution',
      icon: 'event',
      color: 'green',
      link: '/scheduler',
      shortcut: 'S'
    },
    {
      title: 'View Reports',
      description: 'Access detailed evaluation reports',
      icon: 'assessment',
      color: 'orange',
      link: '/submissions',
      shortcut: 'R'
    },
    {
      title: 'Manage Criteria',
      description: 'Configure evaluation parameters',
      icon: 'tune',
      color: 'pink',
      link: '/criteria',
      shortcut: 'C'
    },
    {
      title: 'API Integration',
      description: 'Connect your applications',
      icon: 'code',
      color: 'indigo',
      link: '/integration',
      shortcut: 'I'
    },
    {
      title: 'Analytics',
      description: 'View performance insights',
      icon: 'analytics',
      color: 'teal',
      link: '/admin/analytics',
      shortcut: 'A'
    },
  ]

  return (
    <MainLayout>
      <div className="py-6">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Welcome back, {user?.name || 'User'}
              </h1>
              <p className="text-gray-600 flex items-center">
                <span className="material-icons text-sm mr-2">calendar_today</span>
                {formatDate(currentTime)}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link
                to="/agent-select"
                className="glass-btn-primary px-6 py-3 rounded-xl font-semibold inline-flex flex-col items-center shadow-lg"
              >
                <div className="flex items-center mb-1">
                  <span className="material-icons mr-2">psychology</span>
                  <span>Hire new Aasim</span>
                </div>
                <span className="text-xs font-normal opacity-90">Your Precision AI Agent</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="glass-card rounded-2xl p-6 hover:shadow-xl transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${stat.color}-400 to-${stat.color}-600 flex items-center justify-center`}>
                  <span className="material-icons text-white text-2xl">{stat.icon}</span>
                </div>
                <div className={`flex items-center text-sm font-semibold ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <span className="material-icons text-sm mr-1">
                    {stat.trend === 'up' ? 'trending_up' : 'trending_down'}
                  </span>
                  {stat.change}
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm font-medium mb-1">{stat.label}</p>
              <p className="text-gray-500 text-xs">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Recent Submissions Table - Takes 2 columns */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Recent Submissions</h2>
                  <p className="text-gray-500 text-sm mt-1">Track your latest evaluation requests</p>
                </div>
                <Link
                  to="/submissions"
                  className="text-primary-600 hover:text-primary-700 flex items-center font-semibold text-sm"
                >
                  View All
                  <span className="material-icons ml-1 text-sm">arrow_forward</span>
                </Link>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Agent
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Industry
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Score
                      </th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentSubmissions.map((submission) => (
                      <tr
                        key={submission.id}
                        className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors"
                      >
                        <td className="py-4 px-4">
                          <div>
                            <p className="text-gray-900 font-semibold text-sm">{submission.title}</p>
                            <p className="text-gray-500 text-xs mt-1">{submission.date}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-gray-700 text-sm">{submission.agent}</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {submission.industry}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                            submission.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : submission.status === 'in_progress'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            <span className="material-icons text-xs mr-1">
                              {submission.status === 'completed' ? 'check_circle' :
                               submission.status === 'in_progress' ? 'schedule' : 'pending'}
                            </span>
                            {submission.status === 'completed' ? 'Completed' :
                             submission.status === 'in_progress' ? 'In Progress' : 'Pending'}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          {submission.score ? (
                            <div className="flex items-center">
                              <span className="text-gray-900 font-bold text-sm">{submission.score}</span>
                              <span className="text-gray-500 text-xs ml-1">/100</span>
                            </div>
                          ) : (
                            <span className="text-gray-400 text-sm">—</span>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <Link
                            to={`/submissions/${submission.id}`}
                            className="text-primary-600 hover:text-primary-700 font-semibold text-sm"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Activity Feed - Takes 1 column */}
          <div className="lg:col-span-1">
            <div className="glass-card rounded-2xl p-6">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
                <p className="text-gray-500 text-sm mt-1">Your latest actions</p>
              </div>

              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-lg bg-${activity.color}-100 flex items-center justify-center flex-shrink-0`}>
                      <span className={`material-icons text-${activity.color}-600 text-sm`}>
                        {activity.icon}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 font-medium">{activity.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <Link
                  to="/notifications"
                  className="text-primary-600 hover:text-primary-700 text-sm font-semibold flex items-center justify-center"
                >
                  View All Activity
                  <span className="material-icons ml-1 text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.link}
                className="glass-card-hover rounded-2xl p-6 group relative overflow-hidden"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-${action.color}-400 to-${action.color}-600 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <span className="material-icons text-white text-2xl">{action.icon}</span>
                  </div>
                  <span className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-1 rounded">
                    {action.shortcut}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{action.title}</h3>
                <p className="text-gray-600 text-sm">{action.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Performance Overview */}
        <div className="glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Performance Overview</h2>
              <p className="text-gray-500 text-sm mt-1">Your evaluation metrics at a glance</p>
            </div>
            <select className="glass-input text-sm px-4 py-2 rounded-lg">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 3 months</option>
              <option>Last year</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 glass-card rounded-xl">
              <div className="text-4xl font-bold text-gray-900 mb-2">94%</div>
              <div className="text-sm text-gray-600 font-medium mb-1">Success Rate</div>
              <div className="text-xs text-green-600 font-semibold">+2.3% from last month</div>
            </div>
            <div className="text-center p-6 glass-card rounded-xl">
              <div className="text-4xl font-bold text-gray-900 mb-2">2.3</div>
              <div className="text-sm text-gray-600 font-medium mb-1">Avg. Processing Days</div>
              <div className="text-xs text-green-600 font-semibold">-0.5 days improvement</div>
            </div>
            <div className="text-center p-6 glass-card rounded-xl">
              <div className="text-4xl font-bold text-gray-900 mb-2">$2,450</div>
              <div className="text-sm text-gray-600 font-medium mb-1">Total Savings</div>
              <div className="text-xs text-gray-500">vs. manual evaluation</div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default DashboardPage
