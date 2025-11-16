import api from './api';

const engineService = {
  // Get all available engines
  getEngines: async () => {
    const response = await api.get('/engines');
    return response.data;
  },

  // Get engine by ID
  getEngine: async (engineId) => {
    const response = await api.get(`/engines/${engineId}`);
    return response.data;
  },

  // Test engine with sample data
  testEngine: async (engineId, testData) => {
    const response = await api.post(`/engines/${engineId}/test`, testData);
    return response.data;
  },

  // Get engine capabilities
  getEngineCapabilities: async (engineId) => {
    const response = await api.get(`/engines/${engineId}/capabilities`);
    return response.data;
  },

  // Get engine usage stats
  getEngineUsage: async (engineId, params) => {
    const response = await api.get(`/engines/${engineId}/usage`, { params });
    return response.data;
  },

  // Get recent engine runs
  getRecentRuns: async (engineId, limit = 10) => {
    const response = await api.get(`/engines/${engineId}/runs`, {
      params: { limit },
    });
    return response.data;
  },

  // Vision Engine specific methods
  vision: {
    analyzeImage: async (imageData, options = {}) => {
      const response = await api.post('/engines/vision/analyze', {
        image: imageData,
        ...options,
      });
      return response.data;
    },
    detectObjects: async (imageData) => {
      const response = await api.post('/engines/vision/detect-objects', {
        image: imageData,
      });
      return response.data;
    },
    extractText: async (imageData) => {
      const response = await api.post('/engines/vision/ocr', {
        image: imageData,
      });
      return response.data;
    },
  },

  // Audio Engine specific methods
  audio: {
    transcribe: async (audioData, options = {}) => {
      const response = await api.post('/engines/audio/transcribe', {
        audio: audioData,
        ...options,
      });
      return response.data;
    },
    analyzeSentiment: async (audioData) => {
      const response = await api.post('/engines/audio/sentiment', {
        audio: audioData,
      });
      return response.data;
    },
  },

  // Text Engine specific methods
  text: {
    analyze: async (text, options = {}) => {
      const response = await api.post('/engines/text/analyze', {
        text,
        ...options,
      });
      return response.data;
    },
    extractEntities: async (text) => {
      const response = await api.post('/engines/text/entities', { text });
      return response.data;
    },
    summarize: async (text, maxLength) => {
      const response = await api.post('/engines/text/summarize', {
        text,
        max_length: maxLength,
      });
      return response.data;
    },
  },

  // Code Engine specific methods
  code: {
    analyze: async (code, language) => {
      const response = await api.post('/engines/code/analyze', {
        code,
        language,
      });
      return response.data;
    },
    detectBugs: async (code, language) => {
      const response = await api.post('/engines/code/detect-bugs', {
        code,
        language,
      });
      return response.data;
    },
    optimize: async (code, language) => {
      const response = await api.post('/engines/code/optimize', {
        code,
        language,
      });
      return response.data;
    },
  },

  // Document Engine specific methods
  document: {
    extract: async (documentData, options = {}) => {
      const response = await api.post('/engines/document/extract', {
        document: documentData,
        ...options,
      });
      return response.data;
    },
    getMetadata: async (documentData) => {
      const response = await api.post('/engines/document/metadata', {
        document: documentData,
      });
      return response.data;
    },
  },

  // Data Engine specific methods
  data: {
    analyze: async (data, options = {}) => {
      const response = await api.post('/engines/data/analyze', {
        data,
        ...options,
      });
      return response.data;
    },
    validate: async (data, schema) => {
      const response = await api.post('/engines/data/validate', {
        data,
        schema,
      });
      return response.data;
    },
    transform: async (data, transformation) => {
      const response = await api.post('/engines/data/transform', {
        data,
        transformation,
      });
      return response.data;
    },
  },

  // Web Engine specific methods
  web: {
    scrape: async (url, options = {}) => {
      const response = await api.post('/engines/web/scrape', {
        url,
        ...options,
      });
      return response.data;
    },
    monitor: async (url, frequency) => {
      const response = await api.post('/engines/web/monitor', {
        url,
        frequency,
      });
      return response.data;
    },
    screenshot: async (url, options = {}) => {
      const response = await api.post('/engines/web/screenshot', {
        url,
        ...options,
      });
      return response.data;
    },
  },
};

export default engineService;
