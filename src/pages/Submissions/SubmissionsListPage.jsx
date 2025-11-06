import { useState } from 'react'
import MainLayout from '../../components/layout/MainLayout'
import { Link } from 'react-router-dom'

const SubmissionsListPage = () => {
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterIndustry, setFilterIndustry] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const submissions = [
    {
      id: 1,
      title: 'Machine Learning Model Assessment',
      agent: 'Source Code Assessment',
      agentIcon: 'code',
      industry: 'Technology',
      status: 'completed',
      score: 92,
      date: '2025-11-01',
      submittedBy: 'John Doe',
      filesCount: 5,
      duration: '2.5 hours'
    },
    {
      id: 2,
      title: 'Legal Document Review - Contract Analysis',
      agent: 'Documents and Images Review',
      agentIcon: 'image',
      industry: 'Law',
      status: 'in_progress',
      score: null,
      date: '2025-11-03',
      submittedBy: 'Jane Smith',
      filesCount: 3,
      duration: '—'
    },
    {
      id: 3,
      title: 'Educational Content Evaluation',
      agent: 'Custom Evaluation Criteria',
      agentIcon: 'tune',
      industry: 'Education',
      status: 'completed',
      score: 88,
      date: '2025-10-28',
      submittedBy: 'John Doe',
      filesCount: 8,
      duration: '1.8 hours'
    },
    {
      id: 4,
      title: 'Marketing Presentation Analysis',
      agent: 'Video & Audio Analysis',
      agentIcon: 'videocam',
      industry: 'Business',
      status: 'completed',
      score: 85,
      date: '2025-10-25',
      submittedBy: 'Sarah Johnson',
      filesCount: 2,
      duration: '3.2 hours'
    },
    {
      id: 5,
      title: 'Healthcare Compliance Review',
      agent: 'Documents and Images Review',
      agentIcon: 'image',
      industry: 'Healthcare',
      status: 'pending',
      score: null,
      date: '2025-11-04',
      submittedBy: 'John Doe',
      filesCount: 12,
      duration: '—'
    },
    {
      id: 6,
      title: 'Design Portfolio Assessment',
      agent: 'Documents and Images Review',
      agentIcon: 'image',
      industry: 'Creative',
      status: 'completed',
      score: 94,
      date: '2025-10-20',
      submittedBy: 'Mike Chen',
      filesCount: 15,
      duration: '2.1 hours'
    },
    {
      id: 7,
      title: 'Mobile App Code Review',
      agent: 'Source Code Assessment',
      agentIcon: 'code',
      industry: 'Technology',
      status: 'failed',
      score: null,
      date: '2025-10-18',
      submittedBy: 'John Doe',
      filesCount: 20,
      duration: '—'
    },
    {
      id: 8,
      title: 'Competition Entry Evaluation',
      agent: 'Custom Evaluation Criteria',
      agentIcon: 'tune',
      industry: 'Competitions',
      status: 'completed',
      score: 91,
      date: '2025-10-15',
      submittedBy: 'Emily Davis',
      filesCount: 4,
      duration: '1.5 hours'
    },
  ]

  const statuses = ['all', 'completed', 'in_progress', 'pending', 'failed']
  const industries = ['all', 'Technology', 'Law', 'Education', 'Healthcare', 'Business', 'Creative', 'Competitions']

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { bg: 'bg-green-100', text: 'text-green-800', icon: 'check_circle' },
      in_progress: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: 'schedule' },
      pending: { bg: 'bg-gray-100', text: 'text-gray-800', icon: 'pending' },
      failed: { bg: 'bg-red-100', text: 'text-red-800', icon: 'error' },
    }
    const config = statusConfig[status] || statusConfig.pending
    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.text}`}>
        <span className="material-icons text-xs mr-1">{config.icon}</span>
        {status.replace('_', ' ').charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
      </span>
    )
  }

  const filteredSubmissions = submissions.filter(sub => {
    const matchesStatus = filterStatus === 'all' || sub.status === filterStatus
    const matchesIndustry = filterIndustry === 'all' || sub.industry === filterIndustry
    const matchesSearch = sub.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesIndustry && matchesSearch
  })

  return (
    <MainLayout>
      <div className="py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2 font-heading">My Submissions</h1>
            <p className="text-gray-600">Track and manage all your evaluation requests</p>
          </div>
          <Link to="/agent-select" className="glass-btn-primary rounded-xl px-6 py-3 mt-4 md:mt-0 inline-flex items-center font-semibold shadow-lg">
            <span className="material-icons mr-2">add</span>
            New Submission
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card rounded-2xl p-5 text-center">
            <div className="text-3xl font-bold text-gray-900">{submissions.length}</div>
            <div className="text-sm text-gray-600 mt-1">Total</div>
          </div>
          <div className="glass-card rounded-2xl p-5 text-center">
            <div className="text-3xl font-bold text-green-600">{submissions.filter(s => s.status === 'completed').length}</div>
            <div className="text-sm text-gray-600 mt-1">Completed</div>
          </div>
          <div className="glass-card rounded-2xl p-5 text-center">
            <div className="text-3xl font-bold text-yellow-600">{submissions.filter(s => s.status === 'in_progress').length}</div>
            <div className="text-sm text-gray-600 mt-1">In Progress</div>
          </div>
          <div className="glass-card rounded-2xl p-5 text-center">
            <div className="text-3xl font-bold text-gray-600">{submissions.filter(s => s.status === 'pending').length}</div>
            <div className="text-sm text-gray-600 mt-1">Pending</div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="glass-card rounded-2xl p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                <input
                  type="text"
                  placeholder="Search submissions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="glass-input w-full pl-10"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="glass-input w-full"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>

            {/* Industry Filter */}
            <div>
              <select
                value={filterIndustry}
                onChange={(e) => setFilterIndustry(e.target.value)}
                className="glass-input w-full"
              >
                {industries.map(industry => (
                  <option key={industry} value={industry}>
                    {industry === 'all' ? 'All Industries' : industry}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Submissions Table */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/80">
                <tr>
                  <th className="text-left py-4 px-6 text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Submission
                  </th>
                  <th className="text-left py-4 px-6 text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Agent
                  </th>
                  <th className="text-left py-4 px-6 text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Industry
                  </th>
                  <th className="text-left py-4 px-6 text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left py-4 px-6 text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="text-right py-4 px-6 text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredSubmissions.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-12 text-center text-gray-500">
                      <span className="material-icons text-5xl mb-3 opacity-30">inbox</span>
                      <div>No submissions found</div>
                    </td>
                  </tr>
                ) : (
                  filteredSubmissions.map((submission) => (
                    <tr key={submission.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-5 px-6">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center mr-3">
                            <span className="material-icons text-primary-600">{submission.agentIcon}</span>
                          </div>
                          <div>
                            <div className="text-gray-900 font-semibold">{submission.title}</div>
                            <div className="text-gray-500 text-sm mt-1">
                              <span className="material-icons text-xs align-middle mr-1">calendar_today</span>
                              {submission.date}
                              <span className="mx-2">•</span>
                              <span className="material-icons text-xs align-middle mr-1">folder</span>
                              {submission.filesCount} files
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <div className="text-sm text-gray-700 font-medium">{submission.agent}</div>
                      </td>
                      <td className="py-5 px-6">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {submission.industry}
                        </span>
                      </td>
                      <td className="py-5 px-6">
                        {getStatusBadge(submission.status)}
                      </td>
                      <td className="py-5 px-6">
                        {submission.score ? (
                          <div className="flex items-center">
                            <div className="text-2xl font-bold text-gray-900">{submission.score}</div>
                            <div className="text-sm text-gray-500 ml-1">/100</div>
                          </div>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="py-5 px-6 text-right">
                        <Link
                          to={`/submissions/${submission.id}`}
                          className="glass-btn-secondary rounded-lg px-4 py-2 text-sm font-semibold inline-flex items-center"
                        >
                          <span className="material-icons text-sm mr-1">visibility</span>
                          View
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredSubmissions.length > 0 && (
            <div className="px-6 py-4 bg-gray-50/80 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing {filteredSubmissions.length} of {submissions.length} submissions
              </div>
              <div className="flex items-center space-x-2">
                <button className="glass-btn-secondary rounded-lg px-3 py-2 text-sm disabled:opacity-50" disabled>
                  <span className="material-icons text-sm">chevron_left</span>
                </button>
                <button className="glass-btn-primary rounded-lg px-4 py-2 text-sm">1</button>
                <button className="glass-btn-secondary rounded-lg px-4 py-2 text-sm">2</button>
                <button className="glass-btn-secondary rounded-lg px-4 py-2 text-sm">3</button>
                <button className="glass-btn-secondary rounded-lg px-3 py-2 text-sm">
                  <span className="material-icons text-sm">chevron_right</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  )
}

export default SubmissionsListPage
