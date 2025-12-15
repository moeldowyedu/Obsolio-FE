import api from './api';

const integrationsService = {
  // ========== API Keys ==========
  apiKeys: {
    list: async () => {
      // const response = await api.get('/integrations/api-keys');
      // return response.data;
      return Promise.resolve({
        data: [
          { id: '1', name: 'Dev Key', key: 'sk_test_...', last_used: '2023-12-01' }
        ]
      });
    },

    get: async (id) => {
      return Promise.resolve({ data: { id, name: 'Dev Key', key: 'sk_test_...' } });
    },

    create: async (data) => {
      return Promise.resolve({ data: { id: 'new_key', ...data, key: 'sk_live_' + Date.now() } });
    },

    revoke: async (id) => {
      return Promise.resolve({ success: true });
    }
  },

  // ========== Webhooks ==========
  webhooks: {
    list: async () => {
      return Promise.resolve({ data: [] });
    },

    get: async (id) => {
      return Promise.resolve({ data: { id, url: 'https://example.com/webhook', active: true } });
    },

    create: async (data) => {
      return Promise.resolve({ data: { id: 'wh_' + Date.now(), ...data } });
    },

    update: async (id, data) => {
      return Promise.resolve({ data: { id, ...data } });
    },

    delete: async (id) => {
      return Promise.resolve({ success: true });
    },

    test: async (id) => {
      return Promise.resolve({ success: true, message: 'Webhook event sent' });
    },

    toggle: async (id) => {
      return Promise.resolve({ success: true });
    }
  },

  // ========== Connected Apps ==========
  connectedApps: {
    list: async () => {
      return Promise.resolve({
        data: [
          { id: 'app_1', name: 'Slack', status: 'connected', icon: 'slack' },
          { id: 'app_2', name: 'Google Drive', status: 'disconnected', icon: 'drive' }
        ]
      });
    },

    get: async (id) => {
      return Promise.resolve({ data: { id, name: 'Slack', status: 'connected' } });
    },

    connect: async (data) => {
      return Promise.resolve({ data: { id: 'new_app', ...data, status: 'connected' } });
    },

    update: async (id, data) => {
      return Promise.resolve({ data: { id, ...data } });
    },

    disconnect: async (id) => {
      return Promise.resolve({ success: true });
    },

    reconnect: async (id) => {
      return Promise.resolve({ success: true });
    }
  }
};

export default integrationsService;
