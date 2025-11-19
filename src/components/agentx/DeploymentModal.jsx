import { useState } from 'react';
import Modal from '../common/Modal/Modal';
import Button from '../common/Button/Button';
import Badge from '../common/Badge/Badge';

const DeploymentModal = ({ isOpen, onClose, agent, onDeploy }) => {
  const [deploymentConfig, setDeploymentConfig] = useState({
    name: agent?.name || '',
    environment: 'production',
    autoScale: true,
    instances: 1,
    region: 'us-east-1'
  });

  const [loading, setLoading] = useState(false);

  const handleDeploy = async () => {
    setLoading(true);
    try {
      await onDeploy(agent, deploymentConfig);
      onClose();
    } catch (error) {
      console.error('Deployment failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const environments = [
    { value: 'development', label: 'Development' },
    { value: 'staging', label: 'Staging' },
    { value: 'production', label: 'Production' }
  ];

  const regions = [
    { value: 'us-east-1', label: 'US East (N. Virginia)' },
    { value: 'us-west-2', label: 'US West (Oregon)' },
    { value: 'eu-west-1', label: 'EU (Ireland)' },
    { value: 'ap-southeast-1', label: 'Asia Pacific (Singapore)' }
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Deploy Agent"
      size="lg"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleDeploy} loading={loading}>
            Deploy Agent
          </Button>
        </>
      }
    >
      <div className="space-y-6">
        {/* Agent Info */}
        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl">
            {agent?.icon || '🤖'}
          </div>
          <div>
            <h3 className="font-semibold text-secondary-900">{agent?.name}</h3>
            <p className="text-sm text-secondary-600">{agent?.description}</p>
            <div className="flex gap-2 mt-2">
              <Badge variant="primary" size="sm">{agent?.category}</Badge>
              <Badge variant="info" size="sm">{agent?.industry}</Badge>
            </div>
          </div>
        </div>

        {/* Deployment Configuration */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Deployment Name
            </label>
            <input
              type="text"
              value={deploymentConfig.name}
              onChange={(e) => setDeploymentConfig({ ...deploymentConfig, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter deployment name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Environment
            </label>
            <select
              value={deploymentConfig.environment}
              onChange={(e) => setDeploymentConfig({ ...deploymentConfig, environment: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {environments.map((env) => (
                <option key={env.value} value={env.value}>
                  {env.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Region
            </label>
            <select
              value={deploymentConfig.region}
              onChange={(e) => setDeploymentConfig({ ...deploymentConfig, region: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {regions.map((region) => (
                <option key={region.value} value={region.value}>
                  {region.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-secondary-900">Auto Scaling</p>
              <p className="text-sm text-secondary-600">Automatically scale based on demand</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={deploymentConfig.autoScale}
                onChange={(e) => setDeploymentConfig({ ...deploymentConfig, autoScale: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          {!deploymentConfig.autoScale && (
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Number of Instances
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={deploymentConfig.instances}
                onChange={(e) => setDeploymentConfig({ ...deploymentConfig, instances: parseInt(e.target.value) })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default DeploymentModal;
