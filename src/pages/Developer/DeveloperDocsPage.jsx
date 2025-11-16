import { useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { Card, Tabs, Badge, Alert } from '../../components/common';
import { CodeSnippet } from '../../components/developer';
import { Book, Code, Zap, Shield, ExternalLink } from 'lucide-react';

const DeveloperDocsPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');

  const quickStartCode = {
    javascript: `// Install the Aasim SDK
npm install @aasim/sdk

// Initialize the client
const Aasim = require('@aasim/sdk');

const client = new Aasim({
  apiKey: 'your_api_key_here',
  environment: 'production'
});

// Execute an agent
const result = await client.agents.execute('agent-id', {
  input: {
    message: 'Hello, AI!'
  }
});

console.log(result);`,
    python: `# Install the Aasim SDK
pip install aasim

# Initialize the client
from aasim import Aasim

client = Aasim(
    api_key="your_api_key_here",
    environment="production"
)

# Execute an agent
result = client.agents.execute(
    "agent-id",
    input={
        "message": "Hello, AI!"
    }
)

print(result)`,
    curl: `# Execute an agent using cURL
curl -X POST https://api.aasim.ai/v1/agents/agent-id/execute \\
  -H "Authorization: Bearer your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "input": {
      "message": "Hello, AI!"
    }
  }'`,
  };

  const agentExecutionCode = {
    javascript: `// Execute agent with full configuration
const result = await client.agents.execute('agent-id', {
  input: {
    message: 'Process this data',
    priority: 'high'
  },
  options: {
    timeout: 30000,
    retryAttempts: 3,
    waitForCompletion: true
  }
});

// Check execution status
const status = await client.agents.getExecutionStatus(result.executionId);

// Get execution results
if (status.status === 'completed') {
  console.log('Output:', status.output);
}`,
    python: `# Execute agent with full configuration
result = client.agents.execute(
    "agent-id",
    input={
        "message": "Process this data",
        "priority": "high"
    },
    options={
        "timeout": 30000,
        "retry_attempts": 3,
        "wait_for_completion": True
    }
)

# Check execution status
status = client.agents.get_execution_status(result["execution_id"])

# Get execution results
if status["status"] == "completed":
    print("Output:", status["output"])`,
  };

  const workflowExecutionCode = {
    javascript: `// Create and execute a workflow
const workflow = await client.workflows.create({
  name: 'Document Processing Pipeline',
  nodes: [
    {
      type: 'trigger',
      config: { event: 'document.uploaded' }
    },
    {
      type: 'agent',
      agentId: 'ocr-agent',
      config: { inputMapping: { document: 'trigger.document' } }
    },
    {
      type: 'condition',
      config: {
        field: 'confidence',
        operator: 'greater_than',
        value: 0.8
      }
    }
  ]
});

// Execute workflow
const execution = await client.workflows.execute(workflow.id, {
  document: { url: 'https://example.com/doc.pdf' }
});`,
    python: `# Create and execute a workflow
workflow = client.workflows.create(
    name="Document Processing Pipeline",
    nodes=[
        {
            "type": "trigger",
            "config": {"event": "document.uploaded"}
        },
        {
            "type": "agent",
            "agent_id": "ocr-agent",
            "config": {"input_mapping": {"document": "trigger.document"}}
        },
        {
            "type": "condition",
            "config": {
                "field": "confidence",
                "operator": "greater_than",
                "value": 0.8
            }
        }
    ]
)

# Execute workflow
execution = client.workflows.execute(
    workflow["id"],
    document={"url": "https://example.com/doc.pdf"}
)`,
  };

  const webhookHandlerCode = {
    javascript: `// Express.js webhook handler
const express = require('express');
const crypto = require('crypto');

app.post('/webhooks/aasim', express.json(), (req, res) => {
  // Verify webhook signature
  const signature = req.headers['x-aasim-signature'];
  const body = JSON.stringify(req.body);
  const expectedSignature = crypto
    .createHmac('sha256', process.env.WEBHOOK_SECRET)
    .update(body)
    .digest('hex');

  if (signature !== expectedSignature) {
    return res.status(401).send('Invalid signature');
  }

  // Handle event
  const { event, data } = req.body;

  switch (event) {
    case 'agent.execution.completed':
      console.log('Agent completed:', data.agent_id);
      break;
    case 'agent.execution.failed':
      console.log('Agent failed:', data.error);
      break;
  }

  res.status(200).send('OK');
});`,
    python: `# Flask webhook handler
from flask import Flask, request
import hmac
import hashlib

app = Flask(__name__)

@app.route('/webhooks/aasim', methods=['POST'])
def handle_webhook():
    # Verify webhook signature
    signature = request.headers.get('X-Aasim-Signature')
    body = request.get_data()
    expected_signature = hmac.new(
        WEBHOOK_SECRET.encode(),
        body,
        hashlib.sha256
    ).hexdigest()

    if signature != expected_signature:
        return 'Invalid signature', 401

    # Handle event
    event_data = request.json
    event = event_data['event']

    if event == 'agent.execution.completed':
        print(f"Agent completed: {event_data['data']['agent_id']}")
    elif event == 'agent.execution.failed':
        print(f"Agent failed: {event_data['data']['error']}")

    return 'OK', 200`,
  };

  const quickStartTab = {
    id: 'quickstart',
    label: 'Quick Start',
    icon: <Zap className="w-4 h-4" />,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">Getting Started</h3>
          <p className="text-gray-700 mb-4">
            The Aasim SDK provides a simple interface to interact with the Aasim AI Platform.
            Follow these steps to get started.
          </p>

          <Alert variant="info" title="Prerequisites">
            <ul className="mt-2 space-y-1 text-sm">
              <li>• An active Aasim account</li>
              <li>• API key (get one from the API Keys page)</li>
              <li>• Node.js 14+ or Python 3.7+</li>
            </ul>
          </Alert>
        </div>

        {/* Language Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Language
          </label>
          <div className="flex gap-2">
            {['javascript', 'python', 'curl'].map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-4 py-2 rounded-lg border-2 transition-all ${
                  selectedLanguage === lang
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {lang === 'javascript' ? 'JavaScript' : lang === 'python' ? 'Python' : 'cURL'}
              </button>
            ))}
          </div>
        </div>

        <CodeSnippet
          code={quickStartCode[selectedLanguage]}
          language={selectedLanguage}
          title="Quick Start Example"
          showLineNumbers
        />
      </div>
    ),
  };

  const agentsTab = {
    id: 'agents',
    label: 'Agents',
    icon: <Code className="w-4 h-4" />,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">Working with Agents</h3>
          <p className="text-gray-700 mb-4">
            Learn how to execute agents, monitor their status, and retrieve results.
          </p>
        </div>

        <CodeSnippet
          code={agentExecutionCode[selectedLanguage] || agentExecutionCode.javascript}
          language={selectedLanguage}
          title="Agent Execution"
          showLineNumbers
        />

        {/* API Reference */}
        <Card padding="md">
          <h4 className="font-semibold text-gray-900 mb-3">API Reference</h4>
          <div className="space-y-3 text-sm">
            <div className="p-3 bg-gray-50 rounded">
              <code className="font-mono text-primary-600">agents.execute(agentId, options)</code>
              <p className="text-gray-600 mt-1">Execute an agent with the provided input</p>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <code className="font-mono text-primary-600">agents.getExecutionStatus(executionId)</code>
              <p className="text-gray-600 mt-1">Check the status of an execution</p>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <code className="font-mono text-primary-600">agents.list(params)</code>
              <p className="text-gray-600 mt-1">List all available agents</p>
            </div>
          </div>
        </Card>
      </div>
    ),
  };

  const workflowsTab = {
    id: 'workflows',
    label: 'Workflows',
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">Workflow Orchestration</h3>
          <p className="text-gray-700 mb-4">
            Create and execute multi-step workflows programmatically.
          </p>
        </div>

        <CodeSnippet
          code={workflowExecutionCode[selectedLanguage] || workflowExecutionCode.javascript}
          language={selectedLanguage}
          title="Workflow Creation & Execution"
          showLineNumbers
        />
      </div>
    ),
  };

  const webhooksTab = {
    id: 'webhooks',
    label: 'Webhooks',
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">Handling Webhooks</h3>
          <p className="text-gray-700 mb-4">
            Set up webhook endpoints to receive real-time event notifications.
          </p>

          <Alert variant="warning" title="Security">
            Always verify webhook signatures to ensure requests are from Aasim.
          </Alert>
        </div>

        <CodeSnippet
          code={webhookHandlerCode[selectedLanguage] || webhookHandlerCode.javascript}
          language={selectedLanguage}
          title="Webhook Handler"
          showLineNumbers
        />
      </div>
    ),
  };

  const authTab = {
    id: 'authentication',
    label: 'Authentication',
    icon: <Shield className="w-4 h-4" />,
    content: (
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">Authentication</h3>
          <p className="text-gray-700 mb-4">
            All API requests must be authenticated using an API key in the Authorization header.
          </p>
        </div>

        <CodeSnippet
          code={`Authorization: Bearer your_api_key_here`}
          language="bash"
          title="Request Header"
        />

        <Alert variant="info" title="API Key Management">
          <p className="text-sm">
            API keys can be created and managed from the API Keys page. Each key can have
            specific permissions (scopes) to limit access.
          </p>
        </Alert>

        <Card padding="md">
          <h4 className="font-semibold text-gray-900 mb-3">Best Practices</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>• Store API keys in environment variables</li>
            <li>• Use different keys for development and production</li>
            <li>• Rotate keys regularly</li>
            <li>• Never expose keys in client-side code</li>
            <li>• Use scoped keys with minimum required permissions</li>
          </ul>
        </Card>
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
              Developer Documentation
            </h1>
            <p className="text-lg text-gray-600">
              SDK guides and API reference for building with Aasim
            </p>
          </div>
          <a
            href="https://docs.aasim.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-primary-600 hover:text-primary-700 border border-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
            Full Documentation
          </a>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card padding="md" className="hover:shadow-md transition-shadow cursor-pointer">
            <Book className="w-8 h-8 text-primary-600 mb-2" />
            <h3 className="font-semibold text-gray-900 mb-1">API Reference</h3>
            <p className="text-sm text-gray-600">Complete API documentation</p>
          </Card>

          <Card padding="md" className="hover:shadow-md transition-shadow cursor-pointer">
            <Code className="w-8 h-8 text-green-600 mb-2" />
            <h3 className="font-semibold text-gray-900 mb-1">SDKs</h3>
            <p className="text-sm text-gray-600">Official client libraries</p>
          </Card>

          <Card padding="md" className="hover:shadow-md transition-shadow cursor-pointer">
            <Zap className="w-8 h-8 text-yellow-600 mb-2" />
            <h3 className="font-semibold text-gray-900 mb-1">Examples</h3>
            <p className="text-sm text-gray-600">Code samples & tutorials</p>
          </Card>

          <Card padding="md" className="hover:shadow-md transition-shadow cursor-pointer">
            <Shield className="w-8 h-8 text-blue-600 mb-2" />
            <h3 className="font-semibold text-gray-900 mb-1">Security</h3>
            <p className="text-sm text-gray-600">Best practices & guides</p>
          </Card>
        </div>

        {/* Documentation Tabs */}
        <Tabs
          tabs={[quickStartTab, agentsTab, workflowsTab, webhooksTab, authTab]}
          defaultTab="quickstart"
          variant="default"
        />
      </div>
    </MainLayout>
  );
};

export default DeveloperDocsPage;
