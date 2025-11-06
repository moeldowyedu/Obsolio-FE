import { useState } from 'react'
import MainLayout from '../../components/layout/MainLayout'
import toast from 'react-hot-toast'

const AgentIntegrationPage = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedLanguage, setSelectedLanguage] = useState('javascript')
  const [apiKey, setApiKey] = useState('aasim_sk_live_1234567890abcdef')
  const [webhookUrl, setWebhookUrl] = useState('')
  const [testPayload, setTestPayload] = useState(JSON.stringify({
    agentId: "code-judge",
    content: "Your code or content here",
    metadata: {
      filename: "example.js",
      project: "My Project"
    }
  }, null, 2))

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'dashboard' },
    { id: 'rest-api', label: 'REST API', icon: 'api' },
    { id: 'webhooks', label: 'Webhooks', icon: 'webhook' },
    { id: 'sdk', label: 'SDKs', icon: 'code' },
    { id: 'examples', label: 'Examples', icon: 'integration_instructions' },
    { id: 'testing', label: 'Testing', icon: 'bug_report' },
  ]

  const languages = [
    { id: 'javascript', name: 'JavaScript', icon: 'javascript' },
    { id: 'python', name: 'Python', icon: 'code' },
    { id: 'curl', name: 'cURL', icon: 'terminal' },
    { id: 'php', name: 'PHP', icon: 'code' },
  ]

  const codeExamples = {
    javascript: `// Install the Aasim SDK
npm install @aasim/sdk

// Initialize the client
import { AasimClient } from '@aasim/sdk'

const client = new AasimClient({
  apiKey: '${apiKey}'
})

// Submit content for evaluation
async function evaluateContent() {
  try {
    const result = await client.evaluations.create({
      agentId: 'code-judge',
      content: 'Your code or content here',
      metadata: {
        filename: 'example.js',
        project: 'My Project'
      }
    })

    console.log('Evaluation ID:', result.id)
    console.log('Status:', result.status)

    // Get evaluation results
    const evaluation = await client.evaluations.retrieve(result.id)
    console.log('Score:', evaluation.score)
    console.log('Feedback:', evaluation.feedback)

  } catch (error) {
    console.error('Evaluation failed:', error)
  }
}

evaluateContent()`,

    python: `# Install the Aasim SDK
# pip install aasim

from aasim import AasimClient

# Initialize the client
client = AasimClient(api_key="${apiKey}")

# Submit content for evaluation
try:
    result = client.evaluations.create(
        agent_id="code-judge",
        content="Your code or content here",
        metadata={
            "filename": "example.py",
            "project": "My Project"
        }
    )

    print(f"Evaluation ID: {result.id}")
    print(f"Status: {result.status}")

    # Get evaluation results
    evaluation = client.evaluations.retrieve(result.id)
    print(f"Score: {evaluation.score}")
    print(f"Feedback: {evaluation.feedback}")

except Exception as error:
    print(f"Evaluation failed: {error}")`,

    curl: `# Create an evaluation
curl https://api.aasim.ai/v1/evaluations \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "agentId": "code-judge",
    "content": "Your code or content here",
    "metadata": {
      "filename": "example.js",
      "project": "My Project"
    }
  }'

# Response:
# {
#   "id": "eval_abc123",
#   "status": "processing",
#   "createdAt": "2025-11-06T10:30:00Z"
# }

# Retrieve evaluation results
curl https://api.aasim.ai/v1/evaluations/eval_abc123 \\
  -H "Authorization: Bearer ${apiKey}"

# Response:
# {
#   "id": "eval_abc123",
#   "status": "completed",
#   "score": 92,
#   "feedback": "Detailed evaluation feedback...",
#   "completedAt": "2025-11-06T10:35:00Z"
# }`,

    php: `<?php
// Install the Aasim SDK
// composer require aasim/sdk

require_once 'vendor/autoload.php';

use Aasim\\AasimClient;

// Initialize the client
$client = new AasimClient([
    'api_key' => '${apiKey}'
]);

try {
    // Submit content for evaluation
    $result = $client->evaluations->create([
        'agentId' => 'code-judge',
        'content' => 'Your code or content here',
        'metadata' => [
            'filename' => 'example.php',
            'project' => 'My Project'
        ]
    ]);

    echo "Evaluation ID: " . $result->id . "\\n";
    echo "Status: " . $result->status . "\\n";

    // Get evaluation results
    $evaluation = $client->evaluations->retrieve($result->id);
    echo "Score: " . $evaluation->score . "\\n";
    echo "Feedback: " . $evaluation->feedback . "\\n";

} catch (Exception $error) {
    echo "Evaluation failed: " . $error->getMessage() . "\\n";
}
?>`
  }

  const apiEndpoints = [
    {
      method: 'POST',
      path: '/v1/evaluations',
      description: 'Create a new evaluation',
      color: 'green'
    },
    {
      method: 'GET',
      path: '/v1/evaluations/:id',
      description: 'Retrieve evaluation results',
      color: 'blue'
    },
    {
      method: 'GET',
      path: '/v1/evaluations',
      description: 'List all evaluations',
      color: 'blue'
    },
    {
      method: 'POST',
      path: '/v1/agents/hire',
      description: 'Hire a new agent',
      color: 'green'
    },
    {
      method: 'GET',
      path: '/v1/agents',
      description: 'List available agents',
      color: 'blue'
    },
    {
      method: 'PUT',
      path: '/v1/agents/:id/config',
      description: 'Update agent configuration',
      color: 'yellow'
    },
    {
      method: 'DELETE',
      path: '/v1/agents/:id',
      description: 'Remove an agent',
      color: 'red'
    },
  ]

  const webhookEvents = [
    {
      event: 'evaluation.created',
      description: 'Triggered when a new evaluation is created',
      color: 'blue'
    },
    {
      event: 'evaluation.processing',
      description: 'Triggered when evaluation processing starts',
      color: 'yellow'
    },
    {
      event: 'evaluation.completed',
      description: 'Triggered when evaluation is completed',
      color: 'green'
    },
    {
      event: 'evaluation.failed',
      description: 'Triggered when evaluation fails',
      color: 'red'
    },
    {
      event: 'agent.hired',
      description: 'Triggered when a new agent is hired',
      color: 'purple'
    },
    {
      event: 'agent.configured',
      description: 'Triggered when agent configuration is updated',
      color: 'indigo'
    },
  ]

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard!')
  }

  const generateNewApiKey = () => {
    const newKey = `aasim_sk_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`
    setApiKey(newKey)
    toast.success('New API key generated!')
  }

  const testWebhook = () => {
    if (!webhookUrl) {
      toast.error('Please enter a webhook URL')
      return
    }
    toast.success('Test webhook sent successfully!')
  }

  const testApiCall = () => {
    toast.success('API test request sent successfully!')
  }

  return (
    <MainLayout>
      <div className="py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 font-heading">API & Integration</h1>
          <p className="text-gray-600">
            Integrate Aasim AI Agents into your applications, websites, and workflows
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="glass-card rounded-2xl p-2">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-3 rounded-xl font-semibold transition-all ${
                    activeTab === tab.id
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="material-icons text-sm mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="glass-card rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Getting Started</h2>
                <p className="text-gray-700 mb-6">
                  Aasim provides multiple ways to integrate AI-powered evaluations into your applications:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="glass-card rounded-xl p-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                      <span className="material-icons text-blue-600">api</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">REST API</h3>
                    <p className="text-sm text-gray-600">
                      Direct HTTP API for maximum flexibility and control
                    </p>
                  </div>

                  <div className="glass-card rounded-xl p-6">
                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                      <span className="material-icons text-green-600">code</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Official SDKs</h3>
                    <p className="text-sm text-gray-600">
                      Native libraries for JavaScript, Python, PHP, and more
                    </p>
                  </div>

                  <div className="glass-card rounded-xl p-6">
                    <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                      <span className="material-icons text-purple-600">webhook</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Webhooks</h3>
                    <p className="text-sm text-gray-600">
                      Real-time notifications for evaluation events
                    </p>
                  </div>

                  <div className="glass-card rounded-xl p-6">
                    <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
                      <span className="material-icons text-orange-600">widgets</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Embed Widget</h3>
                    <p className="text-sm text-gray-600">
                      Drop-in widget for quick website integration
                    </p>
                  </div>
                </div>
              </div>

              {/* API Key Management */}
              <div className="glass-card rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">API Key Management</h2>
                <p className="text-gray-600 mb-6">
                  Your API key is used to authenticate requests to the Aasim API. Keep it secure and never share it publicly.
                </p>

                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <div className="glass-card rounded-xl p-4 bg-gray-50 font-mono text-sm">
                      {apiKey}
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(apiKey)}
                    className="glass-btn-secondary rounded-xl px-4 py-3"
                  >
                    <span className="material-icons">content_copy</span>
                  </button>
                  <button
                    onClick={generateNewApiKey}
                    className="glass-btn-primary rounded-xl px-4 py-3"
                  >
                    <span className="material-icons">refresh</span>
                  </button>
                </div>

                <div className="mt-4 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-xl">
                  <div className="flex items-start">
                    <span className="material-icons text-yellow-600 mr-2">warning</span>
                    <div className="text-sm text-yellow-800">
                      <strong>Security Note:</strong> Keep your API keys secure. Do not expose them in client-side code or public repositories.
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Start */}
              <div className="glass-card rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Start</h2>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Get your API key</h4>
                      <p className="text-sm text-gray-600">Copy your API key from above or generate a new one</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Choose your integration method</h4>
                      <p className="text-sm text-gray-600">Select REST API, SDK, or webhooks based on your needs</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Make your first API call</h4>
                      <p className="text-sm text-gray-600">Test with our examples and start evaluating content</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                      4
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Set up webhooks (optional)</h4>
                      <p className="text-sm text-gray-600">Receive real-time notifications for evaluation events</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* REST API Tab */}
          {activeTab === 'rest-api' && (
            <div className="space-y-6">
              <div className="glass-card rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">REST API Endpoints</h2>
                <p className="text-gray-600 mb-6">
                  Base URL: <code className="bg-gray-100 px-2 py-1 rounded">https://api.aasim.ai</code>
                </p>

                <div className="space-y-3">
                  {apiEndpoints.map((endpoint, index) => (
                    <div key={index} className="glass-card rounded-xl p-4 hover:shadow-lg transition-all">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center flex-1">
                          <span className={`px-3 py-1 rounded-lg text-xs font-bold text-white bg-${endpoint.color}-600 mr-4`}>
                            {endpoint.method}
                          </span>
                          <code className="text-sm font-mono text-gray-900">{endpoint.path}</code>
                        </div>
                        <p className="text-sm text-gray-600">{endpoint.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Request/Response Example */}
              <div className="glass-card rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Request & Response</h2>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Example Request</h3>
                    <div className="relative">
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto text-sm">
{`POST /v1/evaluations
Authorization: Bearer ${apiKey}
Content-Type: application/json

{
  "agentId": "code-judge",
  "content": "function calculateTotal(items) {\\n  return items.reduce((sum, item) => sum + item.price, 0)\\n}",
  "metadata": {
    "filename": "utils.js",
    "project": "E-commerce Platform",
    "language": "javascript"
  }
}`}
                      </pre>
                      <button
                        onClick={() => copyToClipboard(`POST /v1/evaluations\nAuthorization: Bearer ${apiKey}\nContent-Type: application/json\n\n{\n  "agentId": "code-judge",\n  "content": "function calculateTotal(items) {\\n  return items.reduce((sum, item) => sum + item.price, 0)\\n}",\n  "metadata": {\n    "filename": "utils.js",\n    "project": "E-commerce Platform",\n    "language": "javascript"\n  }\n}`)}
                        className="absolute top-2 right-2 glass-btn-secondary rounded-lg px-3 py-1.5 text-xs"
                      >
                        <span className="material-icons text-xs">content_copy</span>
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Example Response</h3>
                    <div className="relative">
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto text-sm">
{`HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "eval_abc123xyz789",
  "status": "processing",
  "agentId": "code-judge",
  "createdAt": "2025-11-06T10:30:00Z",
  "estimatedCompletionTime": "2025-11-06T10:35:00Z"
}

// After completion (GET /v1/evaluations/eval_abc123xyz789)
{
  "id": "eval_abc123xyz789",
  "status": "completed",
  "agentId": "code-judge",
  "score": 92,
  "maxScore": 100,
  "feedback": {
    "overall": "Well-written function with good practices",
    "strengths": [
      "Clean and concise implementation",
      "Proper use of array reduce method",
      "Good naming conventions"
    ],
    "improvements": [
      "Add input validation for items array",
      "Consider handling null/undefined price values",
      "Add JSDoc comments for documentation"
    ]
  },
  "criteria": {
    "codeQuality": 95,
    "bestPractices": 90,
    "performance": 88,
    "documentation": 85
  },
  "createdAt": "2025-11-06T10:30:00Z",
  "completedAt": "2025-11-06T10:34:23Z"
}`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Webhooks Tab */}
          {activeTab === 'webhooks' && (
            <div className="space-y-6">
              <div className="glass-card rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Webhook Events</h2>
                <p className="text-gray-600 mb-6">
                  Receive real-time notifications when events occur in your Aasim account
                </p>

                <div className="space-y-3">
                  {webhookEvents.map((webhook, index) => (
                    <div key={index} className="glass-card rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center flex-1">
                          <div className={`w-3 h-3 rounded-full bg-${webhook.color}-600 mr-4`}></div>
                          <code className="text-sm font-mono text-gray-900 font-semibold">{webhook.event}</code>
                        </div>
                        <p className="text-sm text-gray-600">{webhook.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Webhook Configuration */}
              <div className="glass-card rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Configure Webhook</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Webhook URL
                    </label>
                    <input
                      type="url"
                      value={webhookUrl}
                      onChange={(e) => setWebhookUrl(e.target.value)}
                      placeholder="https://your-domain.com/webhooks/aasim"
                      className="glass-input w-full"
                    />
                    <p className="text-xs text-gray-600 mt-1">
                      Events will be sent as POST requests to this URL
                    </p>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={testWebhook}
                      className="glass-btn-secondary rounded-xl px-6 py-3 font-semibold"
                    >
                      <span className="material-icons text-sm mr-2">bug_report</span>
                      Test Webhook
                    </button>
                    <button className="glass-btn-primary rounded-xl px-6 py-3 font-semibold">
                      <span className="material-icons text-sm mr-2">save</span>
                      Save Configuration
                    </button>
                  </div>
                </div>
              </div>

              {/* Webhook Payload Example */}
              <div className="glass-card rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Webhook Payload Example</h2>

                <div className="relative">
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-xl overflow-x-auto text-sm">
{`POST /your-webhook-endpoint
Content-Type: application/json
X-Aasim-Event: evaluation.completed
X-Aasim-Signature: sha256=abc123...

{
  "event": "evaluation.completed",
  "timestamp": "2025-11-06T10:34:23Z",
  "data": {
    "id": "eval_abc123xyz789",
    "status": "completed",
    "agentId": "code-judge",
    "score": 92,
    "feedback": {
      "overall": "Well-written function with good practices",
      "strengths": [...],
      "improvements": [...]
    },
    "completedAt": "2025-11-06T10:34:23Z"
  }
}`}
                  </pre>
                  <button
                    onClick={() => copyToClipboard(`POST /your-webhook-endpoint\nContent-Type: application/json\nX-Aasim-Event: evaluation.completed\nX-Aasim-Signature: sha256=abc123...\n\n{\n  "event": "evaluation.completed",\n  "timestamp": "2025-11-06T10:34:23Z",\n  "data": {\n    "id": "eval_abc123xyz789",\n    "status": "completed",\n    "agentId": "code-judge",\n    "score": 92,\n    "feedback": {\n      "overall": "Well-written function with good practices",\n      "strengths": [...],\n      "improvements": [...]\n    },\n    "completedAt": "2025-11-06T10:34:23Z"\n  }\n}`)}
                    className="absolute top-2 right-2 glass-btn-secondary rounded-lg px-3 py-1.5 text-xs"
                  >
                    <span className="material-icons text-xs">content_copy</span>
                  </button>
                </div>

                <div className="mt-4 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
                  <div className="flex items-start">
                    <span className="material-icons text-blue-600 mr-2">info</span>
                    <div className="text-sm text-blue-800">
                      <strong>Signature Verification:</strong> Verify the X-Aasim-Signature header to ensure the webhook came from Aasim. Use your webhook secret to validate the HMAC signature.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SDK Tab */}
          {activeTab === 'sdk' && (
            <div className="space-y-6">
              <div className="glass-card rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Official SDKs</h2>
                <p className="text-gray-600 mb-6">
                  Use our official SDKs for a better development experience
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="glass-card rounded-xl p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center mr-4">
                        <span className="material-icons text-yellow-600">javascript</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">JavaScript / Node.js</h3>
                        <code className="text-xs text-gray-600">@aasim/sdk</code>
                      </div>
                    </div>
                    <div className="bg-gray-900 text-gray-100 p-3 rounded-lg text-sm font-mono mb-3">
                      npm install @aasim/sdk
                    </div>
                    <a href="https://github.com/aasim/sdk-js" className="text-primary-600 hover:text-primary-700 text-sm font-semibold flex items-center">
                      View Documentation
                      <span className="material-icons text-sm ml-1">arrow_forward</span>
                    </a>
                  </div>

                  <div className="glass-card rounded-xl p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mr-4">
                        <span className="material-icons text-blue-600">code</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">Python</h3>
                        <code className="text-xs text-gray-600">aasim</code>
                      </div>
                    </div>
                    <div className="bg-gray-900 text-gray-100 p-3 rounded-lg text-sm font-mono mb-3">
                      pip install aasim
                    </div>
                    <a href="https://github.com/aasim/sdk-python" className="text-primary-600 hover:text-primary-700 text-sm font-semibold flex items-center">
                      View Documentation
                      <span className="material-icons text-sm ml-1">arrow_forward</span>
                    </a>
                  </div>

                  <div className="glass-card rounded-xl p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mr-4">
                        <span className="material-icons text-purple-600">code</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">PHP</h3>
                        <code className="text-xs text-gray-600">aasim/sdk</code>
                      </div>
                    </div>
                    <div className="bg-gray-900 text-gray-100 p-3 rounded-lg text-sm font-mono mb-3">
                      composer require aasim/sdk
                    </div>
                    <a href="https://github.com/aasim/sdk-php" className="text-primary-600 hover:text-primary-700 text-sm font-semibold flex items-center">
                      View Documentation
                      <span className="material-icons text-sm ml-1">arrow_forward</span>
                    </a>
                  </div>

                  <div className="glass-card rounded-xl p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center mr-4">
                        <span className="material-icons text-red-600">code</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">Ruby</h3>
                        <code className="text-xs text-gray-600">aasim-ruby</code>
                      </div>
                    </div>
                    <div className="bg-gray-900 text-gray-100 p-3 rounded-lg text-sm font-mono mb-3">
                      gem install aasim
                    </div>
                    <a href="https://github.com/aasim/sdk-ruby" className="text-primary-600 hover:text-primary-700 text-sm font-semibold flex items-center">
                      View Documentation
                      <span className="material-icons text-sm ml-1">arrow_forward</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Code Examples */}
              <div className="glass-card rounded-2xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Code Examples</h2>
                  <div className="flex space-x-2">
                    {languages.map((lang) => (
                      <button
                        key={lang.id}
                        onClick={() => setSelectedLanguage(lang.id)}
                        className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                          selectedLanguage === lang.id
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative">
                  <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto text-sm">
                    {codeExamples[selectedLanguage]}
                  </pre>
                  <button
                    onClick={() => copyToClipboard(codeExamples[selectedLanguage])}
                    className="absolute top-4 right-4 glass-btn-secondary rounded-lg px-3 py-2"
                  >
                    <span className="material-icons text-sm">content_copy</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Examples Tab */}
          {activeTab === 'examples' && (
            <div className="space-y-6">
              <div className="glass-card rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Integration Examples</h2>
                <p className="text-gray-600 mb-6">
                  Real-world examples of integrating Aasim into your applications
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="glass-card rounded-xl p-6">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                      <span className="material-icons text-blue-600">cloud_upload</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">File Upload Integration</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Automatically evaluate files when users upload them to your platform
                    </p>
                    <button className="text-primary-600 hover:text-primary-700 text-sm font-semibold flex items-center">
                      View Example
                      <span className="material-icons text-sm ml-1">arrow_forward</span>
                    </button>
                  </div>

                  <div className="glass-card rounded-xl p-6">
                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                      <span className="material-icons text-green-600">school</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">LMS Integration</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Integrate with learning management systems for assignment grading
                    </p>
                    <button className="text-primary-600 hover:text-primary-700 text-sm font-semibold flex items-center">
                      View Example
                      <span className="material-icons text-sm ml-1">arrow_forward</span>
                    </button>
                  </div>

                  <div className="glass-card rounded-xl p-6">
                    <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                      <span className="material-icons text-purple-600">git_commit</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">CI/CD Pipeline</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Add code quality checks to your continuous integration workflow
                    </p>
                    <button className="text-primary-600 hover:text-primary-700 text-sm font-semibold flex items-center">
                      View Example
                      <span className="material-icons text-sm ml-1">arrow_forward</span>
                    </button>
                  </div>

                  <div className="glass-card rounded-xl p-6">
                    <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
                      <span className="material-icons text-orange-600">widgets</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Embed Widget</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Add a simple widget to your website for instant evaluations
                    </p>
                    <button className="text-primary-600 hover:text-primary-700 text-sm font-semibold flex items-center">
                      View Example
                      <span className="material-icons text-sm ml-1">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Embed Widget Example */}
              <div className="glass-card rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Embed Widget Code</h2>
                <p className="text-gray-600 mb-6">
                  Add this snippet to your website to embed the Aasim evaluation widget
                </p>

                <div className="relative">
                  <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto text-sm">
{`<!-- Add to your HTML -->
<div id="aasim-widget"></div>

<script src="https://cdn.aasim.ai/widget/v1/aasim.js"></script>
<script>
  AasimWidget.init({
    apiKey: '${apiKey}',
    agentId: 'code-judge',
    container: '#aasim-widget',
    theme: 'light',
    onComplete: function(result) {
      console.log('Evaluation completed:', result)
      // Handle the evaluation result
    }
  })
</script>`}
                  </pre>
                  <button
                    onClick={() => copyToClipboard(`<!-- Add to your HTML -->\n<div id="aasim-widget"></div>\n\n<script src="https://cdn.aasim.ai/widget/v1/aasim.js"></script>\n<script>\n  AasimWidget.init({\n    apiKey: '${apiKey}',\n    agentId: 'code-judge',\n    container: '#aasim-widget',\n    theme: 'light',\n    onComplete: function(result) {\n      console.log('Evaluation completed:', result)\n      // Handle the evaluation result\n    }\n  })\n</script>`)}
                    className="absolute top-4 right-4 glass-btn-secondary rounded-lg px-3 py-2"
                  >
                    <span className="material-icons text-sm">content_copy</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Testing Tab */}
          {activeTab === 'testing' && (
            <div className="space-y-6">
              <div className="glass-card rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">API Testing Tool</h2>
                <p className="text-gray-600 mb-6">
                  Test your API integration with a live request
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Test Payload
                    </label>
                    <textarea
                      value={testPayload}
                      onChange={(e) => setTestPayload(e.target.value)}
                      rows={12}
                      className="glass-input w-full font-mono text-sm"
                      placeholder="Enter your test JSON payload"
                    />
                  </div>

                  <button
                    onClick={testApiCall}
                    className="glass-btn-primary rounded-xl px-6 py-3 font-semibold glow"
                  >
                    <span className="material-icons text-sm mr-2">send</span>
                    Send Test Request
                  </button>
                </div>
              </div>

              {/* Rate Limits */}
              <div className="glass-card rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Rate Limits</h2>
                <p className="text-gray-600 mb-6">
                  API rate limits ensure fair usage across all users
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="glass-card rounded-xl p-6 text-center">
                    <div className="text-4xl font-bold text-primary-600 mb-2">100</div>
                    <div className="text-sm text-gray-600">Requests per minute</div>
                  </div>
                  <div className="glass-card rounded-xl p-6 text-center">
                    <div className="text-4xl font-bold text-primary-600 mb-2">10,000</div>
                    <div className="text-sm text-gray-600">Requests per day</div>
                  </div>
                  <div className="glass-card rounded-xl p-6 text-center">
                    <div className="text-4xl font-bold text-primary-600 mb-2">5 MB</div>
                    <div className="text-sm text-gray-600">Max payload size</div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-xl">
                  <div className="flex items-start">
                    <span className="material-icons text-blue-600 mr-2">info</span>
                    <div className="text-sm text-blue-800">
                      <strong>Need higher limits?</strong> Contact our sales team to discuss enterprise plans with custom rate limits and dedicated support.
                    </div>
                  </div>
                </div>
              </div>

              {/* Error Codes */}
              <div className="glass-card rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Error Codes</h2>

                <div className="space-y-3">
                  <div className="glass-card rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <code className="font-mono text-sm font-bold text-gray-900">401 Unauthorized</code>
                      <p className="text-sm text-gray-600">Invalid or missing API key</p>
                    </div>
                  </div>
                  <div className="glass-card rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <code className="font-mono text-sm font-bold text-gray-900">429 Too Many Requests</code>
                      <p className="text-sm text-gray-600">Rate limit exceeded</p>
                    </div>
                  </div>
                  <div className="glass-card rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <code className="font-mono text-sm font-bold text-gray-900">400 Bad Request</code>
                      <p className="text-sm text-gray-600">Invalid request payload</p>
                    </div>
                  </div>
                  <div className="glass-card rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <code className="font-mono text-sm font-bold text-gray-900">404 Not Found</code>
                      <p className="text-sm text-gray-600">Resource not found</p>
                    </div>
                  </div>
                  <div className="glass-card rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <code className="font-mono text-sm font-bold text-gray-900">500 Internal Server Error</code>
                      <p className="text-sm text-gray-600">Server error, please try again</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  )
}

export default AgentIntegrationPage
