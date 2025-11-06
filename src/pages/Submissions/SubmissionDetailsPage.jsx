import { useState } from 'react'
import MainLayout from '../../components/layout/MainLayout'
import { useParams, Link } from 'react-router-dom'

const SubmissionDetailsPage = () => {
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState('overview')

  // Mock submission data
  const submission = {
    id: id,
    title: 'Machine Learning Model Assessment',
    agent: 'Source Code Assessment',
    agentIcon: 'code',
    industry: 'Technology',
    status: 'completed',
    score: 92,
    date: '2025-11-01',
    completedDate: '2025-11-01 14:30:00',
    submittedBy: 'John Doe',
    description: 'Comprehensive assessment of a machine learning model including code quality, architecture, documentation, and performance evaluation.',
    filesCount: 5,
    duration: '2.5 hours',
    evaluationType: 'Automated',
    humanReview: false,
    files: [
      { name: 'model.py', size: '15.2 KB', type: 'Python' },
      { name: 'train.py', size: '8.7 KB', type: 'Python' },
      { name: 'utils.py', size: '5.1 KB', type: 'Python' },
      { name: 'requirements.txt', size: '0.8 KB', type: 'Text' },
      { name: 'README.md', size: '3.2 KB', type: 'Markdown' },
    ],
    criteria: [
      { name: 'Code Quality', weight: 30, score: 95 },
      { name: 'Documentation', weight: 20, score: 88 },
      { name: 'Architecture', weight: 25, score: 92 },
      { name: 'Performance', weight: 15, score: 90 },
      { name: 'Best Practices', weight: 10, score: 94 },
    ],
    feedback: {
      strengths: [
        'Clean and well-structured code with proper modularity',
        'Comprehensive documentation and inline comments',
        'Efficient use of design patterns',
        'Good error handling and validation',
        'Following PEP 8 style guidelines'
      ],
      improvements: [
        'Consider adding more unit tests for edge cases',
        'Some functions could be optimized for better performance',
        'Add type hints for better code maintainability',
        'Include more examples in documentation'
      ],
      summary: 'Overall excellent submission demonstrating strong understanding of machine learning concepts and software engineering best practices. The code is well-organized, documented, and follows industry standards.'
    },
    timeline: [
      { event: 'Submission Created', time: '2025-11-01 10:00:00', icon: 'upload_file', color: 'blue' },
      { event: 'Processing Started', time: '2025-11-01 10:05:00', icon: 'play_circle', color: 'purple' },
      { event: 'Code Analysis Completed', time: '2025-11-01 11:30:00', icon: 'code', color: 'indigo' },
      { event: 'Documentation Review', time: '2025-11-01 12:00:00', icon: 'description', color: 'cyan' },
      { event: 'Final Evaluation', time: '2025-11-01 14:00:00', icon: 'assessment', color: 'orange' },
      { event: 'Completed', time: '2025-11-01 14:30:00', icon: 'check_circle', color: 'green' },
    ]
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { bg: 'bg-green-100', text: 'text-green-800', icon: 'check_circle' },
      in_progress: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: 'schedule' },
      pending: { bg: 'bg-gray-100', text: 'text-gray-800', icon: 'pending' },
      failed: { bg: 'bg-red-100', text: 'text-red-800', icon: 'error' },
    }
    const config = statusConfig[status] || statusConfig.pending
    return (
      <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold ${config.bg} ${config.text}`}>
        <span className="material-icons text-sm mr-2">{config.icon}</span>
        {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
      </span>
    )
  }

  return (
    <MainLayout>
      <div className="py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/submissions" className="text-primary-600 hover:text-primary-700 inline-flex items-center mb-4 font-semibold">
            <span className="material-icons mr-1">arrow_back</span>
            Back to Submissions
          </Link>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 font-heading">{submission.title}</h1>
              <div className="flex items-center space-x-4 text-gray-600">
                <span className="flex items-center">
                  <span className="material-icons text-sm mr-1">calendar_today</span>
                  {submission.date}
                </span>
                <span className="flex items-center">
                  <span className="material-icons text-sm mr-1">schedule</span>
                  {submission.duration}
                </span>
                <span className="flex items-center">
                  <span className="material-icons text-sm mr-1">person</span>
                  {submission.submittedBy}
                </span>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              {getStatusBadge(submission.status)}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Overall Score</span>
              <span className="material-icons text-primary-600">star</span>
            </div>
            <div className="text-4xl font-bold text-gray-900">{submission.score}</div>
            <div className="text-sm text-gray-500 mt-1">out of 100</div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Files Submitted</span>
              <span className="material-icons text-blue-600">folder</span>
            </div>
            <div className="text-4xl font-bold text-gray-900">{submission.filesCount}</div>
            <div className="text-sm text-gray-500 mt-1">documents</div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Processing Time</span>
              <span className="material-icons text-purple-600">timer</span>
            </div>
            <div className="text-4xl font-bold text-gray-900">2.5</div>
            <div className="text-sm text-gray-500 mt-1">hours</div>
          </div>

          <div className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Agent Used</span>
              <span className="material-icons text-green-600">{submission.agentIcon}</span>
            </div>
            <div className="text-lg font-bold text-gray-900 mt-2">{submission.agent}</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="glass-card rounded-2xl overflow-hidden mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-6 py-4 text-sm font-semibold transition-colors ${
                  activeTab === 'overview'
                    ? 'border-b-2 border-primary-600 text-primary-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="flex items-center">
                  <span className="material-icons text-sm mr-2">dashboard</span>
                  Overview
                </span>
              </button>
              <button
                onClick={() => setActiveTab('evaluation')}
                className={`px-6 py-4 text-sm font-semibold transition-colors ${
                  activeTab === 'evaluation'
                    ? 'border-b-2 border-primary-600 text-primary-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="flex items-center">
                  <span className="material-icons text-sm mr-2">assessment</span>
                  Evaluation
                </span>
              </button>
              <button
                onClick={() => setActiveTab('files')}
                className={`px-6 py-4 text-sm font-semibold transition-colors ${
                  activeTab === 'files'
                    ? 'border-b-2 border-primary-600 text-primary-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="flex items-center">
                  <span className="material-icons text-sm mr-2">folder</span>
                  Files
                </span>
              </button>
              <button
                onClick={() => setActiveTab('timeline')}
                className={`px-6 py-4 text-sm font-semibold transition-colors ${
                  activeTab === 'timeline'
                    ? 'border-b-2 border-primary-600 text-primary-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="flex items-center">
                  <span className="material-icons text-sm mr-2">timeline</span>
                  Timeline
                </span>
              </button>
            </nav>
          </div>

          <div className="p-8">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{submission.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Industry:</span>
                        <span className="font-semibold text-gray-900">{submission.industry}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Evaluation Type:</span>
                        <span className="font-semibold text-gray-900">{submission.evaluationType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Human Review:</span>
                        <span className={`font-semibold ${submission.humanReview ? 'text-blue-600' : 'text-gray-600'}`}>
                          {submission.humanReview ? 'Required' : 'Not Required'}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Completed:</span>
                        <span className="font-semibold text-gray-900">{submission.completedDate}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Quick Actions</h3>
                    <div className="space-y-3">
                      <button className="w-full glass-btn-primary rounded-xl py-3 flex items-center justify-center">
                        <span className="material-icons mr-2">download</span>
                        Download Report
                      </button>
                      <button className="w-full glass-btn-secondary rounded-xl py-3 flex items-center justify-center">
                        <span className="material-icons mr-2">share</span>
                        Share Results
                      </button>
                      <button className="w-full glass-btn-secondary rounded-xl py-3 flex items-center justify-center">
                        <span className="material-icons mr-2">refresh</span>
                        Re-evaluate
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Evaluation Tab */}
            {activeTab === 'evaluation' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Evaluation Criteria</h3>
                  <div className="space-y-4">
                    {submission.criteria.map((criterion, index) => (
                      <div key={index} className="glass-card rounded-xl p-6">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">{criterion.name}</h4>
                            <p className="text-sm text-gray-600">Weight: {criterion.weight}%</p>
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-bold text-primary-600">{criterion.score}</div>
                            <div className="text-sm text-gray-600">/100</div>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all"
                            style={{ width: `${criterion.score}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">AI Feedback</h3>

                  <div className="glass-card rounded-xl p-6 mb-4 border-l-4 border-green-500">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="material-icons text-green-600 mr-2">thumb_up</span>
                      Strengths
                    </h4>
                    <ul className="space-y-2">
                      {submission.feedback.strengths.map((strength, index) => (
                        <li key={index} className="flex items-start text-gray-700">
                          <span className="material-icons text-green-600 text-sm mr-2 mt-1">check_circle</span>
                          <span>{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="glass-card rounded-xl p-6 mb-4 border-l-4 border-yellow-500">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="material-icons text-yellow-600 mr-2">lightbulb</span>
                      Areas for Improvement
                    </h4>
                    <ul className="space-y-2">
                      {submission.feedback.improvements.map((improvement, index) => (
                        <li key={index} className="flex items-start text-gray-700">
                          <span className="material-icons text-yellow-600 text-sm mr-2 mt-1">arrow_forward</span>
                          <span>{improvement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="glass-card rounded-xl p-6 bg-gradient-to-br from-purple-50 to-blue-50">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="material-icons text-purple-600 mr-2">summarize</span>
                      Summary
                    </h4>
                    <p className="text-gray-700 leading-relaxed">{submission.feedback.summary}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Files Tab */}
            {activeTab === 'files' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Submitted Files</h3>
                <div className="space-y-3">
                  {submission.files.map((file, index) => (
                    <div key={index} className="glass-card rounded-xl p-5 hover:shadow-lg transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center mr-4">
                            <span className="material-icons text-primary-600">description</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{file.name}</h4>
                            <div className="text-sm text-gray-600">
                              {file.type} • {file.size}
                            </div>
                          </div>
                        </div>
                        <button className="glass-btn-secondary rounded-lg px-4 py-2 text-sm font-semibold flex items-center">
                          <span className="material-icons text-sm mr-1">download</span>
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Timeline Tab */}
            {activeTab === 'timeline' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Processing Timeline</h3>
                <div className="space-y-4">
                  {submission.timeline.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className={`w-10 h-10 rounded-full bg-${item.color}-100 flex items-center justify-center mr-4 flex-shrink-0`}>
                        <span className={`material-icons text-${item.color}-600 text-sm`}>{item.icon}</span>
                      </div>
                      <div className="flex-1">
                        <div className="glass-card rounded-xl p-4">
                          <h4 className="font-semibold text-gray-900">{item.event}</h4>
                          <p className="text-sm text-gray-600 mt-1">{item.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default SubmissionDetailsPage
