import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAgentDeploymentStore = create(
  persist(
    (set, get) => ({
      // Current step in deployment wizard
      currentStep: 1,
      totalSteps: 7,

      // Step 1: Agent Source
      agentSource: {
        type: null, // 'existing' | 'marketplace' | 'new'
        agentId: null,
        agentData: null,
      },

      // Step 2: Job Details
      jobDetails: {
        jobTitle: '',
        jobDescription: '',
        branchId: null,
        departmentId: null,
        projectId: null,
        reportingManagerId: null,
        employmentType: 'full-time', // 'full-time' | 'part-time' | 'on-demand'
      },

      // Step 3: Schedule
      schedule: {
        frequency: 'one-time', // 'one-time' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'half-yearly' | 'yearly' | 'custom'
        time: '09:00',
        timezone: 'UTC',
        dayOfWeek: null, // For weekly: 0-6 (Sunday-Saturday)
        dayOfMonth: null, // For monthly: 1-31
        month: null, // For yearly: 1-12
        quarter: null, // For quarterly: Q1, Q2, Q3, Q4
        half: null, // For half-yearly: H1, H2
        cronExpression: '',
        skipHolidays: false,
        retryOnFailure: true,
        retryAttempts: 3,
        retryDelay: 300, // seconds
        timeout: 3600, // seconds (1 hour default)
        notifyOnCompletion: true,
      },

      // Step 4: Input/Output Configuration
      inputOutput: {
        inputSource: {
          type: null, // 'email' | 'folder' | 'webhook' | 'database' | 'api' | 'manual'
          config: {},
        },
        outputDestination: {
          type: null, // 'email' | 'folder' | 'database' | 'webhook' | 'dashboard' | 'notification'
          config: {},
        },
      },

      // Step 5: HITL Configuration
      hitlConfig: {
        mode: 'fully-ai', // 'fully-ai' | 'hitl' | 'standby' | 'in-charge' | 'hybrid'
        supervisorIds: [],
        approvalRouting: 'single', // 'single' | 'multi-stage' | 'round-robin'
        escalationHours: 24,
        notifyOnPendingApproval: true,
        notifyOnCompletion: true,
        notifyOnError: true,
        dailySummary: false,
      },

      // Step 6: Permissions
      permissions: {
        visibility: 'department', // 'private' | 'department' | 'project' | 'branch' | 'organization'
        canModify: 'creator', // 'creator' | 'managers' | 'admins'
        canTrigger: 'supervisor', // 'supervisor' | 'department' | 'operators'
      },

      // Agent deployment metadata
      deploymentMetadata: {
        createdBy: null,
        createdAt: null,
        lastModifiedBy: null,
        lastModifiedAt: null,
        status: 'draft', // 'draft' | 'active' | 'paused' | 'inactive'
        deployedAt: null,
      },

      // Loading and error states
      isLoading: false,
      error: null,
      isComplete: false,

      // Actions
      setCurrentStep: (step) => {
        set({ currentStep: step });
      },

      nextStep: () => {
        const { currentStep, totalSteps } = get();
        if (currentStep < totalSteps) {
          set({ currentStep: currentStep + 1 });
        }
      },

      prevStep: () => {
        const { currentStep } = get();
        if (currentStep > 1) {
          set({ currentStep: currentStep - 1 });
        }
      },

      // Step 1: Agent Source
      setAgentSource: (type, agentId = null, agentData = null) => {
        set({
          agentSource: {
            type,
            agentId,
            agentData,
          },
        });
      },

      // Step 2: Job Details
      updateJobDetails: (details) => {
        set((state) => ({
          jobDetails: { ...state.jobDetails, ...details },
        }));
      },

      // Step 3: Schedule
      updateSchedule: (scheduleData) => {
        set((state) => ({
          schedule: { ...state.schedule, ...scheduleData },
        }));
      },

      setScheduleFrequency: (frequency) => {
        set((state) => ({
          schedule: { ...state.schedule, frequency },
        }));
      },

      // Step 4: Input/Output
      setInputSource: (type, config) => {
        set((state) => ({
          inputOutput: {
            ...state.inputOutput,
            inputSource: { type, config },
          },
        }));
      },

      setOutputDestination: (type, config) => {
        set((state) => ({
          inputOutput: {
            ...state.inputOutput,
            outputDestination: { type, config },
          },
        }));
      },

      // Step 5: HITL Configuration
      updateHITLConfig: (config) => {
        set((state) => ({
          hitlConfig: { ...state.hitlConfig, ...config },
        }));
      },

      addSupervisor: (supervisorId) => {
        set((state) => ({
          hitlConfig: {
            ...state.hitlConfig,
            supervisorIds: [...state.hitlConfig.supervisorIds, supervisorId],
          },
        }));
      },

      removeSupervisor: (supervisorId) => {
        set((state) => ({
          hitlConfig: {
            ...state.hitlConfig,
            supervisorIds: state.hitlConfig.supervisorIds.filter((id) => id !== supervisorId),
          },
        }));
      },

      // Step 6: Permissions
      updatePermissions: (permissions) => {
        set((state) => ({
          permissions: { ...state.permissions, ...permissions },
        }));
      },

      // Deployment
      setDeploymentStatus: (status) => {
        set((state) => ({
          deploymentMetadata: { ...state.deploymentMetadata, status },
        }));
      },

      completeDeployment: () => {
        set({
          isComplete: true,
          deploymentMetadata: {
            ...get().deploymentMetadata,
            status: 'active',
            deployedAt: new Date().toISOString(),
          },
        });
      },

      // Error handling
      setError: (error) => {
        set({ error });
      },

      clearError: () => {
        set({ error: null });
      },

      // Loading state
      setLoading: (isLoading) => {
        set({ isLoading });
      },

      // Reset wizard
      resetDeployment: () => {
        set({
          currentStep: 1,
          agentSource: {
            type: null,
            agentId: null,
            agentData: null,
          },
          jobDetails: {
            jobTitle: '',
            jobDescription: '',
            branchId: null,
            departmentId: null,
            projectId: null,
            reportingManagerId: null,
            employmentType: 'full-time',
          },
          schedule: {
            frequency: 'one-time',
            time: '09:00',
            timezone: 'UTC',
            dayOfWeek: null,
            dayOfMonth: null,
            month: null,
            quarter: null,
            half: null,
            cronExpression: '',
            skipHolidays: false,
            retryOnFailure: true,
            retryAttempts: 3,
            retryDelay: 300,
            timeout: 3600,
            notifyOnCompletion: true,
          },
          inputOutput: {
            inputSource: {
              type: null,
              config: {},
            },
            outputDestination: {
              type: null,
              config: {},
            },
          },
          hitlConfig: {
            mode: 'fully-ai',
            supervisorIds: [],
            approvalRouting: 'single',
            escalationHours: 24,
            notifyOnPendingApproval: true,
            notifyOnCompletion: true,
            notifyOnError: true,
            dailySummary: false,
          },
          permissions: {
            visibility: 'department',
            canModify: 'creator',
            canTrigger: 'supervisor',
          },
          deploymentMetadata: {
            createdBy: null,
            createdAt: null,
            lastModifiedBy: null,
            lastModifiedAt: null,
            status: 'draft',
            deployedAt: null,
          },
          isLoading: false,
          error: null,
          isComplete: false,
        });
      },

      // Get full deployment configuration
      getDeploymentConfig: () => {
        const state = get();
        return {
          agentSource: state.agentSource,
          jobDetails: state.jobDetails,
          schedule: state.schedule,
          inputOutput: state.inputOutput,
          hitlConfig: state.hitlConfig,
          permissions: state.permissions,
          metadata: state.deploymentMetadata,
        };
      },
    }),
    {
      name: 'aasim-agent-deployment-storage',
      partialize: (state) => ({
        currentStep: state.currentStep,
        agentSource: state.agentSource,
        jobDetails: state.jobDetails,
        schedule: state.schedule,
        inputOutput: state.inputOutput,
        hitlConfig: state.hitlConfig,
        permissions: state.permissions,
      }),
    }
  )
);
