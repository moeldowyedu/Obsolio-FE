import { useState } from 'react'
import MainLayout from '../../components/layout/MainLayout'
import { useParams, Link } from 'react-router-dom'

const EvaluationResultsPage = () => {
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState('overview')

  // Mock evaluation data
  const evaluation = {
    id: id,
    submissionTitle: 'Machine Learning Model Assessment',
    submittedBy: 'John Doe',
    submittedDate: '2025-11-01',
    completedDate: '2025-11-01',
    agent: 'Source Code Assessment',
    agentIcon: 'code',
    industry: 'Technology',
    overallScore: 92,
    status: 'completed',
    processingTime: '2.5 hours',
    filesCount: 5,
    criteria: [
      { name: 'Code Quality', weight: 25, score: 95, maxScore: 100, feedback: 'Excellent code structure with proper modularity and clean architecture' },
      { name: 'Documentation', weight: 20, score: 88, maxScore: 100, feedback: 'Good documentation coverage, could benefit from more inline comments' },
      { name: 'Best Practices', weight: 25, score: 92, maxScore: 100, feedback: 'Strong adherence to industry standards and coding conventions' },
      { name: 'Performance', weight: 15, score: 90, maxScore: 100, feedback: 'Efficient algorithms with good time complexity considerations' },
      { name: 'Testing', weight: 15, score: 88, maxScore: 100, feedback: 'Good test coverage, recommend adding more edge case tests' },
    ],
    strengths: [
      'Excellent code organization with clear separation of concerns',
      'Strong error handling and input validation',
      'Well-documented API endpoints with clear examples',
      'Efficient use of modern JavaScript/Python features',
      'Good version control practices with meaningful commit messages',
    ],
    improvements: [
      'Consider adding more comprehensive unit tests for edge cases',
      'Some functions could be refactored to reduce complexity',
      'Documentation could include more usage examples',
      'Add performance benchmarks for critical operations',
    ],
    aiSummary: 'This submission demonstrates strong technical skills and professional-grade code quality. The implementation is well-structured, follows industry best practices, and shows attention to detail. The code is maintainable and scalable. Minor improvements in testing coverage and documentation would elevate this to an exceptional submission.',
    detailedAnalysis: {
      codeComplexity: {
        average: 'Low-Medium',
        highest: 'Medium',
        recommendation: 'Consider refactoring functions with cyclomatic complexity > 10'
      },
      securityIssues: {
        critical: 0,
        high: 0,
        medium: 2,
        low: 3,
        details: '2 medium severity issues found related to input sanitization. 3 low severity suggestions for security headers.'
      },
      maintainability: {
        index: 85,
        rating: 'A',
        note: 'Code is highly maintainable with good structure and naming conventions'
      }
    },
    comparisonData: {
      averageScore: 78,
      topPercentile: 15,
      submissionsInCategory: 245,
      yourRank: 12
    }
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'dashboard' },
    { id: 'detailed', label: 'Detailed Analysis', icon: 'analytics' },
    { id: 'comparison', label: 'Comparison', icon: 'compare_arrows' },
    { id: 'recommendations', label: 'Recommendations', icon: 'lightbulb' },
  ]

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-blue-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreLabel = (score) => {
    if (score >= 90) return 'Excellent'
    if (score >= 80) return 'Good'
    if (score >= 70) return 'Satisfactory'
    return 'Needs Improvement'
  }

  return (
    <MainLayout>
      <div className="py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/submissions" className="text-primary-600 hover:text-primary-700 font-semibold mb-4 inline-flex items-center">
            <span className="material-icons text-sm mr-1">arrow_back</span>
            Back to Submissions
          </Link>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2 font-heading">{evaluation.submissionTitle}</h1>
              <p className="text-gray-600 flex items-center flex-wrap gap-4">
                <span className="flex items-center">
                  <span className="material-icons text-sm mr-1">person</span>
                  {evaluation.submittedBy}
                </span>
                <span className="flex items-center">
                  <span className="material-icons text-sm mr-1">calendar_today</span>
                  Submitted: {evaluation.submittedDate}
                </span>
                <span className="flex items-center">
                  <span className="material-icons text-sm mr-1">check_circle</span>
                  Completed: {evaluation.completedDate}
                </span>
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <Link
                to={`/evaluations/${id}/report`}
                className="glass-btn-primary rounded-xl px-6 py-3 font-semibold inline-flex items-center"
              >
                <span className="material-icons mr-2">description</span>
                View Full Report
              </Link>
              <button className="glass-btn-secondary rounded-xl px-6 py-3 font-semibold inline-flex items-center">
                <span className="material-icons mr-2">download</span>
                Download PDF
              </button>
            </div>
          </div>
        </div>

        {/* Score Card */}
        <div className="glass-card rounded-3xl p-8 mb-8 bg-gradient-to-br from-primary-50 to-white">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* Overall Score */}
            <div className="md:col-span-2 flex items-center justify-center border-r border-gray-200">
              <div className="text-center">
                <div className="text-7xl font-bold text-primary-600 mb-2">{evaluation.overallScore}</div>
                <div className="text-2xl text-gray-500 mb-2">/100</div>
                <div className={`text-xl font-semibold ${getScoreColor(evaluation.overallScore)}`}>
                  {getScoreLabel(evaluation.overallScore)}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="md:col-span-3 grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <span className="material-icons text-primary-600 mr-2">{evaluation.agentIcon}</span>
                  <span className="text-sm font-medium text-gray-600">Agent Used</span>
                </div>
                <div className="text-lg font-bold text-gray-900">{evaluation.agent}</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <span className="material-icons text-primary-600 mr-2">folder</span>
                  <span className="text-sm font-medium text-gray-600">Files Analyzed</span>
                </div>
                <div className="text-lg font-bold text-gray-900">{evaluation.filesCount}</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <span className="material-icons text-primary-600 mr-2">schedule</span>
                  <span className="text-sm font-medium text-gray-600">Processing Time</span>
                </div>
                <div className="text-lg font-bold text-gray-900">{evaluation.processingTime}</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <span className="material-icons text-primary-600 mr-2">category</span>
                  <span className="text-sm font-medium text-gray-600">Industry</span>
                </div>
                <div className="text-lg font-bold text-gray-900">{evaluation.industry}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-2 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all flex items-center ${
                  activeTab === tab.id
                    ? 'glass-btn-primary'
                    : 'glass-btn-secondary'
                }`}
              >
                <span className="material-icons text-sm mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Criteria Breakdown */}
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Evaluation Criteria Breakdown</h2>
              <div className="space-y-6">
                {evaluation.criteria.map((criterion, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{criterion.name}</h3>
                        <p className="text-sm text-gray-600">Weight: {criterion.weight}%</p>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${getScoreColor(criterion.score)}`}>
                          {criterion.score}/{criterion.maxScore}
                        </div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                      <div
                        className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all"
                        style={{ width: `${criterion.score}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-700">{criterion.feedback}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Summary */}
            <div className="glass-card rounded-2xl p-6 bg-gradient-to-br from-blue-50 to-white">
              <div className="flex items-start space-x-3 mb-4">
                <span className="material-icons text-3xl text-blue-600">auto_awesome</span>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">AI Summary</h2>
                  <p className="text-sm text-gray-600">Generated by Aasim Precision AI Agent</p>
                </div>
              </div>
              <p className="text-gray-800 leading-relaxed">{evaluation.aiSummary}</p>
            </div>

            {/* Strengths & Improvements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Strengths */}
              <div className="glass-card rounded-2xl p-6 bg-gradient-to-br from-green-50 to-white">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="material-icons text-green-600 mr-2">thumb_up</span>
                  Strengths
                </h3>
                <ul className="space-y-3">
                  {evaluation.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start">
                      <span className="material-icons text-green-600 text-sm mr-2 mt-0.5">check_circle</span>
                      <span className="text-gray-700 text-sm">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Areas for Improvement */}
              <div className="glass-card rounded-2xl p-6 bg-gradient-to-br from-orange-50 to-white">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <span className="material-icons text-orange-600 mr-2">trending_up</span>
                  Areas for Improvement
                </h3>
                <ul className="space-y-3">
                  {evaluation.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start">
                      <span className="material-icons text-orange-600 text-sm mr-2 mt-0.5">lightbulb</span>
                      <span className="text-gray-700 text-sm">{improvement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'detailed' && (
          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Detailed Technical Analysis</h2>

              <div className="space-y-6">
                {/* Code Complexity */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <span className="material-icons text-primary-600 mr-2">account_tree</span>
                    Code Complexity
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="glass-card rounded-xl p-4">
                      <div className="text-sm text-gray-600 mb-1">Average Complexity</div>
                      <div className="text-xl font-bold text-gray-900">{evaluation.detailedAnalysis.codeComplexity.average}</div>
                    </div>
                    <div className="glass-card rounded-xl p-4">
                      <div className="text-sm text-gray-600 mb-1">Highest Complexity</div>
                      <div className="text-xl font-bold text-gray-900">{evaluation.detailedAnalysis.codeComplexity.highest}</div>
                    </div>
                    <div className="glass-card rounded-xl p-4">
                      <div className="text-sm text-gray-600 mb-1">Recommendation</div>
                      <div className="text-sm text-gray-700">{evaluation.detailedAnalysis.codeComplexity.recommendation}</div>
                    </div>
                  </div>
                </div>

                {/* Security Issues */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <span className="material-icons text-red-600 mr-2">security</span>
                    Security Analysis
                  </h3>
                  <div className="glass-card rounded-xl p-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-red-600">{evaluation.detailedAnalysis.securityIssues.critical}</div>
                        <div className="text-xs text-gray-600">Critical</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-orange-600">{evaluation.detailedAnalysis.securityIssues.high}</div>
                        <div className="text-xs text-gray-600">High</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-yellow-600">{evaluation.detailedAnalysis.securityIssues.medium}</div>
                        <div className="text-xs text-gray-600">Medium</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">{evaluation.detailedAnalysis.securityIssues.low}</div>
                        <div className="text-xs text-gray-600">Low</div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">{evaluation.detailedAnalysis.securityIssues.details}</p>
                  </div>
                </div>

                {/* Maintainability */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <span className="material-icons text-green-600 mr-2">build</span>
                    Maintainability Index
                  </h3>
                  <div className="glass-card rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="text-4xl font-bold text-green-600">{evaluation.detailedAnalysis.maintainability.index}</div>
                        <div className="text-sm text-gray-600">Rating: {evaluation.detailedAnalysis.maintainability.rating}</div>
                      </div>
                      <div className="w-32 h-32">
                        <svg className="transform -rotate-90 w-32 h-32">
                          <circle cx="64" cy="64" r="60" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                          <circle
                            cx="64"
                            cy="64"
                            r="60"
                            stroke="#10b981"
                            strokeWidth="8"
                            fill="none"
                            strokeDasharray={`${(evaluation.detailedAnalysis.maintainability.index / 100) * 377} 377`}
                          />
                        </svg>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">{evaluation.detailedAnalysis.maintainability.note}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'comparison' && (
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Performance Comparison</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card rounded-xl p-6 text-center">
                <div className="text-5xl font-bold text-primary-600 mb-2">{evaluation.overallScore}</div>
                <div className="text-sm text-gray-600 mb-4">Your Score</div>
                <div className="text-3xl font-bold text-gray-400 mb-2">{evaluation.comparisonData.averageScore}</div>
                <div className="text-sm text-gray-600">Category Average</div>
              </div>
              <div className="glass-card rounded-xl p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Your Rank</span>
                    <span className="text-xl font-bold text-gray-900">#{evaluation.comparisonData.yourRank}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Top Percentile</span>
                    <span className="text-xl font-bold text-green-600">{evaluation.comparisonData.topPercentile}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Submissions</span>
                    <span className="text-xl font-bold text-gray-900">{evaluation.comparisonData.submissionsInCategory}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
              <p className="text-sm text-green-800">
                <span className="font-semibold">Great work!</span> Your submission scored higher than {100 - evaluation.comparisonData.topPercentile}% of submissions in the {evaluation.industry} category.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommendations for Next Steps</h2>
            <div className="space-y-6">
              <div className="glass-card rounded-xl p-6 bg-gradient-to-r from-blue-50 to-white">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <span className="material-icons text-blue-600 mr-2">school</span>
                  Learning Resources
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-gray-700">
                    <span className="material-icons text-blue-600 text-sm mr-2">play_circle</span>
                    Advanced Testing Strategies Course
                  </li>
                  <li className="flex items-center text-sm text-gray-700">
                    <span className="material-icons text-blue-600 text-sm mr-2">play_circle</span>
                    Code Documentation Best Practices
                  </li>
                  <li className="flex items-center text-sm text-gray-700">
                    <span className="material-icons text-blue-600 text-sm mr-2">play_circle</span>
                    Performance Optimization Techniques
                  </li>
                </ul>
              </div>

              <div className="glass-card rounded-xl p-6 bg-gradient-to-r from-purple-50 to-white">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <span className="material-icons text-purple-600 mr-2">stars</span>
                  Next Challenge
                </h3>
                <p className="text-sm text-gray-700 mb-4">
                  Based on your performance, we recommend trying a more advanced project or contributing to open source initiatives.
                </p>
                <button className="glass-btn-primary rounded-xl px-4 py-2 text-sm font-semibold">
                  Explore Advanced Projects
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  )
}

export default EvaluationResultsPage
