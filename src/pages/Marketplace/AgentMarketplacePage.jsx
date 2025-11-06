import { useState } from 'react'
import MainLayout from '../../components/layout/MainLayout'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const AgentMarketplacePage = () => {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [selectedAgent, setSelectedAgent] = useState(null)

  const agents = [
    {
      id: 'code-judge',
      name: 'Precision Code Analyzer',
      category: 'Technology',
      icon: 'code',
      description: 'Expert at evaluating source code quality, best practices, and architecture patterns',
      price: 99,
      features: ['Code Quality Analysis', 'Security Audit', 'Performance Review', 'Documentation Check'],
      rating: 4.9,
      reviews: 127,
      evaluations: 3245,
      color: 'blue'
    },
    {
      id: 'essay-judge',
      name: 'Precision Writing Analyzer',
      category: 'Education',
      icon: 'edit',
      description: 'Specialized in evaluating essays, academic papers, and written content',
      price: 79,
      features: ['Grammar & Style', 'Structure Analysis', 'Plagiarism Check', 'Citation Review'],
      rating: 4.8,
      reviews: 98,
      evaluations: 2156,
      color: 'green'
    },
    {
      id: 'legal-judge',
      name: 'Legal Document Reviewer',
      category: 'Law',
      icon: 'gavel',
      description: 'Analyzes legal documents, contracts, and compliance requirements',
      price: 149,
      features: ['Contract Review', 'Compliance Check', 'Risk Assessment', 'Legal Citations'],
      rating: 4.9,
      reviews: 65,
      evaluations: 1532,
      color: 'purple'
    },
    {
      id: 'video-judge',
      name: 'Precision Video Analyzer',
      category: 'Communications',
      icon: 'videocam',
      description: 'Evaluates presentations, pitches, and video content for effectiveness',
      price: 89,
      features: ['Speech Analysis', 'Body Language', 'Visual Quality', 'Content Structure'],
      rating: 4.7,
      reviews: 82,
      evaluations: 1876,
      color: 'red'
    },
    {
      id: 'medical-judge',
      name: 'Medical Case Reviewer',
      category: 'Healthcare',
      icon: 'local_hospital',
      description: 'Reviews medical documentation and case studies for accuracy',
      price: 129,
      features: ['Clinical Accuracy', 'Evidence-Based', 'Compliance Review', 'Best Practices'],
      rating: 4.9,
      reviews: 54,
      evaluations: 1234,
      color: 'teal'
    },
    {
      id: 'design-judge',
      name: 'Precision Design Analyzer',
      category: 'Creative',
      icon: 'palette',
      description: 'Evaluates design work, portfolios, and creative projects',
      price: 79,
      features: ['Aesthetic Analysis', 'Technical Skills', 'Creativity Score', 'Market Fit'],
      rating: 4.8,
      reviews: 91,
      evaluations: 2089,
      color: 'pink'
    },
    {
      id: 'business-judge',
      name: 'Business Plan Evaluator',
      category: 'Business',
      icon: 'business_center',
      description: 'Analyzes business plans, financial projections, and market strategies',
      price: 119,
      features: ['Financial Analysis', 'Market Research', 'Feasibility Study', 'SWOT Analysis'],
      rating: 4.8,
      reviews: 73,
      evaluations: 1678,
      color: 'orange'
    },
    {
      id: 'research-judge',
      name: 'Precision Research Analyzer',
      category: 'Academic',
      icon: 'science',
      description: 'Expert review of research papers, methodology, and scientific findings',
      price: 109,
      features: ['Methodology Review', 'Statistical Analysis', 'Literature Review', 'Ethics Check'],
      rating: 4.9,
      reviews: 88,
      evaluations: 1945,
      color: 'indigo'
    },
  ]

  const categories = ['all', 'Technology', 'Education', 'Law', 'Healthcare', 'Business', 'Creative', 'Academic', 'Communications']

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === 'all' || agent.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const handleHireAgent = (agent) => {
    setSelectedAgent(agent)
  }

  const confirmHiring = () => {
    const agentId = selectedAgent.id
    const agentName = selectedAgent.name
    toast.success(`Successfully hired ${agentName}!`)
    setSelectedAgent(null)
    // Navigate to configuration page
    navigate(`/agent/configure/${agentId}`)
  }

  return (
    <MainLayout>
      <div className="py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4 font-heading">AI Agent Marketplace</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Browse and hire specialized Precision AI Agents trained for specific industries and tasks
          </p>
        </div>

        {/* Search and Filter */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="glass-card rounded-3xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-3">
                <div className="relative">
                  <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                  <input
                    type="text"
                    placeholder="Search agents by name or capability..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="glass-input w-full pl-12 py-3 text-lg"
                  />
                </div>
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="glass-input py-3"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Agent Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAgents.map((agent) => (
              <div
                key={agent.id}
                className="glass-card rounded-3xl p-6 hover:shadow-2xl transition-all cursor-pointer group"
                onClick={() => handleHireAgent(agent)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 rounded-2xl bg-${agent.color}-100 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <span className={`material-icons text-3xl text-${agent.color}-600`}>{agent.icon}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">${agent.price}</div>
                    <div className="text-xs text-gray-600">/month</div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{agent.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{agent.description}</p>

                {/* Rating */}
                <div className="flex items-center mb-4 pb-4 border-b border-gray-200">
                  <div className="flex items-center">
                    <span className="material-icons text-yellow-500 text-sm">star</span>
                    <span className="font-semibold text-gray-900 ml-1">{agent.rating}</span>
                    <span className="text-gray-600 text-sm ml-1">({agent.reviews})</span>
                  </div>
                  <div className="ml-auto text-xs text-gray-600">
                    {agent.evaluations.toLocaleString()} evaluations
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {agent.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-700">
                      <span className={`material-icons text-${agent.color}-600 text-xs mr-2`}>check_circle</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Hire Button */}
                <button className="w-full glass-btn-primary rounded-xl py-3 font-semibold group-hover:shadow-lg transition-all">
                  Hire Agent
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Modal for Agent Hiring */}
        {selectedAgent && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-6">
            <div className="glass-card rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center">
                  <div className={`w-16 h-16 rounded-2xl bg-${selectedAgent.color}-100 flex items-center justify-center mr-4`}>
                    <span className={`material-icons text-4xl text-${selectedAgent.color}-600`}>{selectedAgent.icon}</span>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900">{selectedAgent.name}</h2>
                    <p className="text-gray-600">{selectedAgent.category}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedAgent(null)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <span className="material-icons">close</span>
                </button>
              </div>

              <p className="text-gray-700 mb-6">{selectedAgent.description}</p>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Key Features</h3>
                <div className="grid grid-cols-2 gap-3">
                  {selectedAgent.features.map((feature, index) => (
                    <div key={index} className="flex items-center glass-card rounded-xl p-3">
                      <span className={`material-icons text-${selectedAgent.color}-600 text-sm mr-2`}>check_circle</span>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-2xl">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Rating</div>
                  <div className="flex items-center">
                    <span className="material-icons text-yellow-500">star</span>
                    <span className="font-bold text-gray-900 ml-1">{selectedAgent.rating}/5</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Reviews</div>
                  <div className="font-bold text-gray-900">{selectedAgent.reviews}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Evaluations</div>
                  <div className="font-bold text-gray-900">{selectedAgent.evaluations.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Price</div>
                  <div className="font-bold text-gray-900">${selectedAgent.price}/month</div>
                </div>
              </div>

              <div className="bg-primary-50 border-2 border-primary-200 rounded-2xl p-6 mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">What happens next?</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="material-icons text-primary-600 text-sm mr-2 mt-0.5">check</span>
                    <span>Configure your agent's behavior and criteria</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-icons text-primary-600 text-sm mr-2 mt-0.5">check</span>
                    <span>Set up one-time run, custom schedule, or integration</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-icons text-primary-600 text-sm mr-2 mt-0.5">check</span>
                    <span>Start evaluating with your dedicated AI agent</span>
                  </li>
                </ul>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setSelectedAgent(null)}
                  className="flex-1 glass-btn-secondary rounded-xl py-3 font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmHiring}
                  className="flex-1 glass-btn-primary rounded-xl py-3 font-semibold glow"
                >
                  Hire Agent - ${selectedAgent.price}/month
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  )
}

export default AgentMarketplacePage
