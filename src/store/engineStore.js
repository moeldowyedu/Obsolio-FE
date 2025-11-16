import { create } from 'zustand';
import engineService from '../services/engineService';
import { ENGINES } from '../utils/constants';

export const useEngineStore = create((set, get) => ({
  engines: ENGINES,
  currentEngine: null,
  engineUsage: null,
  recentRuns: [],
  isLoading: false,
  error: null,

  // Set current engine
  setCurrentEngine: (engineId) => {
    const engine = ENGINES.find((e) => e.id === engineId);
    set({ currentEngine: engine });
  },

  // Fetch engine usage
  fetchEngineUsage: async (engineId, params = {}) => {
    set({ isLoading: true, error: null });
    try {
      const usage = await engineService.getEngineUsage(engineId, params);
      set({ engineUsage: usage, isLoading: false });
      return usage;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to fetch usage',
        isLoading: false,
      });
      throw error;
    }
  },

  // Fetch recent runs
  fetchRecentRuns: async (engineId, limit = 10) => {
    set({ isLoading: true, error: null });
    try {
      const runs = await engineService.getRecentRuns(engineId, limit);
      set({ recentRuns: runs, isLoading: false });
      return runs;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Failed to fetch recent runs',
        isLoading: false,
      });
      throw error;
    }
  },

  // Test engine
  testEngine: async (engineId, testData) => {
    set({ isLoading: true, error: null });
    try {
      const result = await engineService.testEngine(engineId, testData);
      set({ isLoading: false });
      return result;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Engine test failed',
        isLoading: false,
      });
      throw error;
    }
  },

  // Vision Engine Methods
  analyzeImage: async (imageData, options = {}) => {
    set({ isLoading: true, error: null });
    try {
      const result = await engineService.vision.analyzeImage(
        imageData,
        options
      );
      set({ isLoading: false });
      return result;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Image analysis failed',
        isLoading: false,
      });
      throw error;
    }
  },

  // Audio Engine Methods
  transcribeAudio: async (audioData, options = {}) => {
    set({ isLoading: true, error: null });
    try {
      const result = await engineService.audio.transcribe(audioData, options);
      set({ isLoading: false });
      return result;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Audio transcription failed',
        isLoading: false,
      });
      throw error;
    }
  },

  // Text Engine Methods
  analyzeText: async (text, options = {}) => {
    set({ isLoading: true, error: null });
    try {
      const result = await engineService.text.analyze(text, options);
      set({ isLoading: false });
      return result;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Text analysis failed',
        isLoading: false,
      });
      throw error;
    }
  },

  // Code Engine Methods
  analyzeCode: async (code, language) => {
    set({ isLoading: true, error: null });
    try {
      const result = await engineService.code.analyze(code, language);
      set({ isLoading: false });
      return result;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Code analysis failed',
        isLoading: false,
      });
      throw error;
    }
  },

  // Document Engine Methods
  extractDocument: async (documentData, options = {}) => {
    set({ isLoading: true, error: null });
    try {
      const result = await engineService.document.extract(
        documentData,
        options
      );
      set({ isLoading: false });
      return result;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Document extraction failed',
        isLoading: false,
      });
      throw error;
    }
  },

  // Data Engine Methods
  analyzeData: async (data, options = {}) => {
    set({ isLoading: true, error: null });
    try {
      const result = await engineService.data.analyze(data, options);
      set({ isLoading: false });
      return result;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Data analysis failed',
        isLoading: false,
      });
      throw error;
    }
  },

  // Web Engine Methods
  scrapeWeb: async (url, options = {}) => {
    set({ isLoading: true, error: null });
    try {
      const result = await engineService.web.scrape(url, options);
      set({ isLoading: false });
      return result;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Web scraping failed',
        isLoading: false,
      });
      throw error;
    }
  },

  // Clear error
  clearError: () => set({ error: null }),
}));
