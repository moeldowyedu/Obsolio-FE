import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MainLayout from '../../components/layout/MainLayout'

const AgentSelectionPage = () => {
  const navigate = useNavigate()
  const [selectedAgent, setSelectedAgent] = useState(null)

  const agents = [
    {
      id: 'video-audio',
      name: 'Video & Audio Analysis',
      icon: 'videocam',
      description: 'Evaluate presentations, pitches, interviews, and recorded content with advanced AI analysis.',
      features: ['Speech analysis', 'Visual assessment', 'Body language', 'Presentation skills'],
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 'document',
      name: 'Document Review',
      icon: 'description',
      description: 'Analyze PDF, Word documents, essays, reports, and written content with intelligent understanding.',
      features: ['Content analysis', 'Structure evaluation', 'Grammar check', 'Citation review'],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'code',
      name: 'Source Code Assessment',
      icon: 'code',
      description: 'Review programming projects, code quality, structure, and best practices across multiple languages.',
      features: ['Code quality', 'Best practices', 'Documentation', 'Performance'],
      color: 'from-green-500 to-emerald-500',
    },
    {
      id: 'custom',
      name: 'Custom Evaluation Criteria',
      icon: 'tune',
      description: 'Define your own evaluation metrics and scoring system tailored to specific needs.',
      features: ['Custom rubrics', 'Flexible scoring', 'Weighted criteria', 'Multi-format support'],
      color: 'from-orange-500 to-yellow-500',
    },
    {
      id: 'report',
      name: 'AI Report Generation',
      icon: 'assessment',
      description: 'Generate comprehensive evaluation reports with detailed insights and improvement recommendations.',
      features: ['Detailed feedback', 'Score breakdown', 'Recommendations', 'Export options'],
      color: 'from-red-500 to-pink-500',
    },
    {
      id: 'consistent',
      name: 'Objective & Consistent',
      icon: 'security',
      description: 'Ensure fair, unbiased evaluations across all submissions with AI-powered consistency.',
      features: ['Bias elimination', 'Fair scoring', 'Consistent criteria', 'Transparent process'],
      color: 'from-indigo-500 to-purple-500',
    },
  ]

  const handleSelectAgent = (agentId) => {
    setSelectedAgent(agentId)
  }

  const handleContinue = () => {
    if (selectedAgent) {
      // Navigate to submission form with selected agent
      navigate(`/submissions/create?agent=${selectedAgent}`)
    }
  }

  return (
    <MainLayout>
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Choose Your AI Agent
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select the AI agent that best matches your evaluation needs. Each agent is specialized for specific content types and assessment requirements.
            </p>
          </div>

          {/* Agent Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {agents.map((agent) => (
              <div
                key={agent.id}
                onClick={() => handleSelectAgent(agent.id)}
                className={`glass-card rounded-3xl p-6 cursor-pointer transition-all duration-300 ${
                  selectedAgent === agent.id
                    ? 'ring-4 ring-primary-500 shadow-2xl scale-105'
                    : 'hover:shadow-xl hover:scale-102'
                }`}
              >
                {/* Icon with gradient */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${agent.color} flex items-center justify-center mb-4`}>
                  <span className="material-icons text-4xl text-white">{agent.icon}</span>
                </div>

                {/* Agent Name */}
                <h3 className="text-xl font-bold text-gray-900 mb-2">{agent.name}</h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4">{agent.description}</p>

                {/* Features */}
                <div className="space-y-2">
                  {agent.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-700">
                      <span className="material-icons text-primary-600 text-sm mr-2">check_circle</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Selection Indicator */}
                {selectedAgent === agent.id && (
                  <div className="mt-4 flex items-center justify-center">
                    <div className="glass-btn-primary rounded-full px-4 py-2 text-sm">
                      <span className="flex items-center">
                        <span className="material-icons text-sm mr-1">check</span>
                        Selected
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Continue Button */}
          <div className="flex justify-center">
            <button
              onClick={handleContinue}
              disabled={!selectedAgent}
              className={`glass-btn-primary rounded-full px-12 py-4 text-lg font-semibold transition-all duration-300 ${
                selectedAgent
                  ? 'glow hover:scale-105'
                  : 'opacity-50 cursor-not-allowed'
              }`}
            >
              {selectedAgent ? 'Continue to Submission Form' : 'Select an Agent to Continue'}
              {selectedAgent && <span className="material-icons ml-2">arrow_forward</span>}
            </button>
          </div>

          {/* Help Text */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              Not sure which agent to choose?{' '}
              <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">
                View detailed comparison
              </a>
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default AgentSelectionPage
