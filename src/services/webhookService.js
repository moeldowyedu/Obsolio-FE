import api from './api';

const webhookService = {
  // Get all webhooks
  getWebhooks: async () => {
    const response = await api.get('/webhooks');
    return response.data;
  },

  // Get webhook by ID
  getWebhook: async (webhookId) => {
    const response = await api.get(`/webhooks/${webhookId}`);
    return response.data;
  },

  // Create webhook
  createWebhook: async (webhookData) => {
    const response = await api.post('/webhooks', webhookData);
    return response.data;
  },

  // Update webhook
  updateWebhook: async (webhookId, webhookData) => {
    const response = await api.put(`/webhooks/${webhookId}`, webhookData);
    return response.data;
  },

  // Delete webhook
  deleteWebhook: async (webhookId) => {
    const response = await api.delete(`/webhooks/${webhookId}`);
    return response.data;
  },

  // Test webhook
  testWebhook: async (webhookId, testPayload = {}) => {
    const response = await api.post(`/webhooks/${webhookId}/test`, testPayload);
    return response.data;
  },

  // Get webhook deliveries
  getWebhookDeliveries: async (webhookId, params = {}) => {
    const response = await api.get(`/webhooks/${webhookId}/deliveries`, {
      params,
    });
    return response.data;
  },

  // Retry webhook delivery
  retryDelivery: async (webhookId, deliveryId) => {
    const response = await api.post(`/webhooks/${webhookId}/deliveries/${deliveryId}/retry`);
    return response.data;
  },

  // Enable/disable webhook
  toggleWebhook: async (webhookId, enabled) => {
    const response = await api.patch(`/webhooks/${webhookId}/toggle`, {
      enabled,
    });
    return response.data;
  },

  // Get webhook events
  getWebhookEvents: async () => {
    const response = await api.get('/webhooks/events');
    return response.data;
  },

  // Regenerate webhook secret
  regenerateSecret: async (webhookId) => {
    const response = await api.post(`/webhooks/${webhookId}/regenerate-secret`);
    return response.data;
  },
};

export default webhookService;
