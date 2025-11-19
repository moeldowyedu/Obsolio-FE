import { useState } from 'react';
import {
  Mail,
  Folder,
  Webhook,
  Database,
  Globe,
  Upload,
  ArrowRight,
  Bell,
  Settings,
} from 'lucide-react';
import Input from '../common/Input/Input';
import Select from '../common/Input/Select';
import Textarea from '../common/Input/Textarea';
import Button from '../common/Button/Button';
import Card from '../common/Card/Card';
import { useAgentDeploymentStore } from '../../store/agentDeploymentStore';

const ConfigureInputOutputStep = ({ onNext, onBack }) => {
  const { inputOutput, setInputSource, setOutputDestination } = useAgentDeploymentStore();
  const [inputConfig, setInputConfig] = useState(inputOutput.inputSource.config);
  const [outputConfig, setOutputConfig] = useState(inputOutput.outputDestination.config);

  const inputSourceTypes = [
    {
      id: 'email',
      title: 'Email Inbox',
      description: 'Watch for email attachments or content',
      icon: Mail,
      color: 'bg-blue-500',
    },
    {
      id: 'folder',
      title: 'Folder/Storage',
      description: 'Monitor cloud storage or FTP folders',
      icon: Folder,
      color: 'bg-green-500',
    },
    {
      id: 'webhook',
      title: 'Webhook',
      description: 'Trigger via API webhook call',
      icon: Webhook,
      color: 'bg-purple-500',
    },
    {
      id: 'database',
      title: 'Database',
      description: 'Query database for records',
      icon: Database,
      color: 'bg-orange-500',
    },
    {
      id: 'api',
      title: 'API Endpoint',
      description: 'Fetch data from external API',
      icon: Globe,
      color: 'bg-pink-500',
    },
    {
      id: 'manual',
      title: 'Manual Upload',
      description: 'User uploads files manually',
      icon: Upload,
      color: 'bg-gray-500',
    },
  ];

  const outputDestinationTypes = [
    {
      id: 'email',
      title: 'Email',
      description: 'Send results via email',
      icon: Mail,
      color: 'bg-blue-500',
    },
    {
      id: 'folder',
      title: 'Folder/Storage',
      description: 'Save to cloud storage',
      icon: Folder,
      color: 'bg-green-500',
    },
    {
      id: 'database',
      title: 'Database',
      description: 'Insert/update database records',
      icon: Database,
      color: 'bg-orange-500',
    },
    {
      id: 'webhook',
      title: 'Webhook',
      description: 'POST results to URL',
      icon: Webhook,
      color: 'bg-purple-500',
    },
    {
      id: 'dashboard',
      title: 'Dashboard',
      description: 'View in Aasim platform',
      icon: Settings,
      color: 'bg-indigo-500',
    },
    {
      id: 'notification',
      title: 'Notification',
      description: 'Send to Slack, Teams, or SMS',
      icon: Bell,
      color: 'bg-yellow-500',
    },
  ];

  const handleInputSourceSelect = (type) => {
    setInputSource(type, {});
    setInputConfig({});
  };

  const handleOutputDestinationSelect = (type) => {
    setOutputDestination(type, {});
    setOutputConfig({});
  };

  const handleInputConfigChange = (field, value) => {
    const newConfig = { ...inputConfig, [field]: value };
    setInputConfig(newConfig);
    setInputSource(inputOutput.inputSource.type, newConfig);
  };

  const handleOutputConfigChange = (field, value) => {
    const newConfig = { ...outputConfig, [field]: value };
    setOutputConfig(newConfig);
    setOutputDestination(inputOutput.outputDestination.type, newConfig);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  const renderInputConfig = () => {
    const type = inputOutput.inputSource.type;

    switch (type) {
      case 'email':
        return (
          <div className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="inbox@example.com"
              value={inputConfig.email || ''}
              onChange={(e) => handleInputConfigChange('email', e.target.value)}
              helperText="Email address to monitor"
              required
              fullWidth
            />
            <Input
              label="Subject Filter"
              type="text"
              placeholder="e.g., Invoice, Document"
              value={inputConfig.subjectFilter || ''}
              onChange={(e) => handleInputConfigChange('subjectFilter', e.target.value)}
              helperText="Optional - filter by subject line"
              fullWidth
            />
          </div>
        );

      case 'folder':
        return (
          <div className="space-y-4">
            <Select
              label="Storage Provider"
              value={inputConfig.provider || ''}
              onChange={(e) => handleInputConfigChange('provider', e.target.value)}
              options={[
                { value: '', label: 'Select provider' },
                { value: 'google-drive', label: 'Google Drive' },
                { value: 'dropbox', label: 'Dropbox' },
                { value: 'onedrive', label: 'OneDrive' },
                { value: 'ftp', label: 'FTP/SFTP' },
                { value: 's3', label: 'Amazon S3' },
              ]}
              required
              fullWidth
            />
            <Input
              label="Folder Path"
              type="text"
              placeholder="/documents/invoices"
              value={inputConfig.path || ''}
              onChange={(e) => handleInputConfigChange('path', e.target.value)}
              required
              fullWidth
            />
          </div>
        );

      case 'webhook':
        return (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <p className="text-sm text-purple-700 mb-2">
              Your webhook URL will be generated after deployment:
            </p>
            <code className="block bg-white p-2 rounded text-sm text-secondary-800">
              https://api.aasim.ai/webhooks/[agent-id]
            </code>
          </div>
        );

      case 'database':
        return (
          <div className="space-y-4">
            <Select
              label="Database Type"
              value={inputConfig.dbType || ''}
              onChange={(e) => handleInputConfigChange('dbType', e.target.value)}
              options={[
                { value: '', label: 'Select database' },
                { value: 'mysql', label: 'MySQL' },
                { value: 'postgresql', label: 'PostgreSQL' },
                { value: 'mongodb', label: 'MongoDB' },
                { value: 'mssql', label: 'SQL Server' },
              ]}
              required
              fullWidth
            />
            <Input
              label="Connection String"
              type="text"
              placeholder="connection string or host"
              value={inputConfig.connectionString || ''}
              onChange={(e) => handleInputConfigChange('connectionString', e.target.value)}
              required
              fullWidth
            />
            <Textarea
              label="Query"
              placeholder="SELECT * FROM invoices WHERE processed = false"
              value={inputConfig.query || ''}
              onChange={(e) => handleInputConfigChange('query', e.target.value)}
              rows={3}
              required
              fullWidth
            />
          </div>
        );

      case 'api':
        return (
          <div className="space-y-4">
            <Input
              label="API Endpoint URL"
              type="url"
              placeholder="https://api.example.com/data"
              value={inputConfig.url || ''}
              onChange={(e) => handleInputConfigChange('url', e.target.value)}
              required
              fullWidth
            />
            <Select
              label="Method"
              value={inputConfig.method || 'GET'}
              onChange={(e) => handleInputConfigChange('method', e.target.value)}
              options={[
                { value: 'GET', label: 'GET' },
                { value: 'POST', label: 'POST' },
              ]}
              fullWidth
            />
            <Textarea
              label="Headers (JSON)"
              placeholder='{"Authorization": "Bearer token"}'
              value={inputConfig.headers || ''}
              onChange={(e) => handleInputConfigChange('headers', e.target.value)}
              rows={3}
              fullWidth
            />
          </div>
        );

      case 'manual':
        return (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-secondary-700">
              Users will manually upload files when triggering the agent. No additional configuration needed.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  const renderOutputConfig = () => {
    const type = inputOutput.outputDestination.type;

    switch (type) {
      case 'email':
        return (
          <div className="space-y-4">
            <Input
              label="Recipient Email(s)"
              type="text"
              placeholder="user@example.com, team@example.com"
              value={outputConfig.recipients || ''}
              onChange={(e) => handleOutputConfigChange('recipients', e.target.value)}
              helperText="Comma-separated email addresses"
              required
              fullWidth
            />
            <Input
              label="Subject Template"
              type="text"
              placeholder="Agent Results: {date}"
              value={outputConfig.subject || ''}
              onChange={(e) => handleOutputConfigChange('subject', e.target.value)}
              fullWidth
            />
          </div>
        );

      case 'folder':
        return (
          <div className="space-y-4">
            <Select
              label="Storage Provider"
              value={outputConfig.provider || ''}
              onChange={(e) => handleOutputConfigChange('provider', e.target.value)}
              options={[
                { value: '', label: 'Select provider' },
                { value: 'google-drive', label: 'Google Drive' },
                { value: 'dropbox', label: 'Dropbox' },
                { value: 'onedrive', label: 'OneDrive' },
                { value: 'ftp', label: 'FTP/SFTP' },
                { value: 's3', label: 'Amazon S3' },
              ]}
              required
              fullWidth
            />
            <Input
              label="Destination Folder"
              type="text"
              placeholder="/results/processed"
              value={outputConfig.path || ''}
              onChange={(e) => handleOutputConfigChange('path', e.target.value)}
              required
              fullWidth
            />
          </div>
        );

      case 'database':
        return (
          <div className="space-y-4">
            <Select
              label="Database Type"
              value={outputConfig.dbType || ''}
              onChange={(e) => handleOutputConfigChange('dbType', e.target.value)}
              options={[
                { value: '', label: 'Select database' },
                { value: 'mysql', label: 'MySQL' },
                { value: 'postgresql', label: 'PostgreSQL' },
                { value: 'mongodb', label: 'MongoDB' },
                { value: 'mssql', label: 'SQL Server' },
              ]}
              required
              fullWidth
            />
            <Input
              label="Table/Collection"
              type="text"
              placeholder="processed_results"
              value={outputConfig.table || ''}
              onChange={(e) => handleOutputConfigChange('table', e.target.value)}
              required
              fullWidth
            />
          </div>
        );

      case 'webhook':
        return (
          <div className="space-y-4">
            <Input
              label="Webhook URL"
              type="url"
              placeholder="https://your-service.com/webhook"
              value={outputConfig.url || ''}
              onChange={(e) => handleOutputConfigChange('url', e.target.value)}
              required
              fullWidth
            />
            <Textarea
              label="Custom Headers (JSON)"
              placeholder='{"Authorization": "Bearer token"}'
              value={outputConfig.headers || ''}
              onChange={(e) => handleOutputConfigChange('headers', e.target.value)}
              rows={3}
              fullWidth
            />
          </div>
        );

      case 'dashboard':
        return (
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
            <p className="text-sm text-indigo-700">
              Results will be available in your Aasim dashboard. No additional configuration needed.
            </p>
          </div>
        );

      case 'notification':
        return (
          <div className="space-y-4">
            <Select
              label="Notification Platform"
              value={outputConfig.platform || ''}
              onChange={(e) => handleOutputConfigChange('platform', e.target.value)}
              options={[
                { value: '', label: 'Select platform' },
                { value: 'slack', label: 'Slack' },
                { value: 'teams', label: 'Microsoft Teams' },
                { value: 'sms', label: 'SMS' },
                { value: 'discord', label: 'Discord' },
              ]}
              required
              fullWidth
            />
            <Input
              label="Webhook/Phone"
              type="text"
              placeholder="Slack webhook URL or phone number"
              value={outputConfig.target || ''}
              onChange={(e) => handleOutputConfigChange('target', e.target.value)}
              required
              fullWidth
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-secondary-900 mb-2">Configure Input/Output</h2>
        <p className="text-secondary-600">
          Define where the agent gets its data and where it sends results
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Input Source Section */}
        <div>
          <h3 className="text-xl font-semibold text-secondary-900 mb-4">Input Source</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {inputSourceTypes.map((source) => {
              const Icon = source.icon;
              const isSelected = inputOutput.inputSource.type === source.id;

              return (
                <Card
                  key={source.id}
                  onClick={() => handleInputSourceSelect(source.id)}
                  className={`cursor-pointer transition-all ${
                    isSelected ? 'border-2 border-primary-600 shadow-md' : 'border border-gray-200 hover:shadow-sm'
                  }`}
                >
                  <div className={`w-10 h-10 ${source.color} rounded-lg flex items-center justify-center mb-3`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-semibold text-secondary-900 mb-1">{source.title}</h4>
                  <p className="text-xs text-secondary-600">{source.description}</p>
                </Card>
              );
            })}
          </div>

          {inputOutput.inputSource.type && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-medium text-secondary-900 mb-4">Configure Input Source</h4>
              {renderInputConfig()}
            </div>
          )}
        </div>

        {/* Flow Arrow */}
        {inputOutput.inputSource.type && (
          <div className="flex justify-center py-4">
            <ArrowRight className="w-8 h-8 text-gray-400" />
          </div>
        )}

        {/* Output Destination Section */}
        <div>
          <h3 className="text-xl font-semibold text-secondary-900 mb-4">Output Destination</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {outputDestinationTypes.map((dest) => {
              const Icon = dest.icon;
              const isSelected = inputOutput.outputDestination.type === dest.id;

              return (
                <Card
                  key={dest.id}
                  onClick={() => handleOutputDestinationSelect(dest.id)}
                  className={`cursor-pointer transition-all ${
                    isSelected ? 'border-2 border-primary-600 shadow-md' : 'border border-gray-200 hover:shadow-sm'
                  }`}
                >
                  <div className={`w-10 h-10 ${dest.color} rounded-lg flex items-center justify-center mb-3`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-semibold text-secondary-900 mb-1">{dest.title}</h4>
                  <p className="text-xs text-secondary-600">{dest.description}</p>
                </Card>
              );
            })}
          </div>

          {inputOutput.outputDestination.type && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-medium text-secondary-900 mb-4">Configure Output Destination</h4>
              {renderOutputConfig()}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4 pt-4">
          <Button variant="outline" size="lg" onClick={onBack}>
            Back
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={!inputOutput.inputSource.type || !inputOutput.outputDestination.type}
            className="min-w-[200px]"
          >
            Continue
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ConfigureInputOutputStep;
