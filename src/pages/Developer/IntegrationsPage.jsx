import { useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { Input, Tabs, Badge } from '../../components/common';
import { IntegrationCard } from '../../components/developer';
import { Search, Package, TrendingUp } from 'lucide-react';
import toast from 'react-hot-toast';

const IntegrationsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [installedIntegrations, setInstalledIntegrations] = useState(['slack', 'github']);

  const integrations = [
    {
      id: 'slack',
      name: 'Slack',
      provider: 'Slack Technologies',
      description: 'Send agent execution results and HITL approvals to Slack channels',
      category: 'Communication',
      rating: 4.8,
      installs: 15420,
      features: [
        'Send notifications to channels',
        'Interactive approval buttons',
        'Real-time status updates',
      ],
      tags: ['notifications', 'collaboration', 'chat'],
    },
    {
      id: 'teams',
      name: 'Microsoft Teams',
      provider: 'Microsoft Corporation',
      description: 'Integrate with Microsoft Teams for notifications and collaboration',
      category: 'Communication',
      rating: 4.6,
      installs: 12340,
      features: [
        'Post messages to channels',
        'Adaptive cards for rich content',
        'Workflow triggers',
      ],
      tags: ['notifications', 'microsoft', 'enterprise'],
    },
    {
      id: 'github',
      name: 'GitHub',
      provider: 'GitHub, Inc.',
      description: 'Connect agents to GitHub repositories for code analysis and automation',
      category: 'Development',
      rating: 4.9,
      installs: 18920,
      features: [
        'Code repository access',
        'Pull request automation',
        'Issue management',
      ],
      tags: ['git', 'development', 'automation'],
    },
    {
      id: 'jira',
      name: 'Jira',
      provider: 'Atlassian',
      description: 'Create and update Jira issues from agent executions',
      category: 'Project Management',
      rating: 4.5,
      installs: 9870,
      features: [
        'Create issues automatically',
        'Update issue status',
        'Link to agent executions',
      ],
      tags: ['project-management', 'tracking', 'atlassian'],
    },
    {
      id: 'zapier',
      name: 'Zapier',
      provider: 'Zapier, Inc.',
      description: 'Connect Aasim to 5000+ apps through Zapier',
      category: 'Automation',
      rating: 4.7,
      installs: 23450,
      features: [
        'Trigger zaps from agent events',
        'Multi-step workflows',
        'Data transformation',
      ],
      tags: ['automation', 'workflows', 'integration'],
    },
    {
      id: 'salesforce',
      name: 'Salesforce',
      provider: 'Salesforce, Inc.',
      description: 'Sync agent data with Salesforce CRM',
      category: 'CRM',
      rating: 4.4,
      installs: 7650,
      features: [
        'Create and update records',
        'Query Salesforce data',
        'Workflow automation',
      ],
      tags: ['crm', 'sales', 'enterprise'],
    },
    {
      id: 'hubspot',
      name: 'HubSpot',
      provider: 'HubSpot, Inc.',
      description: 'Integrate with HubSpot for marketing and sales automation',
      category: 'CRM',
      rating: 4.6,
      installs: 5430,
      features: [
        'Contact management',
        'Email automation',
        'Lead scoring',
      ],
      tags: ['crm', 'marketing', 'automation'],
    },
    {
      id: 'google-sheets',
      name: 'Google Sheets',
      provider: 'Google LLC',
      description: 'Read from and write to Google Sheets',
      category: 'Productivity',
      rating: 4.5,
      installs: 14320,
      features: [
        'Read spreadsheet data',
        'Append rows automatically',
        'Real-time updates',
      ],
      tags: ['spreadsheets', 'data', 'google'],
    },
  ];

  const filteredIntegrations = integrations.filter((integration) => {
    const matchesSearch =
      integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      integration.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      integration.tags.some((tag) => tag.includes(searchQuery.toLowerCase()));
    const matchesCategory =
      filterCategory === 'all' || integration.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(integrations.map((i) => i.category))];

  const handleInstall = (integrationId) => {
    setInstalledIntegrations([...installedIntegrations, integrationId]);
    toast.success('Integration installed successfully');
  };

  const handleConfigure = (integrationId) => {
    toast.info('Configuration modal coming soon');
  };

  const handleViewDocs = (integrationId) => {
    toast.info('Opening documentation');
  };

  const installedTab = {
    id: 'installed',
    label: 'Installed',
    badge: installedIntegrations.length.toString(),
    content: (
      <div className="space-y-4">
        {installedIntegrations.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Integrations Installed
            </h3>
            <p className="text-gray-600">
              Browse the marketplace to install your first integration
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrations
              .filter((i) => installedIntegrations.includes(i.id))
              .map((integration) => (
                <IntegrationCard
                  key={integration.id}
                  integration={integration}
                  isInstalled={true}
                  onConfigure={handleConfigure}
                  onViewDocs={handleViewDocs}
                />
              ))}
          </div>
        )}
      </div>
    ),
  };

  const marketplaceTab = {
    id: 'marketplace',
    label: 'Marketplace',
    icon: <Package className="w-4 h-4" />,
    content: (
      <div className="space-y-4">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search integrations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-5 h-5 text-gray-400" />}
            />
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Integrations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIntegrations.map((integration) => (
            <IntegrationCard
              key={integration.id}
              integration={integration}
              isInstalled={installedIntegrations.includes(integration.id)}
              onInstall={handleInstall}
              onConfigure={handleConfigure}
              onViewDocs={handleViewDocs}
            />
          ))}
        </div>
      </div>
    ),
  };

  return (
    <MainLayout>
      <div className="py-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-heading font-bold text-gray-900 mb-2">
              Integrations
            </h1>
            <p className="text-lg text-gray-600">
              Connect Aasim with your favorite tools and services
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <Package className="w-8 h-8 text-blue-600" />
              <Badge variant="info" size="lg">
                {installedIntegrations.length}
              </Badge>
            </div>
            <p className="text-sm text-blue-600 font-medium">Installed Integrations</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-green-600" />
              <Badge variant="success" size="lg">
                {integrations.length}
              </Badge>
            </div>
            <p className="text-sm text-green-600 font-medium">Available Integrations</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
            <div className="flex items-center justify-between mb-2">
              <Package className="w-8 h-8 text-purple-600" />
              <Badge variant="default" size="lg">
                {categories.length}
              </Badge>
            </div>
            <p className="text-sm text-purple-600 font-medium">Categories</p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs
          tabs={[installedTab, marketplaceTab]}
          defaultTab="marketplace"
          variant="default"
        />
      </div>
    </MainLayout>
  );
};

export default IntegrationsPage;
