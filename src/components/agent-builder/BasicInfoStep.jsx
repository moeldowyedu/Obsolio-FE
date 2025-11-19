import { Card, Input, Textarea, Select } from '../common';
import { INDUSTRIES } from '../../utils/constants';

const BasicInfoStep = ({ data, onChange }) => {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-6">
      <Card padding="md">
        <h2 className="text-2xl font-heading font-bold text-secondary-900 mb-4">
          Basic Information
        </h2>
        <p className="text-secondary-600 mb-6">
          Let's start by defining the basic details of your Precision AI Agent
        </p>

        <div className="space-y-6">
          <Input
            label="Agent Name"
            placeholder="e.g., Invoice Processing Agent"
            value={data.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
            helperText="Choose a descriptive name for your agent"
            required
          />

          <Textarea
            label="Description"
            placeholder="Describe what this agent does and its purpose..."
            value={data.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={4}
            helperText="Provide a clear description of your agent's functionality"
            required
          />

          <Select
            label="Primary Industry"
            value={data.industry || ''}
            onChange={(e) => handleChange('industry', e.target.value)}
            required
          >
            <option value="">Select an industry</option>
            {INDUSTRIES.map((industry) => (
              <option key={industry.id} value={industry.id}>
                {industry.name}
              </option>
            ))}
          </Select>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Tags (comma-separated)"
              placeholder="automation, finance, invoices"
              value={data.tags || ''}
              onChange={(e) => handleChange('tags', e.target.value)}
              helperText="Add tags to help categorize your agent"
            />

            <Select
              label="Visibility"
              value={data.visibility || 'private'}
              onChange={(e) => handleChange('visibility', e.target.value)}
            >
              <option value="private">Private (Only me)</option>
              <option value="team">Team (My organization)</option>
              <option value="public">Public (Publish to marketplace)</option>
            </Select>
          </div>
        </div>
      </Card>

      {/* Tips Card */}
      <Card padding="md" className="bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xl">💡</span>
          </div>
          <div>
            <h3 className="font-semibold text-secondary-900 mb-2">Tips for Success</h3>
            <ul className="text-sm text-secondary-700 space-y-1">
              <li>• Use a clear, descriptive name that explains what the agent does</li>
              <li>• Include use cases and benefits in the description</li>
              <li>• Select the most relevant industry for better discovery</li>
              <li>• Add specific tags to improve searchability</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BasicInfoStep;
