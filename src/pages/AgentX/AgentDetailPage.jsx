import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
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
      owner: 'Aasim AI',
      tags: ['chatbot', 'support', 'automation', '24/7', 'multi-channel', 'sentiment-analysis'],
      features: [
        {
          title: 'Multi-channel Support',
          description: 'Seamlessly handle inquiries across email, chat, social media, and phone',
          icon: <MessageCircle className="w-5 h-5" />
        },
        {
          title: 'Sentiment Analysis',
          description: 'Detect customer emotions and escalate critical issues automatically',
          icon: <TrendingUp className="w-5 h-5" />
        },
        {
          title: 'Auto-routing',
          description: 'Intelligently route complex queries to the right human agent',
          icon: <Zap className="w-5 h-5" />
        },
        {
          title: 'Knowledge Base Integration',
          description: 'Leverage your existing documentation for accurate responses',
          icon: <CheckCircle className="w-5 h-5" />
        },
        {
          title: '24/7 Availability',
          description: 'Provide round-the-clock support without increasing headcount',
          icon: <Clock className="w-5 h-5" />
        },
        {
          title: 'Enterprise Security',
          description: 'SOC 2 compliant with end-to-end encryption',
          icon: <Shield className="w-5 h-5" />
        }
      ],
      techStack: [
        { name: 'GPT-4', category: 'AI Model', icon: '🤖' },
        { name: 'Precision Text Engine', category: 'NLP', icon: '📝' },
        { name: 'Webhooks API', category: 'Integration', icon: '🔗' },
        { name: 'PostgreSQL', category: 'Database', icon: '🗄️' },
        { name: 'Redis', category: 'Caching', icon: '⚡' },
        { name: 'Docker', category: 'Deployment', icon: '🐳' }
      ],
      useCases: [
        'E-commerce customer inquiries',
        'Technical support escalation',
        'Order status and tracking',
        'Returns and refunds processing',
        'Product recommendations',
        'Complaint resolution'
      ],
      reviews: [
        {
          id: 1,
          author: 'Sarah Johnson',
          company: 'TechCorp Solutions',
          role: 'Customer Success Manager',
          rating: 5,
          date: '2024-01-15',
          title: 'Game changer for our support team!',
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
            className={`w-4 h-4 ${
              i < Math.floor(rating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const handleDeploy = () => {
    navigate(`/marketplace/checkout/${agentId}`);
  };

  if (!agent) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="py-6 space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-secondary-600">
          <button onClick={() => navigate('/marketplace')} className="hover:text-primary-600">
            Marketplace
          </button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-secondary-900 font-medium">{agent.name}</span>
        </div>

        {/* Hero Section */}
        <div className="glass-card rounded-2xl p-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left: Agent Info */}
            <div className="flex-1">
              <div className="flex items-start gap-6 mb-6">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-5xl flex-shrink-0">
                  {agent.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-4xl font-bold text-secondary-900">{agent.name}</h1>
                    {agent.owner === 'Aasim AI' && (
                      <div className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-bold rounded-lg uppercase">
                        Official
                      </div>
                    )}
                  </div>
                  <p className="text-secondary-600 mb-3">
                    by <span className="font-semibold text-primary-600">{agent.owner}</span>
                  </p>
                  <div className="flex items-center gap-6 mb-4">
                    <div className="flex items-center gap-2">
                      {renderStars(agent.rating)}
                      <span className="text-lg font-bold text-secondary-900">{agent.rating}</span>
                      <span className="text-secondary-600">({agent.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-2 text-secondary-600">
                      <Download className="w-5 h-5" />
                      <span className="font-semibold">{agent.deployments.toLocaleString()}</span>
                      <span>deployments</span>
                    </div>
                  </div>
                  <p className="text-lg text-secondary-700 leading-relaxed">
                    {agent.description}
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {agent.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-blue-50 text-blue-700 text-sm rounded-lg font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button className="p-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                  <Heart className="w-5 h-5 text-secondary-600" />
                </button>
                <button className="p-3 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                  <Share2 className="w-5 h-5 text-secondary-600" />
                </button>
              </div>
            </div>

            {/* Right: Pricing Card */}
            <div className="lg:w-96">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-200">
                <div className="text-center mb-6">
                  <div className="text-5xl font-bold text-secondary-900 mb-2">{agent.pricingLabel}</div>
                  <div className="text-secondary-600">per month</div>
                </div>

                <button
                  onClick={handleDeploy}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-shadow mb-3"
                >
                  Deploy Now
                </button>
                <button className="w-full py-3 border-2 border-gray-300 rounded-xl font-semibold text-secondary-700 hover:bg-white transition-colors">
                  Try Demo
                </button>

                <div className="mt-6 pt-6 border-t border-gray-300 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-secondary-600">Response Time</span>
                    <span className="font-semibold text-secondary-900">{agent.stats.avgResponseTime}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-secondary-600">Success Rate</span>
                    <span className="font-semibold text-green-600">{agent.stats.successRate}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-secondary-600">Uptime</span>
                    <span className="font-semibold text-secondary-900">{agent.stats.uptime}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-secondary-600">Languages</span>
                    <span className="font-semibold text-secondary-900">{agent.stats.languages}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex gap-6">
            {['overview', 'features', 'tech-stack', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`pb-4 px-2 font-semibold capitalize transition-colors ${
                  selectedTab === tab
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-secondary-600 hover:text-secondary-900'
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
              <div className="glass-card rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-secondary-900 mb-4">About This Agent</h2>
                <p className="text-secondary-700 leading-relaxed mb-6">{agent.longDescription}</p>

                <h3 className="text-xl font-bold text-secondary-900 mb-3">Use Cases</h3>
                <ul className="space-y-2">
                  {agent.useCases.map((useCase, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-secondary-700">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      {useCase}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="glass-card rounded-2xl p-6">
                <h3 className="text-lg font-bold text-secondary-900 mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-secondary-900">{agent.deployments.toLocaleString()}</div>
                      <div className="text-sm text-secondary-600">Active Deployments</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
                      <Star className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-secondary-900">{agent.rating}/5</div>
                      <div className="text-sm text-secondary-600">{agent.reviews} Reviews</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                      <Award className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-secondary-900">{agent.stats.successRate}</div>
                      <div className="text-sm text-secondary-600">Success Rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'features' && (
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-secondary-900 mb-6">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {agent.features.map((feature, idx) => (
                <div key={idx} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-secondary-900 mb-1">{feature.title}</h3>
                    <p className="text-secondary-600">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'tech-stack' && (
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-secondary-900 mb-6">Technology Stack</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {agent.techStack.map((tech, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="text-3xl">{tech.icon}</div>
                  <div>
                    <div className="font-bold text-secondary-900">{tech.name}</div>
                    <div className="text-sm text-secondary-600">{tech.category}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'reviews' && (
          <div className="space-y-6">
            {/* Reviews Summary */}
            <div className="glass-card rounded-2xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="text-center">
                  <div className="text-6xl font-bold text-secondary-900 mb-2">{agent.rating}</div>
                  <div className="flex justify-center mb-2">{renderStars(agent.rating)}</div>
                  <div className="text-secondary-600">Based on {agent.reviews} reviews</div>
                </div>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = agent.reviews.filter((r) => Math.floor(r.rating) === star).length;
                    const percentage = (count / agent.reviews.length) * 100;
                    return (
                      <div key={star} className="flex items-center gap-3">
                        <span className="text-sm font-medium text-secondary-700 w-8">{star} ★</span>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-400"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-secondary-600 w-12">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Individual Reviews */}
            <div className="space-y-4">
              {agent.reviews.map((review) => (
                <div key={review.id} className="glass-card rounded-2xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                        {review.author.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-secondary-900">{review.author}</span>
                          {review.verified && (
                            <CheckCircle className="w-4 h-4 text-green-500" title="Verified Purchase" />
                          )}
                        </div>
                        <div className="text-sm text-secondary-600">
                          {review.role} at {review.company}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-secondary-600">{review.date}</div>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    {renderStars(review.rating)}
                    <span className="font-bold text-secondary-900">{review.rating}.0</span>
                  </div>
                  <h3 className="font-bold text-secondary-900 mb-2">{review.title}</h3>
                  <p className="text-secondary-700 mb-4">{review.content}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <button className="text-secondary-600 hover:text-primary-600 flex items-center gap-1">
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
