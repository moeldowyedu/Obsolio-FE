import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import { useTheme } from '../../contexts/ThemeContext';
import {
  Star,
  Download,
  Users,
  Shield,
  Zap,
  CheckCircle,
  Clock,
  TrendingUp,
  Award,
  MessageCircle,
  Share2,
  Heart,
  ChevronRight
} from 'lucide-react';

const AgentDetailPage = () => {
  const { agentId } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [agent, setAgent] = useState(null);
  const [selectedTab, setSelectedTab] = useState('overview');

  useEffect(() => {
    // Mock agent data - in production, fetch from API
    const mockAgent = {
      id: agentId,
      name: 'Customer Support Pro',
      icon: '💬',
      description: 'AI-powered customer support with multi-channel integration, sentiment analysis, and automated ticketing',
      longDescription: 'Transform your customer support operations with our advanced AI-powered agent. Customer Support Pro seamlessly integrates with your existing channels, providing 24/7 automated support while maintaining a human touch. Built on state-of-the-art natural language processing, it understands context, sentiment, and intent to deliver accurate, empathetic responses.',
      category: 'Support',
      industry: 'Technology',
      pricing: 99,
      pricingLabel: '$99/mo',
      rating: 4.8,
      reviews: 342,
      deployments: 1250,
      owner: 'Obsolio AI',
      tags: ['chatbot', 'support', 'automation', '24/7', 'multi-channel', 'sentiment-analysis'],
      features: [
        {
          title: 'Multi-channel Support',
          description: 'Seamlessly handle inquiries across email, chat, social media, and phone',
          icon: <MessageCircle className="w-5 h-5" />
        },
        {
          title: 'Sentiment Analysis',
          description: 'Automatically detect urgency and emotion to prioritize critical issues',
          icon: <Heart className="w-5 h-5" />
        },
        {
          title: 'Smart Routing',
          description: 'Intelligent ticket assignment based on issue type and difficulty',
          icon: <TrendingUp className="w-5 h-5" />
        },
        {
          title: 'Knowledge Base',
          description: 'Auto-learns from resolved tickets to improve future responses',
          icon: <Zap className="w-5 h-5" />
        }
      ],
      techStack: [
        { name: 'Python', category: 'Language', icon: '🐍' },
        { name: 'TensorFlow', category: 'ML Framework', icon: '🧠' },
        { name: 'React', category: 'Frontend', icon: '⚛️' },
        { name: 'PostgreSQL', category: 'Database', icon: '🐘' },
        { name: 'Redis', category: 'Caching', icon: '📦' },
        { name: 'Docker', category: 'Container', icon: '🐳' }
      ],
      useCases: [
        'Automated FAQ responses',
        'Order status tracking',
        'Refund processing',
        'Technical troubleshooting',
        'Appointment scheduling'
      ],
      reviewsList: [
        {
          id: 1,
          author: 'Sarah Johnson',
          company: 'TechCorp',
          role: 'Customer Success Manager',
          rating: 5,
          date: '2024-01-15',
          title: 'Transformed our support workflow',
          content: 'We\'ve reduced response times by 70% and customer satisfaction has increased significantly. The sentiment analysis feature is incredibly accurate and helps us prioritize urgent issues.',
          helpful: 45,
          verified: true
        },
        {
          id: 2,
          author: 'Michael Chen',
          company: 'RetailHub Inc',
          role: 'Operations Director',
          rating: 5,
          date: '2024-01-10',
          title: 'Excellent ROI and easy integration',
          content: 'Setup was straightforward, and we saw immediate value. The multi-channel support works flawlessly across our email, chat, and social media platforms. Highly recommended!',
          helpful: 38,
          verified: true
        },
        {
          id: 3,
          author: 'Emily Rodriguez',
          company: 'HealthTech Innovations',
          role: 'CTO',
          rating: 4,
          date: '2024-01-05',
          title: 'Powerful but needs customization',
          content: 'The agent is very capable out of the box, but we needed some customization for our healthcare-specific use cases. Support team was helpful in getting us set up. Four stars because of the initial configuration complexity.',
          helpful: 22,
          verified: true
        },
        {
          id: 4,
          author: 'David Kim',
          company: 'StartupXYZ',
          role: 'CEO',
          rating: 5,
          date: '2023-12-28',
          title: 'Perfect for startups',
          content: 'As a growing startup, we couldn\'t afford a large support team. This agent handles 80% of our inquiries automatically, allowing our team to focus on complex issues. Best investment we\'ve made!',
          helpful: 56,
          verified: true
        }
      ],
      stats: {
        avgResponseTime: '< 2 seconds',
        successRate: '94%',
        uptime: '99.9%',
        languages: '25+'
      },
      changelog: [
        { version: '2.1.0', date: '2024-01-20', changes: ['Added voice call support', 'Improved sentiment detection accuracy', 'New dashboard analytics'] },
        { version: '2.0.0', date: '2023-12-15', changes: ['Major UI overhaul', 'Multi-language support', 'Custom branding options'] },
        { version: '1.5.0', date: '2023-11-01', changes: ['WhatsApp integration', 'Enhanced knowledge base search', 'Bug fixes'] }
      ]
    };

    setAgent(mockAgent);
  }, [agentId]);

  const renderStars = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < Math.floor(rating)
              ? 'fill-yellow-400 text-yellow-400'
              : 'text-gray-300'
              }`}
          />
        ))}
      </div>
    );
  };

  const handleDeploy = () => {
    navigate(`/agentx/marketplace/checkout/${agentId}`);
  };

  if (!agent) {
    return (
      <MainLayout theme={theme}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </MainLayout>
    );
  }

  // Theme Helpers
  const textPrimary = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const textSecondary = theme === 'dark' ? 'text-gray-400' : 'text-slate-500';
  const cardClass = theme === 'dark'
    ? 'glass-card border-white/10'
    : 'bg-white border border-slate-200 shadow-sm';
  const bgSubtle = theme === 'dark' ? 'bg-white/5' : 'bg-slate-50';

  return (
    <MainLayout theme={theme}>
      <div className="py-6 space-y-6 mt-28 lg:mt-[120px] max-w-7xl mx-auto px-6">
        {/* Breadcrumb */}
        <div className={`flex items-center gap-2 text-sm ${textSecondary}`}>
          <button onClick={() => navigate('/agentx/marketplace')} className="hover:text-primary-600">
            Marketplace
          </button>
          <ChevronRight className="w-4 h-4" />
          <span className={`${theme === 'dark' ? 'text-white' : 'text-slate-900'} font-medium`}>{agent.name}</span>
        </div>

        {/* Hero Section */}
        <div className={`${cardClass} rounded-2xl p-8`}>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left: Agent Info */}
            <div className="flex-1">
              <div className="flex items-start gap-6 mb-6">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-5xl flex-shrink-0 text-white shadow-lg">
                  {agent.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className={`text-4xl font-bold ${textPrimary}`}>{agent.name}</h1>
                    {agent.owner === 'Obsolio AI' && (
                      <div className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-bold rounded-lg uppercase">
                        Official
                      </div>
                    )}
                  </div>
                  <p className={`${textSecondary} mb-3`}>
                    by <span className="font-semibold text-primary-600">{agent.owner}</span>
                  </p>
                  <div className="flex items-center gap-6 mb-4">
                    <div className="flex items-center gap-2">
                      {renderStars(agent.rating)}
                      <span className={`text-lg font-bold ${textPrimary}`}>{agent.rating}</span>
                      <span className={textSecondary}>({agent.reviews} reviews)</span>
                    </div>
                    <div className={`flex items-center gap-2 ${textSecondary}`}>
                      <Download className="w-5 h-5" />
                      <span className="font-semibold">{agent.deployments.toLocaleString()}</span>
                      <span>deployments</span>
                    </div>
                  </div>
                  <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-slate-600'}`}>
                    {agent.description}
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {agent.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className={`px-4 py-2 text-sm rounded-lg font-medium ${theme === 'dark' ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-700'}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button className={`p-3 border-2 rounded-xl transition-colors ${theme === 'dark' ? 'border-white/10 hover:bg-white/5' : 'border-gray-200 hover:bg-gray-50'}`}>
                  <Heart className={`w-5 h-5 ${textSecondary}`} />
                </button>
                <button className={`p-3 border-2 rounded-xl transition-colors ${theme === 'dark' ? 'border-white/10 hover:bg-white/5' : 'border-gray-200 hover:bg-gray-50'}`}>
                  <Share2 className={`w-5 h-5 ${textSecondary}`} />
                </button>
              </div>
            </div>

            {/* Right: Pricing Card */}
            <div className="lg:w-96">
              <div className={`rounded-2xl p-6 border-2 ${theme === 'dark' ? 'bg-white/5 border-primary-500/20' : 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200'}`}>
                <div className="text-center mb-6">
                  <div className={`text-5xl font-bold mb-2 ${textPrimary}`}>{agent.pricingLabel}</div>
                  <div className={textSecondary}>per month</div>
                </div>

                <button
                  onClick={handleDeploy}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-shadow mb-3"
                >
                  Deploy Now
                </button>
                <button className={`w-full py-3 border-2 rounded-xl font-semibold transition-colors ${theme === 'dark' ? 'border-white/20 text-white hover:bg-white/10' : 'border-gray-300 text-slate-700 hover:bg-white'}`}>
                  Try Demo
                </button>

                <div className={`mt-6 pt-6 border-t space-y-3 ${theme === 'dark' ? 'border-white/10' : 'border-gray-200'}`}>
                  <div className="flex items-center justify-between text-sm">
                    <span className={textSecondary}>Response Time</span>
                    <span className={`font-semibold ${textPrimary}`}>{agent.stats.avgResponseTime}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className={textSecondary}>Success Rate</span>
                    <span className="font-semibold text-green-600">{agent.stats.successRate}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className={textSecondary}>Uptime</span>
                    <span className={`font-semibold ${textPrimary}`}>{agent.stats.uptime}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className={textSecondary}>Languages</span>
                    <span className={`font-semibold ${textPrimary}`}>{agent.stats.languages}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className={`border-b ${theme === 'dark' ? 'border-white/10' : 'border-gray-200'}`}>
          <div className="flex gap-6">
            {['overview', 'features', 'tech-stack', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`pb-4 px-2 font-semibold capitalize transition-colors ${selectedTab === tab
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : `${textSecondary} hover:${textPrimary}`
                  }`}
              >
                {tab.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {selectedTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className={`${cardClass} rounded-2xl p-6`}>
                <h2 className={`text-2xl font-bold ${textPrimary} mb-4`}>About This Agent</h2>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-slate-600'} leading-relaxed mb-6`}>{agent.longDescription}</p>

                <h3 className={`text-xl font-bold ${textPrimary} mb-3`}>Use Cases</h3>
                <ul className="space-y-2">
                  {agent.useCases.map((useCase, idx) => (
                    <li key={idx} className={`flex items-center gap-3 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-600'}`}>
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      {useCase}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className={`${cardClass} rounded-2xl p-6`}>
                <h3 className={`text-lg font-bold ${textPrimary} mb-4`}>Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className={`text-2xl font-bold ${textPrimary}`}>{agent.deployments.toLocaleString()}</div>
                      <div className={`text-sm ${textSecondary}`}>Active Deployments</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
                      <Star className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <div className={`text-2xl font-bold ${textPrimary}`}>{agent.rating}/5</div>
                      <div className={`text-sm ${textSecondary}`}>{agent.reviews} Reviews</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                      <Award className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className={`text-2xl font-bold ${textPrimary}`}>{agent.stats.successRate}</div>
                      <div className={`text-sm ${textSecondary}`}>Success Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'features' && (
          <div className={`${cardClass} rounded-2xl p-6`}>
            <h2 className={`text-2xl font-bold ${textPrimary} mb-6`}>Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {agent.features.map((feature, idx) => (
                <div key={idx} className={`flex gap-4 p-4 rounded-xl ${bgSubtle}`}>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold ${textPrimary} mb-1`}>{feature.title}</h3>
                    <p className={textSecondary}>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'tech-stack' && (
          <div className={`${cardClass} rounded-2xl p-6`}>
            <h2 className={`text-2xl font-bold ${textPrimary} mb-6`}>Technology Stack</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {agent.techStack.map((tech, idx) => (
                <div key={idx} className={`flex items-center gap-4 p-4 rounded-xl ${bgSubtle}`}>
                  <div className="text-3xl">{tech.icon}</div>
                  <div>
                    <div className={`font-bold ${textPrimary}`}>{tech.name}</div>
                    <div className={`text-sm ${textSecondary}`}>{tech.category}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'reviews' && (
          <div className="space-y-6">
            {/* Reviews Summary */}
            <div className={`${cardClass} rounded-2xl p-6`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="text-center">
                  <div className={`text-6xl font-bold ${textPrimary} mb-2`}>{agent.rating}</div>
                  <div className="flex justify-center mb-2">{renderStars(agent.rating)}</div>
                  <div className={textSecondary}>Based on {agent.reviews} reviews</div>
                </div>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = agent.reviewsList.filter((r) => Math.floor(r.rating) === star).length;
                    const percentage = (count / agent.reviewsList.length) * 100;
                    return (
                      <div key={star} className="flex items-center gap-3">
                        <span className={`text-sm font-medium ${textSecondary} w-8`}>{star} ★</span>
                        <div className={`flex-1 h-2 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-200'}`}>
                          <div
                            className="h-full bg-yellow-400"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className={`text-sm ${textSecondary} w-12`}>{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-4">
              {agent.reviewsList.map((review) => (
                <div key={review.id} className={`${cardClass} rounded-2xl p-6`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                        {review.author.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`font-bold ${textPrimary}`}>{review.author}</span>
                          {review.verified && (
                            <CheckCircle className="w-4 h-4 text-green-500" title="Verified Purchase" />
                          )}
                        </div>
                        <div className={`text-sm ${textSecondary}`}>
                          {review.role} at {review.company}
                        </div>
                      </div>
                    </div>
                    <div className={`text-sm ${textSecondary}`}>{review.date}</div>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    {renderStars(review.rating)}
                    <span className={`font-bold ${textPrimary}`}>{review.rating}.0</span>
                  </div>
                  <h3 className={`font-bold ${textPrimary} mb-2`}>{review.title}</h3>
                  <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-slate-600'}`}>{review.content}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <button className={`${textSecondary} hover:text-primary-600 flex items-center gap-1`}>
                      <span>Helpful ({review.helpful})</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default AgentDetailPage;
