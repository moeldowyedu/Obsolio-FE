import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useWorkflowStore = create(
  persist(
    (set, get) => ({
      // Workflow state
      workflows: [],
      currentWorkflow: null,

      // Workflow builder state
      workflowSteps: [],
      connections: [],

      // Workflow metadata
      workflowMetadata: {
        name: '',
        description: '',
        projectId: null,
        departmentId: null,
        branchId: null,
        schedule: {
          frequency: 'manual',
          time: '09:00',
          timezone: 'UTC',
        },
        expectedDuration: 0, // in minutes
        hitlCheckpoints: [],
      },

      // Loading and error states
      isLoading: false,
      error: null,

      // Actions
      setCurrentWorkflow: (workflow) => {
        set({ currentWorkflow: workflow });
        if (workflow) {
          set({
            workflowSteps: workflow.steps || [],
            connections: workflow.connections || [],
            workflowMetadata: workflow.metadata || get().workflowMetadata,
          });
        }
      },

      // Workflow metadata
      updateWorkflowMetadata: (metadata) => {
        set((state) => ({
          workflowMetadata: { ...state.workflowMetadata, ...metadata },
        }));
      },

      // Step management
      addStep: (step) => {
        const newStep = {
          id: `step-${Date.now()}`,
          order: get().workflowSteps.length + 1,
          agentId: null,
          agentName: '',
          jobTitle: '',
          department: '',
          task: '',
          enginesUsed: [],
          hitlMode: 'fully-ai',
          hitlSupervisors: [],
          condition: null, // for conditional branching
          ...step,
        };

        set((state) => ({
          workflowSteps: [...state.workflowSteps, newStep],
        }));

        return newStep.id;
      },

      updateStep: (stepId, updates) => {
        set((state) => ({
          workflowSteps: state.workflowSteps.map((step) =>
            step.id === stepId ? { ...step, ...updates } : step
          ),
        }));
      },

      removeStep: (stepId) => {
        set((state) => ({
          workflowSteps: state.workflowSteps.filter((step) => step.id !== stepId),
          connections: state.connections.filter(
            (conn) => conn.from !== stepId && conn.to !== stepId
          ),
        }));

        // Reorder remaining steps
        const steps = get().workflowSteps;
        steps.forEach((step, index) => {
          get().updateStep(step.id, { order: index + 1 });
        });
      },

      reorderSteps: (startIndex, endIndex) => {
        const steps = Array.from(get().workflowSteps);
        const [removed] = steps.splice(startIndex, 1);
        steps.splice(endIndex, 0, removed);

        // Update order property
        steps.forEach((step, index) => {
          step.order = index + 1;
        });

        set({ workflowSteps: steps });
      },

      // Connection management
      addConnection: (from, to, condition = null) => {
        const connection = {
          id: `conn-${Date.now()}`,
          from,
          to,
          condition, // for conditional branching: 'approved', 'rejected', etc.
        };

        set((state) => ({
          connections: [...state.connections, connection],
        }));

        return connection.id;
      },

      removeConnection: (connectionId) => {
        set((state) => ({
          connections: state.connections.filter((conn) => conn.id !== connectionId),
        }));
      },

      // HITL checkpoint management
      addHITLCheckpoint: (stepId) => {
        const step = get().workflowSteps.find((s) => s.id === stepId);
        if (step) {
          set((state) => ({
            workflowMetadata: {
              ...state.workflowMetadata,
              hitlCheckpoints: [...state.workflowMetadata.hitlCheckpoints, stepId],
            },
          }));
        }
      },

      removeHITLCheckpoint: (stepId) => {
        set((state) => ({
          workflowMetadata: {
            ...state.workflowMetadata,
            hitlCheckpoints: state.workflowMetadata.hitlCheckpoints.filter((id) => id !== stepId),
          },
        }));
      },

      // Workflow CRUD operations
      saveWorkflow: async () => {
        const { workflowSteps, connections, workflowMetadata } = get();

        const workflow = {
          id: get().currentWorkflow?.id || `workflow-${Date.now()}`,
          steps: workflowSteps,
          connections,
          metadata: workflowMetadata,
          createdAt: get().currentWorkflow?.createdAt || new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        set({ isLoading: true });

        try {
          // In production, this would call the API
          // await workflowService.save(workflow);

          // Update local state
          set((state) => ({
            workflows: state.currentWorkflow
              ? state.workflows.map((w) => (w.id === workflow.id ? workflow : w))
              : [...state.workflows, workflow],
            currentWorkflow: workflow,
            isLoading: false,
          }));

          return workflow;
        } catch (error) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },

      loadWorkflow: (workflowId) => {
        const workflow = get().workflows.find((w) => w.id === workflowId);
        if (workflow) {
          get().setCurrentWorkflow(workflow);
        }
      },

      deleteWorkflow: (workflowId) => {
        set((state) => ({
          workflows: state.workflows.filter((w) => w.id !== workflowId),
          currentWorkflow:
            state.currentWorkflow?.id === workflowId ? null : state.currentWorkflow,
        }));
      },

      // Workflow execution
      executeWorkflow: async (workflowId, inputData = {}) => {
        set({ isLoading: true });

        try {
          // In production, this would call the API
          // const result = await workflowService.execute(workflowId, inputData);

          // Simulate execution
          await new Promise((resolve) => setTimeout(resolve, 1000));

          set({ isLoading: false });
          return { success: true, executionId: `exec-${Date.now()}` };
        } catch (error) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },

      // Validation
      validateWorkflow: () => {
        const { workflowSteps, workflowMetadata } = get();
        const errors = [];

        if (!workflowMetadata.name) {
          errors.push('Workflow name is required');
        }

        if (workflowSteps.length === 0) {
          errors.push('Workflow must have at least one step');
        }

        workflowSteps.forEach((step, index) => {
          if (!step.agentId) {
            errors.push(`Step ${index + 1}: Agent not assigned`);
          }
          if (!step.jobTitle) {
            errors.push(`Step ${index + 1}: Job title is required`);
          }
        });

        return { isValid: errors.length === 0, errors };
      },

      // Reset
      resetWorkflow: () => {
        set({
          currentWorkflow: null,
          workflowSteps: [],
          connections: [],
          workflowMetadata: {
            name: '',
            description: '',
            projectId: null,
            departmentId: null,
            branchId: null,
            schedule: {
              frequency: 'manual',
              time: '09:00',
              timezone: 'UTC',
            },
            expectedDuration: 0,
            hitlCheckpoints: [],
          },
          error: null,
        });
      },

      // Error handling
      setError: (error) => {
        set({ error });
      },

      clearError: () => {
        set({ error: null });
      },

      setLoading: (isLoading) => {
        set({ isLoading });
      },
    }),
    {
      name: 'aasim-workflow-storage',
      partialize: (state) => ({
        workflows: state.workflows,
      }),
    }
  )
);
