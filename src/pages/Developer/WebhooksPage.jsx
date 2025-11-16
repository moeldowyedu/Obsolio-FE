import { useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import { Button, Input, Modal, Textarea, Alert, EmptyState, Badge } from '../../components/common';
import { WebhookConfigCard, CodeSnippet } from '../../components/developer';
import { Plus, Webhook, Send, Info } from 'lucide-react';
import toast from 'react-hot-toast';

const WebhooksPage = () => {
  const [webhooks, setWebhooks] = useState([
    {
      id: '1',
      name: 'Agent Execution Notifications',
      description: 'Receive notifications when agents complete execution',
      url: 'https://api.example.com/webhooks/agent-complete',
      events: ['agent.execution.completed', 'agent.execution.failed'],
      isActive: true,
      status: 'healthy',
      stats: {
        successCount: 1247,
        failureCount: 8,
        successRate: 99.4,
        avgResponseTime: 145,
      },
      lastDelivery: {
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        status: 'success',
        responseTime: 132,
      },
    },
    {
      id: '2',
      name: 'HITL Approval Alerts',
      description: 'Get notified when approvals are pending',
      url: 'https://api.example.com/webhooks/hitl-pending',
      events: ['hitl.approval.required'],
      isActive: true,
      status: 'healthy',
      stats: {
        successCount: 89,
        failureCount: 2,
        successRate: 97.8,
        avgResponseTime: 203,
      },
      lastDelivery: {
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        status: 'success',
        responseTime: 198,
      },
    },
  ]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [selectedWebhookId, setSelectedWebhookId] = useState(null);
  const [newWebhookData, setNewWebhookData] = useState({
    name: '',
    description: '',
    url: '',
    events: [],
  });

  const availableEvents = [
    { id: 'agent.execution.started', name: 'Agent Execution Started', category: 'Agents' },
    { id: 'agent.execution.completed', name: 'Agent Execution Completed', category: 'Agents' },
    { id: 'agent.execution.failed', name: 'Agent Execution Failed', category: 'Agents' },
    { id: 'workflow.execution.started', name: 'Workflow Started', category: 'Workflows' },
    { id: 'workflow.execution.completed', name: 'Workflow Completed', category: 'Workflows' },
    { id: 'hitl.approval.required', name: 'HITL Approval Required', category: 'HITL' },
    { id: 'hitl.approval.completed', name: 'HITL Approval Completed', category: 'HITL' },
  ];

  const handleCreateWebhook = () => {
    if (!newWebhookData.name.trim() || !newWebhookData.url.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (newWebhookData.events.length === 0) {
      toast.error('Please select at least one event');
      return;
    }

    const newWebhook = {
      id: Date.now().toString(),
      ...newWebhookData,
      isActive: true,
      status: 'healthy',
      stats: {
        successCount: 0,
        failureCount: 0,
        successRate: 100,
        avgResponseTime: 0,
      },
      lastDelivery: null,
    };

    setWebhooks([...webhooks, newWebhook]);
    setIsCreateModalOpen(false);
    setNewWebhookData({ name: '', description: '', url: '', events: [] });
    toast.success('Webhook created successfully');
  };

  const handleTestWebhook = async (webhookId) => {
    try {
      // Simulate webhook test
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsTestModalOpen(false);
      toast.success('Test payload sent successfully');
    } catch (error) {
      toast.error('Failed to send test payload');
    }
  };

  const handleDeleteWebhook = (webhookId) => {
    setWebhooks(webhooks.filter((w) => w.id !== webhookId));
    toast.success('Webhook deleted');
  };

  const handleToggleStatus = (webhookId) => {
    setWebhooks(
      webhooks.map((w) => (w.id === webhookId ? { ...w, isActive: !w.isActive } : w))
    );
  };

  const handleToggleEvent = (eventId) => {
    setNewWebhookData((prev) => ({
      ...prev,
      events: prev.events.includes(eventId)
        ? prev.events.filter((e) => e !== eventId)
        : [...prev.events, eventId],
    }));
  };

  const examplePayload = `{
  "event": "agent.execution.completed",
  "timestamp": "2024-01-16T10:30:00Z",
  "data": {
    "agent_id": "agent-123",
    "execution_id": "exec-456",
    "status": "success",
    "duration": 2340,
    "output": {
      "result": "...",
      "confidence": 0.95
    }
  }
}`;

  return (
    <MainLayout>
      <div className="py-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-heading font-bold text-gray-900 mb-2">
              Webhooks
            </h1>
            <p className="text-lg text-gray-600">
              Configure webhooks to receive real-time event notifications
            </p>
          </div>
          <Button onClick={() => setIsCreateModalOpen(true)} variant="primary">
            <Plus className="w-5 h-5 mr-2" />
            Create Webhook
          </Button>
        </div>

        {/* Info Alert */}
        <Alert variant="info" title="How Webhooks Work">
          <p className="text-sm">
            Webhooks allow your application to receive real-time notifications when events occur
            in Aasim. Configure an HTTPS endpoint and select which events to subscribe to.
          </p>
        </Alert>

        {/* Example Payload */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Example Webhook Payload</h3>
          <CodeSnippet
            code={examplePayload}
            language="json"
            title="POST Request to Your Endpoint"
          />
        </div>

        {/* Webhooks Grid */}
        {webhooks.length === 0 ? (
          <EmptyState
            icon={Webhook}
            title="No Webhooks Configured"
            description="Create your first webhook to start receiving event notifications"
            action={
              <Button onClick={() => setIsCreateModalOpen(true)} variant="primary">
                <Plus className="w-5 h-5 mr-2" />
                Create Webhook
              </Button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {webhooks.map((webhook) => (
              <WebhookConfigCard
                key={webhook.id}
                webhook={webhook}
                onTest={(id) => {
                  setSelectedWebhookId(id);
                  setIsTestModalOpen(true);
                }}
                onEdit={(id) => toast.info('Edit functionality coming soon')}
                onDelete={handleDeleteWebhook}
                onToggleStatus={handleToggleStatus}
              />
            ))}
          </div>
        )}

        {/* Create Modal */}
        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          title="Create Webhook"
          size="lg"
        >
          <div className="space-y-4">
            <Input
              label="Webhook Name"
              value={newWebhookData.name}
              onChange={(e) => setNewWebhookData({ ...newWebhookData, name: e.target.value })}
              placeholder="e.g., Agent Execution Notifications"
              required
            />

            <Textarea
              label="Description (Optional)"
              value={newWebhookData.description}
              onChange={(e) => setNewWebhookData({ ...newWebhookData, description: e.target.value })}
              placeholder="Describe what this webhook is for"
              rows={2}
            />

            <Input
              label="Endpoint URL"
              value={newWebhookData.url}
              onChange={(e) => setNewWebhookData({ ...newWebhookData, url: e.target.value })}
              placeholder="https://api.example.com/webhooks/endpoint"
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Subscribe to Events
              </label>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {Object.entries(
                  availableEvents.reduce((acc, event) => {
                    if (!acc[event.category]) acc[event.category] = [];
                    acc[event.category].push(event);
                    return acc;
                  }, {})
                ).map(([category, events]) => (
                  <div key={category}>
                    <p className="text-xs font-medium text-gray-500 mb-2">{category}</p>
                    <div className="space-y-2">
                      {events.map((event) => (
                        <div
                          key={event.id}
                          onClick={() => handleToggleEvent(event.id)}
                          className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                            newWebhookData.events.includes(event.id)
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={newWebhookData.events.includes(event.id)}
                              onChange={() => {}}
                            />
                            <div>
                              <p className="font-medium text-gray-900">{event.name}</p>
                              <code className="text-xs text-gray-600">{event.id}</code>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
              <Info className="w-5 h-5 text-blue-600" />
              <p className="text-sm text-gray-600">
                Selected events: {newWebhookData.events.length}
              </p>
            </div>

            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <Button
                onClick={() => setIsCreateModalOpen(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateWebhook}
                variant="primary"
                className="flex-1"
                disabled={!newWebhookData.name.trim() || !newWebhookData.url.trim()}
              >
                <Webhook className="w-4 h-4 mr-2" />
                Create Webhook
              </Button>
            </div>
          </div>
        </Modal>

        {/* Test Modal */}
        <Modal
          isOpen={isTestModalOpen}
          onClose={() => setIsTestModalOpen(false)}
          title="Test Webhook"
        >
          <div className="space-y-4">
            <Alert variant="info">
              This will send a test payload to your webhook endpoint
            </Alert>

            <CodeSnippet
              code={examplePayload}
              language="json"
              title="Test Payload"
            />

            <div className="flex gap-3 pt-4">
              <Button
                onClick={() => setIsTestModalOpen(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleTestWebhook(selectedWebhookId)}
                variant="primary"
                className="flex-1"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Test
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </MainLayout>
  );
};

export default WebhooksPage;
