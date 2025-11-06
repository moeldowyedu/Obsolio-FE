import { useState } from 'react'
import MainLayout from '../../components/layout/MainLayout'
import { useParams, Link } from 'react-router-dom'

const ReportViewerPage = () => {
  const { id } = useParams()
  const [isPrinting, setIsPrinting] = useState(false)

  // Mock report data
  const report = {
    id: id,
    generatedDate: '2025-11-05',
    submissionTitle: 'Machine Learning Model Assessment',
    submittedBy: 'John Doe',
    submittedDate: '2025-11-01',
    completedDate: '2025-11-01',
    agent: 'Source Code Assessment',
    industry: 'Technology',
    overallScore: 92,
    grade: 'Excellent',
    processingTime: '2.5 hours',
    filesAnalyzed: 5,

    executiveSummary: 'This comprehensive evaluation assesses a machine learning model implementation demonstrating exceptional technical proficiency and professional coding standards. The submission exhibits strong fundamentals in code quality, documentation, and best practices. The implementation is production-ready with minor recommendations for enhancement.',

    criteria: [
      {
        name: 'Code Quality',
        weight: 25,
        score: 95,
        feedback: 'Outstanding code structure with excellent modularity and clean architecture. Functions are well-defined with clear responsibilities. Code is highly readable with consistent formatting and meaningful variable names.',
        strengths: [
          'Excellent separation of concerns',
          'Clear and intuitive naming conventions',
          'Consistent code style throughout'
        ],
        improvements: [
          'Consider extracting magic numbers into constants'
        ]
      },
      {
        name: 'Documentation',
        weight: 20,
        score: 88,
        feedback: 'Good documentation coverage with clear README and API documentation. Most functions have docstrings explaining purpose and parameters.',
        strengths: [
          'Comprehensive README with setup instructions',
          'Well-documented public APIs',
          'Clear usage examples'
        ],
        improvements: [
          'Add more inline comments for complex algorithms',
          'Include architecture diagrams',
          'Document edge cases and limitations'
        ]
      },
      {
        name: 'Best Practices',
        weight: 25,
        score: 92,
        feedback: 'Strong adherence to industry standards and coding conventions. Proper error handling and input validation implemented.',
        strengths: [
          'Follows PEP 8 style guide',
          'Comprehensive error handling',
          'Proper use of design patterns'
        ],
        improvements: [
          'Consider implementing a logging strategy',
          'Add configuration management'
        ]
      },
      {
        name: 'Performance',
        weight: 15,
        score: 90,
        feedback: 'Efficient implementation with good algorithmic complexity. Proper use of caching and optimization techniques.',
        strengths: [
          'Efficient data structures',
          'Good time complexity',
          'Smart use of caching'
        ],
        improvements: [
          'Profile memory usage for large datasets',
          'Consider async operations for I/O'
        ]
      },
      {
        name: 'Testing',
        weight: 15,
        score: 88,
        feedback: 'Good test coverage with unit tests and integration tests. Most critical paths are covered.',
        strengths: [
          'Good test coverage (85%)',
          'Clear test structure',
          'Both unit and integration tests'
        ],
        improvements: [
          'Add more edge case tests',
          'Include performance benchmarks',
          'Add E2E tests'
        ]
      },
    ],

    keyFindings: [
      'Code demonstrates professional-grade quality suitable for production deployment',
      'Strong understanding of software engineering principles and design patterns',
      'Excellent code organization with clear module boundaries',
      'Good documentation but could benefit from more inline comments',
      'Test coverage is good but can be improved with additional edge case scenarios',
      'Performance optimization shows careful consideration of algorithmic efficiency',
    ],

    recommendations: [
      {
        priority: 'High',
        title: 'Enhance Test Coverage',
        description: 'Add comprehensive edge case testing and increase coverage to 95%+',
        impact: 'Will improve code reliability and maintainability'
      },
      {
        priority: 'Medium',
        title: 'Expand Documentation',
        description: 'Include architecture diagrams and more detailed inline comments for complex algorithms',
        impact: 'Will improve code understanding for new team members'
      },
      {
        priority: 'Low',
        title: 'Performance Profiling',
        description: 'Conduct memory profiling for large dataset scenarios',
        impact: 'Will ensure scalability for production loads'
      },
    ],

    conclusion: 'This submission represents high-quality work that meets professional standards. The implementation demonstrates strong technical skills, attention to detail, and adherence to best practices. With the recommended enhancements, this project would achieve exceptional status. The code is ready for production deployment with minimal modifications required.',

    evaluator: 'Aasim Precision AI Agent v2.0',
    reportVersion: '1.0',
  }

  const handlePrint = () => {
    setIsPrinting(true)
    setTimeout(() => {
      window.print()
      setIsPrinting(false)
    }, 100)
  }

  const handleDownloadPDF = () => {
    alert('PDF download functionality would be implemented here')
  }

  return (
    <MainLayout>
      <div className="py-8">
        {/* Action Bar */}
        <div className="flex items-center justify-between mb-8 no-print">
          <Link
            to={`/evaluations/${id}`}
            className="text-primary-600 hover:text-primary-700 font-semibold inline-flex items-center"
          >
            <span className="material-icons text-sm mr-1">arrow_back</span>
            Back to Results
          </Link>
          <div className="flex space-x-3">
            <button
              onClick={handlePrint}
              className="glass-btn-secondary rounded-xl px-6 py-3 font-semibold inline-flex items-center"
            >
              <span className="material-icons mr-2">print</span>
              Print
            </button>
            <button
              onClick={handleDownloadPDF}
              className="glass-btn-primary rounded-xl px-6 py-3 font-semibold inline-flex items-center"
            >
              <span className="material-icons mr-2">download</span>
              Download PDF
            </button>
          </div>
        </div>

        {/* Report Content */}
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-5xl mx-auto" id="report-content">
          {/* Header */}
          <div className="border-b-4 border-primary-600 pb-8 mb-8">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-5xl font-bold text-gray-900 mb-3 font-heading">
                  Evaluation Report
                </h1>
                <p className="text-xl text-gray-600">{report.submissionTitle}</p>
              </div>
              <div className="text-right">
                <div className="text-6xl font-bold text-primary-600 mb-1">{report.overallScore}</div>
                <div className="text-lg text-gray-600">/ 100</div>
                <div className="text-xl font-semibold text-green-600 mt-2">{report.grade}</div>
              </div>
            </div>
          </div>

          {/* Report Metadata */}
          <div className="grid grid-cols-2 gap-6 mb-12 p-6 bg-gray-50 rounded-2xl">
            <div>
              <div className="text-sm font-semibold text-gray-600 mb-1">Report ID</div>
              <div className="text-lg text-gray-900">{report.id}</div>
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-600 mb-1">Generated Date</div>
              <div className="text-lg text-gray-900">{report.generatedDate}</div>
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-600 mb-1">Submitted By</div>
              <div className="text-lg text-gray-900">{report.submittedBy}</div>
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-600 mb-1">Industry</div>
              <div className="text-lg text-gray-900">{report.industry}</div>
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-600 mb-1">Agent Used</div>
              <div className="text-lg text-gray-900">{report.agent}</div>
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-600 mb-1">Processing Time</div>
              <div className="text-lg text-gray-900">{report.processingTime}</div>
            </div>
          </div>

          {/* Executive Summary */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center border-b-2 border-gray-200 pb-3">
              <span className="material-icons text-primary-600 mr-3 text-4xl">summarize</span>
              Executive Summary
            </h2>
            <p className="text-gray-800 leading-relaxed text-lg">
              {report.executiveSummary}
            </p>
          </section>

          {/* Evaluation Criteria */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center border-b-2 border-gray-200 pb-3">
              <span className="material-icons text-primary-600 mr-3 text-4xl">assessment</span>
              Detailed Evaluation
            </h2>

            <div className="space-y-8">
              {report.criteria.map((criterion, index) => (
                <div key={index} className="border-l-4 border-primary-500 pl-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-2xl font-bold text-gray-900">{criterion.name}</h3>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary-600">
                        {criterion.score}/100
                      </div>
                      <div className="text-sm text-gray-600">Weight: {criterion.weight}%</div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4 leading-relaxed">{criterion.feedback}</p>

                  <div className="grid grid-cols-2 gap-4">
                    {/* Strengths */}
                    <div className="bg-green-50 rounded-xl p-4">
                      <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                        <span className="material-icons text-sm mr-1">check_circle</span>
                        Strengths
                      </h4>
                      <ul className="space-y-1">
                        {criterion.strengths.map((strength, idx) => (
                          <li key={idx} className="text-sm text-green-700 flex items-start">
                            <span className="mr-2">•</span>
                            <span>{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Improvements */}
                    <div className="bg-orange-50 rounded-xl p-4">
                      <h4 className="font-semibold text-orange-800 mb-2 flex items-center">
                        <span className="material-icons text-sm mr-1">lightbulb</span>
                        Areas for Improvement
                      </h4>
                      <ul className="space-y-1">
                        {criterion.improvements.map((improvement, idx) => (
                          <li key={idx} className="text-sm text-orange-700 flex items-start">
                            <span className="mr-2">•</span>
                            <span>{improvement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Key Findings */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center border-b-2 border-gray-200 pb-3">
              <span className="material-icons text-primary-600 mr-3 text-4xl">fact_check</span>
              Key Findings
            </h2>
            <ul className="space-y-3">
              {report.keyFindings.map((finding, index) => (
                <li key={index} className="flex items-start text-gray-800 text-lg">
                  <span className="material-icons text-primary-600 mr-3 mt-1">arrow_right</span>
                  <span>{finding}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Recommendations */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center border-b-2 border-gray-200 pb-3">
              <span className="material-icons text-primary-600 mr-3 text-4xl">recommend</span>
              Recommendations
            </h2>
            <div className="space-y-4">
              {report.recommendations.map((rec, index) => (
                <div key={index} className="border-2 border-gray-200 rounded-xl p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{rec.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      rec.priority === 'High' ? 'bg-red-100 text-red-800' :
                      rec.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {rec.priority} Priority
                    </span>
                  </div>
                  <p className="text-gray-700 mb-2">{rec.description}</p>
                  <p className="text-sm text-gray-600 italic">
                    <span className="font-semibold">Impact:</span> {rec.impact}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Conclusion */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center border-b-2 border-gray-200 pb-3">
              <span className="material-icons text-primary-600 mr-3 text-4xl">done_all</span>
              Conclusion
            </h2>
            <div className="bg-primary-50 border-2 border-primary-200 rounded-2xl p-6">
              <p className="text-gray-800 leading-relaxed text-lg">
                {report.conclusion}
              </p>
            </div>
          </section>

          {/* Footer */}
          <div className="border-t-2 border-gray-200 pt-8 mt-12">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div>
                <p className="font-semibold">Generated by: {report.evaluator}</p>
                <p>Report Version: {report.reportVersion}</p>
              </div>
              <div className="text-right">
                <p>Generated on: {report.generatedDate}</p>
                <p className="text-xs mt-1">© 2025 Aasim - Precision AI Agent Platform</p>
              </div>
            </div>
          </div>
        </div>

        {/* Print Styles */}
        <style jsx>{`
          @media print {
            .no-print {
              display: none !important;
            }
            body {
              print-color-adjust: exact;
              -webkit-print-color-adjust: exact;
            }
          }
        `}</style>
      </div>
    </MainLayout>
  )
}

export default ReportViewerPage
