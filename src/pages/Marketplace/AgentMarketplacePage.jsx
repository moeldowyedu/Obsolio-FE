import { useState } from 'react'
import MainLayout from '../../components/layout/MainLayout'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useLanguage } from '../../contexts/LanguageContext'
import { translations } from '../../translations'

const AgentMarketplacePage = () => {
  const navigate = useNavigate()
  const { language } = useLanguage()
  const t = translations[language]
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [selectedAgent, setSelectedAgent] = useState(null)

  const agents = [
    // Technology Category
    {
      id: 'code-judge',
      name: 'Precision Code Analyzer',
      category: 'Technology',
      icon: 'code',
      description: 'Advanced source code evaluation with security scanning, performance profiling, and architecture pattern recognition across 50+ programming languages',
      price: 99,
      features: ['Multi-Language Support', 'Security Vulnerability Detection', 'Performance Bottleneck Analysis', 'Code Smell Detection', 'Test Coverage Review', 'Documentation Quality Score'],
      rating: 4.9,
      reviews: 127,
      evaluations: 3245,
      color: 'blue',
      popular: true
    },
    {
      id: 'api-judge',
      name: 'API Design Validator',
      category: 'Technology',
      icon: 'api',
      description: 'Evaluates REST/GraphQL APIs for design consistency, security standards, performance optimization, and OpenAPI/Swagger specification compliance',
      price: 109,
      features: ['RESTful Best Practices', 'GraphQL Schema Analysis', 'Rate Limiting Review', 'Authentication & Authorization', 'API Documentation Quality', 'Versioning Strategy'],
      rating: 4.8,
      reviews: 94,
      evaluations: 2187,
      color: 'cyan',
      popular: false
    },
    {
      id: 'database-judge',
      name: 'Database Schema Optimizer',
      category: 'Technology',
      icon: 'storage',
      description: 'Analyzes database schemas, query performance, indexing strategies, and data normalization for SQL/NoSQL databases with optimization recommendations',
      price: 119,
      features: ['Schema Design Review', 'Query Performance Analysis', 'Index Optimization', 'Data Normalization', 'Scalability Assessment', 'Migration Path Planning'],
      rating: 4.9,
      reviews: 76,
      evaluations: 1654,
      color: 'teal',
      popular: false
    },

    // Cybersecurity Category
    {
      id: 'security-audit-judge',
      name: 'Security Audit Specialist',
      category: 'Cybersecurity',
      icon: 'security',
      description: 'Comprehensive security posture assessment including penetration testing results, vulnerability scans, security policies, and compliance with OWASP/NIST standards',
      price: 159,
      features: ['Penetration Test Analysis', 'Vulnerability Assessment', 'Security Policy Review', 'OWASP Top 10 Compliance', 'Threat Modeling', 'Incident Response Planning'],
      rating: 5.0,
      reviews: 112,
      evaluations: 2891,
      color: 'red',
      popular: true
    },
    {
      id: 'threat-intelligence-judge',
      name: 'Threat Intelligence Analyzer',
      category: 'Cybersecurity',
      icon: 'shield',
      description: 'Evaluates threat reports, analyzes attack patterns, assesses security incidents, and provides risk scoring with actionable mitigation strategies',
      price: 149,
      features: ['Threat Report Analysis', 'Attack Pattern Recognition', 'Risk Scoring & Prioritization', 'IOC Validation', 'Security Incident Review', 'Mitigation Recommendations'],
      rating: 4.9,
      reviews: 88,
      evaluations: 2034,
      color: 'rose',
      popular: false
    },

    // Data Science Category
    {
      id: 'data-quality-judge',
      name: 'Data Quality Validator',
      category: 'Data Science',
      icon: 'data_object',
      description: 'Precision data quality assessment with anomaly detection, schema validation, completeness checks, and data lineage verification for enterprise datasets',
      price: 129,
      features: ['Data Integrity Validation', 'Schema Compliance Check', 'Anomaly Detection', 'Completeness Analysis', 'Data Lineage Tracking', 'Quality Metrics Dashboard'],
      rating: 4.8,
      reviews: 103,
      evaluations: 2456,
      color: 'emerald',
      popular: true
    },
    {
      id: 'ml-model-judge',
      name: 'ML Model Evaluator',
      category: 'Data Science',
      icon: 'psychology',
      description: 'Expert evaluation of machine learning models including performance metrics, bias detection, fairness analysis, model explainability, and production readiness',
      price: 139,
      features: ['Model Performance Metrics', 'Bias & Fairness Detection', 'Explainability Analysis', 'Feature Importance Review', 'Overfitting Detection', 'Production Readiness Score'],
      rating: 4.9,
      reviews: 97,
      evaluations: 2234,
      color: 'violet',
      popular: true
    },

    // Finance Category
    {
      id: 'financial-audit-judge',
      name: 'Financial Audit Analyzer',
      category: 'Finance',
      icon: 'account_balance',
      description: 'Professional-grade financial statement analysis, fraud detection, GAAP/IFRS compliance verification, and tax optimization recommendations',
      price: 179,
      features: ['Financial Statement Analysis', 'Fraud Pattern Detection', 'GAAP/IFRS Compliance', 'Tax Compliance Review', 'Internal Controls Assessment', 'Audit Trail Verification'],
      rating: 4.9,
      reviews: 134,
      evaluations: 3567,
      color: 'amber',
      popular: true
    },
    {
      id: 'investment-judge',
      name: 'Investment Portfolio Reviewer',
      category: 'Finance',
      icon: 'trending_up',
      description: 'Sophisticated portfolio analysis with risk assessment, diversification scoring, performance benchmarking, and strategy optimization for investment portfolios',
      price: 149,
      features: ['Portfolio Diversification Analysis', 'Risk-Adjusted Returns', 'Benchmark Comparison', 'Asset Allocation Review', 'Rebalancing Recommendations', 'ESG Compliance Check'],
      rating: 4.8,
      reviews: 89,
      evaluations: 1987,
      color: 'lime',
      popular: false
    },

    // Marketing Category
    {
      id: 'marketing-campaign-judge',
      name: 'Marketing Campaign Analyzer',
      category: 'Marketing',
      icon: 'campaign',
      description: 'Data-driven marketing campaign evaluation with ROI analysis, content effectiveness scoring, audience targeting precision, and conversion optimization insights',
      price: 99,
      features: ['ROI & ROAS Analysis', 'Content Effectiveness Score', 'Audience Targeting Review', 'A/B Test Validation', 'Conversion Funnel Analysis', 'Multi-Channel Attribution'],
      rating: 4.7,
      reviews: 145,
      evaluations: 4123,
      color: 'fuchsia',
      popular: true
    },
    {
      id: 'sales-pitch-judge',
      name: 'Sales Pitch Evaluator',
      category: 'Marketing',
      icon: 'sell',
      description: 'Analyzes sales presentations, pitch decks, and proposals for persuasiveness, value proposition clarity, objection handling, and conversion probability',
      price: 89,
      features: ['Value Proposition Analysis', 'Persuasion Techniques Review', 'Objection Handling Assessment', 'Visual Design Quality', 'Data Storytelling Score', 'Competitive Differentiation'],
      rating: 4.8,
      reviews: 118,
      evaluations: 2876,
      color: 'orange',
      popular: false
    },

    // HR/Recruitment Category
    {
      id: 'resume-screening-judge',
      name: 'Resume Screening Agent',
      category: 'HR & Recruitment',
      icon: 'badge',
      description: 'AI-powered resume evaluation with skills matching, experience verification, bias-free screening, and candidate ranking based on job requirements',
      price: 79,
      features: ['Skills Matching Algorithm', 'Experience Validation', 'Bias-Free Screening', 'Education Verification', 'Career Progression Analysis', 'Cultural Fit Indicators'],
      rating: 4.7,
      reviews: 156,
      evaluations: 5234,
      color: 'sky',
      popular: true
    },
    {
      id: 'interview-judge',
      name: 'Interview Assessment Analyzer',
      category: 'HR & Recruitment',
      icon: 'record_voice_over',
      description: 'Evaluates interview transcripts and recordings for candidate competencies, behavioral indicators, communication skills, and hiring recommendation scoring',
      price: 99,
      features: ['Competency-Based Assessment', 'Behavioral Analysis', 'Communication Skills Score', 'Technical Knowledge Validation', 'Cultural Alignment', 'Hiring Risk Assessment'],
      rating: 4.8,
      reviews: 92,
      evaluations: 2145,
      color: 'indigo',
      popular: false
    },

    // Education Category
    {
      id: 'essay-judge',
      name: 'Precision Writing Analyzer',
      category: 'Education',
      icon: 'edit',
      description: 'Advanced essay and academic writing evaluation with grammar analysis, argument structure assessment, plagiarism detection, and citation validation across multiple formats',
      price: 79,
      features: ['Grammar & Style Analysis', 'Argument Structure Review', 'Advanced Plagiarism Detection', 'Citation Format Validation', 'Readability Scoring', 'Tone & Voice Assessment'],
      rating: 4.8,
      reviews: 98,
      evaluations: 2156,
      color: 'green',
      popular: false
    },
    {
      id: 'curriculum-judge',
      name: 'Curriculum Design Evaluator',
      category: 'Education',
      icon: 'school',
      description: 'Comprehensive curriculum and course design analysis including learning objectives alignment, assessment quality, pedagogical effectiveness, and accessibility compliance',
      price: 109,
      features: ['Learning Objectives Alignment', 'Bloom\'s Taxonomy Mapping', 'Assessment Quality Review', 'Pedagogical Approach Analysis', 'Accessibility Compliance', 'Engagement Metrics'],
      rating: 4.9,
      reviews: 67,
      evaluations: 1567,
      color: 'emerald',
      popular: false
    },

    // Legal Category
    {
      id: 'legal-judge',
      name: 'Legal Document Reviewer',
      category: 'Legal',
      icon: 'gavel',
      description: 'Expert legal document analysis covering contracts, NDAs, compliance documents with clause-level risk assessment, precedent analysis, and jurisdiction-specific validation',
      price: 149,
      features: ['Contract Clause Analysis', 'Legal Risk Assessment', 'Compliance Verification', 'Precedent Cross-Reference', 'Jurisdiction Validation', 'Liability Exposure Review'],
      rating: 4.9,
      reviews: 65,
      evaluations: 1532,
      color: 'purple',
      popular: false
    },
    {
      id: 'compliance-judge',
      name: 'Regulatory Compliance Auditor',
      category: 'Legal',
      icon: 'policy',
      description: 'Multi-jurisdiction regulatory compliance assessment for GDPR, SOC 2, HIPAA, and industry-specific regulations with gap analysis and remediation roadmaps',
      price: 169,
      features: ['GDPR Compliance Check', 'SOC 2 Audit Readiness', 'HIPAA Validation', 'Industry Standards Review', 'Gap Analysis Report', 'Remediation Roadmap'],
      rating: 5.0,
      reviews: 81,
      evaluations: 1876,
      color: 'violet',
      popular: true
    },

    // Healthcare Category
    {
      id: 'medical-judge',
      name: 'Medical Case Reviewer',
      category: 'Healthcare',
      icon: 'local_hospital',
      description: 'Clinical documentation review with evidence-based medicine validation, treatment protocol compliance, diagnostic accuracy assessment, and patient safety checks',
      price: 129,
      features: ['Clinical Accuracy Validation', 'Evidence-Based Medicine Check', 'Treatment Protocol Compliance', 'Diagnostic Code Accuracy', 'Patient Safety Review', 'Medical Record Completeness'],
      rating: 4.9,
      reviews: 54,
      evaluations: 1234,
      color: 'teal',
      popular: false
    },
    {
      id: 'clinical-trial-judge',
      name: 'Clinical Trial Protocol Evaluator',
      category: 'Healthcare',
      icon: 'biotech',
      description: 'Rigorous clinical trial protocol assessment including methodology validation, ethical compliance, statistical power analysis, and regulatory submission readiness',
      price: 199,
      features: ['Protocol Design Review', 'Statistical Power Analysis', 'Ethical Compliance Check', 'Regulatory Readiness', 'Patient Safety Assessment', 'Data Collection Validation'],
      rating: 4.9,
      reviews: 43,
      evaluations: 987,
      color: 'cyan',
      popular: false
    },

    // Creative Category
    {
      id: 'design-judge',
      name: 'Precision Design Analyzer',
      category: 'Creative',
      icon: 'palette',
      description: 'Professional design critique with aesthetic analysis, technical execution review, brand alignment assessment, accessibility validation, and market positioning insights',
      price: 79,
      features: ['Aesthetic Quality Assessment', 'Technical Execution Review', 'Brand Alignment Check', 'Accessibility Standards', 'User Experience Analysis', 'Market Positioning Score'],
      rating: 4.8,
      reviews: 91,
      evaluations: 2089,
      color: 'pink',
      popular: false
    },
    {
      id: 'ux-judge',
      name: 'UX/UI Experience Evaluator',
      category: 'Creative',
      icon: 'web',
      description: 'Comprehensive UX/UI evaluation with usability testing analysis, interaction design review, accessibility compliance, and conversion optimization recommendations',
      price: 109,
      features: ['Usability Testing Analysis', 'Interaction Design Review', 'WCAG Accessibility Compliance', 'Information Architecture', 'Conversion Rate Optimization', 'Mobile Responsiveness'],
      rating: 4.9,
      reviews: 124,
      evaluations: 3012,
      color: 'fuchsia',
      popular: true
    },

    // Business Category
    {
      id: 'business-judge',
      name: 'Business Plan Evaluator',
      category: 'Business',
      icon: 'business_center',
      description: 'Strategic business plan analysis with financial modeling validation, market opportunity assessment, competitive analysis, and investor readiness scoring',
      price: 119,
      features: ['Financial Projections Analysis', 'Market Opportunity Assessment', 'Competitive Landscape Review', 'SWOT Analysis', 'Business Model Validation', 'Investor Readiness Score'],
      rating: 4.8,
      reviews: 73,
      evaluations: 1678,
      color: 'orange',
      popular: false
    },
    {
      id: 'supply-chain-judge',
      name: 'Supply Chain Risk Analyzer',
      category: 'Business',
      icon: 'local_shipping',
      description: 'End-to-end supply chain evaluation with vendor assessment, logistics optimization, risk exposure analysis, and cost reduction opportunity identification',
      price: 139,
      features: ['Vendor Risk Assessment', 'Logistics Optimization', 'Cost Analysis & Reduction', 'Inventory Management Review', 'Risk Exposure Mapping', 'Sustainability Metrics'],
      rating: 4.7,
      reviews: 58,
      evaluations: 1345,
      color: 'slate',
      popular: false
    },

    // Academic Category
    {
      id: 'research-judge',
      name: 'Precision Research Analyzer',
      category: 'Academic',
      icon: 'science',
      description: 'Scholarly research evaluation including methodology rigor, statistical analysis validation, literature review completeness, ethical compliance, and publication readiness',
      price: 109,
      features: ['Methodology Rigor Assessment', 'Statistical Validity Check', 'Literature Review Completeness', 'Ethics Compliance Review', 'Reproducibility Analysis', 'Publication Readiness Score'],
      rating: 4.9,
      reviews: 88,
      evaluations: 1945,
      color: 'indigo',
      popular: false
    },
    {
      id: 'grant-proposal-judge',
      name: 'Grant Proposal Evaluator',
      category: 'Academic',
      icon: 'request_quote',
      description: 'Research grant proposal assessment with impact evaluation, budget justification analysis, innovation scoring, and funding probability prediction',
      price: 129,
      features: ['Impact Assessment', 'Budget Justification Review', 'Innovation Score', 'Feasibility Analysis', 'Preliminary Data Validation', 'Funding Probability Prediction'],
      rating: 4.8,
      reviews: 72,
      evaluations: 1456,
      color: 'blue',
      popular: false
    },

    // Communications Category
    {
      id: 'video-judge',
      name: 'Precision Video Analyzer',
      category: 'Communications',
      icon: 'videocam',
      description: 'Multi-dimensional video content evaluation including speech analysis, body language assessment, visual production quality, narrative structure, and audience engagement prediction',
      price: 89,
      features: ['Speech Clarity & Pace Analysis', 'Body Language Assessment', 'Visual Production Quality', 'Narrative Structure Review', 'Engagement Prediction', 'Brand Message Alignment'],
      rating: 4.7,
      reviews: 82,
      evaluations: 1876,
      color: 'red',
      popular: false
    },
    {
      id: 'content-strategy-judge',
      name: 'Content Strategy Evaluator',
      category: 'Communications',
      icon: 'article',
      description: 'Strategic content evaluation with SEO optimization analysis, audience alignment scoring, multi-channel performance assessment, and content gap identification',
      price: 99,
      features: ['SEO Optimization Analysis', 'Audience Alignment Score', 'Multi-Channel Performance', 'Content Gap Analysis', 'Engagement Metrics Review', 'Conversion Path Optimization'],
      rating: 4.8,
      reviews: 107,
      evaluations: 2567,
      color: 'amber',
      popular: false
    },

    // Manufacturing/Quality Category
    {
      id: 'quality-control-judge',
      name: 'Quality Control Inspector',
      category: 'Manufacturing',
      icon: 'verified',
      description: 'Precision quality assurance evaluation with defect detection, ISO compliance verification, process capability analysis, and Six Sigma methodology assessment',
      price: 119,
      features: ['Defect Detection & Classification', 'ISO 9001 Compliance', 'Process Capability Analysis', 'Six Sigma Metrics', 'Root Cause Analysis', 'Quality Cost Assessment'],
      rating: 4.9,
      reviews: 64,
      evaluations: 1543,
      color: 'green',
      popular: false
    },
    {
      id: 'product-safety-judge',
      name: 'Product Safety Validator',
      category: 'Manufacturing',
      icon: 'health_and_safety',
      description: 'Comprehensive product safety assessment including regulatory compliance, hazard analysis, testing protocol validation, and certification readiness evaluation',
      price: 149,
      features: ['Hazard Analysis (FMEA)', 'Regulatory Compliance Check', 'Testing Protocol Validation', 'Certification Readiness', 'Material Safety Assessment', 'Recall Risk Analysis'],
      rating: 4.9,
      reviews: 51,
      evaluations: 1189,
      color: 'yellow',
      popular: false
    },

    // Customer Service Category
    {
      id: 'customer-support-judge',
      name: 'Customer Support Quality Analyzer',
      category: 'Customer Service',
      icon: 'support_agent',
      description: 'Customer interaction quality assessment with sentiment analysis, resolution effectiveness, response time evaluation, and satisfaction prediction scoring',
      price: 89,
      features: ['Sentiment Analysis', 'Resolution Effectiveness', 'Response Time Metrics', 'Empathy & Professionalism', 'CSAT Prediction', 'Knowledge Base Accuracy'],
      rating: 4.7,
      reviews: 132,
      evaluations: 3876,
      color: 'teal',
      popular: false
    },
  ]

  const categories = [
    'all',
    'Technology',
    'Cybersecurity',
    'Data Science',
    'Finance',
    'Marketing',
    'HR & Recruitment',
    'Education',
    'Legal',
    'Healthcare',
    'Creative',
    'Business',
    'Academic',
    'Communications',
    'Manufacturing',
    'Customer Service'
  ]

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === 'all' || agent.category === filterCategory
    return matchesSearch && matchesCategory
  })

  // Sort to show popular agents first
  const sortedAgents = [...filteredAgents].sort((a, b) => {
    if (a.popular && !b.popular) return -1
    if (!a.popular && b.popular) return 1
    return 0
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
          <h1 className="text-5xl font-bold text-gray-900 mb-4 font-heading">{t.agentMarketplaceTitle}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.agentMarketplaceDesc}
          </p>
          <div className="mt-6 flex items-center justify-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center">
              <span className="material-icons text-primary-600 mr-2">verified</span>
              <span><strong>{agents.length}</strong> Precision AI Agents</span>
            </div>
            <div className="flex items-center">
              <span className="material-icons text-primary-600 mr-2">category</span>
              <span><strong>{categories.length - 1}</strong> Categories</span>
            </div>
            <div className="flex items-center">
              <span className="material-icons text-primary-600 mr-2">trending_up</span>
              <span><strong>50,000+</strong> Evaluations Completed</span>
            </div>
          </div>
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
                    placeholder={t.searchAgentPlaceholder}
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
                    {cat === 'all' ? t.allCategoriesOption : cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="max-w-7xl mx-auto mb-6">
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              Showing <strong>{sortedAgents.length}</strong> agent{sortedAgents.length !== 1 ? 's' : ''}
              {filterCategory !== 'all' && <> in <strong>{filterCategory}</strong></>}
            </p>
            <div className="flex items-center text-sm text-gray-600">
              <span className="material-icons text-yellow-500 text-sm mr-1">star</span>
              <span>Popular agents shown first</span>
            </div>
          </div>
        </div>

        {/* Agent Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedAgents.map((agent) => (
              <div
                key={agent.id}
                className="glass-card rounded-3xl p-6 hover:shadow-2xl transition-all cursor-pointer group relative"
                onClick={() => handleHireAgent(agent)}
              >
                {agent.popular && (
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center">
                    <span className="material-icons text-xs mr-1">star</span>
                    Popular
                  </div>
                )}

                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 rounded-2xl bg-${agent.color}-100 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <span className={`material-icons text-3xl text-${agent.color}-600`}>{agent.icon}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">${agent.price}</div>
                    <div className="text-xs text-gray-600">{t.perMonthLabel}</div>
                  </div>
                </div>

                <div className="mb-2">
                  <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-lg bg-${agent.color}-50 text-${agent.color}-700`}>
                    {agent.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{agent.name}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{agent.description}</p>

                {/* Rating */}
                <div className="flex items-center mb-4 pb-4 border-b border-gray-200">
                  <div className="flex items-center">
                    <span className="material-icons text-yellow-500 text-sm">star</span>
                    <span className="font-semibold text-gray-900 ml-1">{agent.rating}</span>
                    <span className="text-gray-600 text-sm ml-1">({agent.reviews})</span>
                  </div>
                  <div className="ml-auto text-xs text-gray-600">
                    {agent.evaluations.toLocaleString()} {t.evaluationsLabel}
                  </div>
                </div>

                {/* Features - show first 4 */}
                <ul className="space-y-2 mb-6">
                  {agent.features.slice(0, 4).map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-700">
                      <span className={`material-icons text-${agent.color}-600 text-xs mr-2`}>check_circle</span>
                      <span className="truncate">{feature}</span>
                    </li>
                  ))}
                  {agent.features.length > 4 && (
                    <li className="text-xs text-gray-500 ml-5">
                      +{agent.features.length - 4} more features
                    </li>
                  )}
                </ul>

                {/* Hire Button */}
                <button className="w-full glass-btn-primary rounded-xl py-3 font-semibold group-hover:shadow-lg transition-all">
                  {t.hireAgentButton}
                </button>
              </div>
            ))}
          </div>

          {sortedAgents.length === 0 && (
            <div className="text-center py-20">
              <span className="material-icons text-gray-300 text-6xl mb-4">search_off</span>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No agents found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          )}
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

              {selectedAgent.popular && (
                <div className="mb-4 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-xl flex items-center">
                  <span className="material-icons text-yellow-600 mr-2">star</span>
                  <span className="text-sm font-semibold text-gray-900">Popular Choice - Trusted by hundreds of organizations</span>
                </div>
              )}

              <p className="text-gray-700 mb-6">{selectedAgent.description}</p>

              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{t.keyFeaturesTitle}</h3>
                <div className="grid grid-cols-1 gap-3">
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
                  <div className="text-sm text-gray-600 mb-1">{t.ratingLabel}</div>
                  <div className="flex items-center">
                    <span className="material-icons text-yellow-500">star</span>
                    <span className="font-bold text-gray-900 ml-1">{selectedAgent.rating}/5</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">{t.reviewsLabel}</div>
                  <div className="font-bold text-gray-900">{selectedAgent.reviews}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">{t.evaluationsLabel2}</div>
                  <div className="font-bold text-gray-900">{selectedAgent.evaluations.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">{t.priceLabel}</div>
                  <div className="font-bold text-gray-900">${selectedAgent.price}{t.perMonthLabel}</div>
                </div>
              </div>

              <div className="bg-primary-50 border-2 border-primary-200 rounded-2xl p-6 mb-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{t.whatHappensNextTitle}</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start">
                    <span className="material-icons text-primary-600 text-sm mr-2 mt-0.5">check</span>
                    <span>{t.step1ConfigureAgent}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-icons text-primary-600 text-sm mr-2 mt-0.5">check</span>
                    <span>{t.step2SetupMode}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="material-icons text-primary-600 text-sm mr-2 mt-0.5">check</span>
                    <span>{t.step3StartEvaluating}</span>
                  </li>
                </ul>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setSelectedAgent(null)}
                  className="flex-1 glass-btn-secondary rounded-xl py-3 font-semibold"
                >
                  {t.cancelButton}
                </button>
                <button
                  onClick={confirmHiring}
                  className="flex-1 glass-btn-primary rounded-xl py-3 font-semibold glow"
                >
                  {t.hireAgentWithPrice}{selectedAgent.price}{t.perMonthLabel}
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
