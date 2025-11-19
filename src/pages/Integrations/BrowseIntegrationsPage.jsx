import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import MainLayout from '../../components/layout/MainLayout';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import Badge from '../../components/common/Badge/Badge';

const BrowseIntegrationsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [integrations] = useState([
    {
      id: 1,
      name: 'Slack',
      category: 'Communication',
      description: 'Connect with your team collaboration workspace',
      installed: true
    },
    {
      id: 2,
      name: 'Google Drive',
      category: 'Storage',
      description: 'Access and manage files in Google Drive',
      installed: true
    },
    {
      id: 3,
      name: 'Salesforce',
      category: 'CRM',
      description: 'Sync customer data with Salesforce CRM',
      installed: false
    },
    {
      id: 4,
      name: 'Stripe',
      category: 'Payment',
      description: 'Process payments and manage billing',
      installed: false
    },
    {
      id: 5,
      name: 'Twilio',
      category: 'Communication',
      description: 'Send SMS and make voice calls',
      installed: false
    },
    {
      id: 6,
      name: 'SendGrid',
      category: 'Email',
      description: 'Send transactional and marketing emails',
      installed: false
    }
  ]);

  return (
    <MainLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Browse Integrations</h1>
          <p className="text-secondary-600">
            Discover and install integrations to extend your platform
          </p>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search integrations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <Button variant="outline" icon={<Filter className="w-4 h-4" />}>
            Filter
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {integrations.map((integration) => (
            <Card key={integration.id} className="hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl font-bold">
                      {integration.name[0]}
                    </span>
                  </div>
                  {integration.installed && (
                    <Badge color="green">Installed</Badge>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-secondary-900 mb-1">
                  {integration.name}
                </h3>
                <p className="text-sm text-secondary-600 mb-2">{integration.description}</p>
                <Badge color="blue">{integration.category}</Badge>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Button
                    size="sm"
                    variant={integration.installed ? 'outline' : 'primary'}
                    className="w-full"
                  >
                    {integration.installed ? 'Configure' : 'Install'}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default BrowseIntegrationsPage;
