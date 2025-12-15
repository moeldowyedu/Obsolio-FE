import api from './api';

const webhookService = {
  // Get all webhooks
  getWebhooks: async () => {
    // const response = await api.get('/webhooks');
    // return response.data;
    return Promise.resolve({
      data: [
        { id: 'wh_1', url: 'https://mysite.com/hook', events: ['user.created'], enabled: true }
      ]
    });
  },

  // Get webhook by ID
  getWebhook: async (webhookId) => {
    return Promise.resolve({ data: { id: webhookId, url: 'https://mock.com', events: [] } });
  },

  // Create webhook
  createWebhook: async (webhookData) => {
    return Promise.resolve({ data: { id: 'wh_' + Date.now(), ...webhookData } });
  },

  // Update webhook
  updateWebhook: async (webhookId, webhookData) => {
    return Promise.resolve({ data: { id: webhookId, ...webhookData } });
  },

  // Delete webhook
  deleteWebhook: async (webhookId) => {
    return Promise.resolve({ success: true });
  },

  // Test webhook
  testWebhook: async (webhookId, testPayload = {}) => {
    return Promise.resolve({ success: true, message: 'Test event sent' });
  },

  // Get webhook deliveries
  getWebhookDeliveries: async (webhookId, params = {}) => {
    return Promise.resolve({ data: [] });
  },

  // Retry webhook delivery
  retryDelivery: async (webhookId, deliveryId) => {
    return Promise.resolve({ success: true });
  },

  // Enable/disable webhook
  toggleWebhook: async (webhookId, enabled) => {
    return Promise.resolve({ data: { id: webhookId, enabled } });
  },

  // Get webhook events
  getWebhookEvents: async () => {
    return Promise.resolve({ data: ['user.created', 'user.updated', 'order.paid'] });
  },

  // Regenerate webhook secret
  regenerateSecret: async (webhookId) => {
    return Promise.resolve({ data: { secret: 'whsec_' + Date.now() } });
  },
};

export default webhookService;
