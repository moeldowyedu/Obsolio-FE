import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useHITLApprovalStore = create(
  persist(
    (set, get) => ({
      // Pending approvals
      pendingApprovals: [],

      // Approval history
      approvalHistory: [],

      // Filters
      filters: {
        status: 'all', // 'all' | 'pending' | 'approved' | 'rejected' | 'escalated'
        urgency: 'all', // 'all' | 'urgent' | 'normal'
        agent: null,
        department: null,
        dateRange: null,
      },

      // Current task being reviewed
      currentTask: null,

      // Loading and error states
      isLoading: false,
      error: null,

      // Actions - Fetch approvals
      fetchPendingApprovals: async (userId = null) => {
        set({ isLoading: true, error: null });

        try {
          // In production, this would call the API
          // const approvals = await hitlService.getPendingApprovals(userId);

          // Mock data
          const mockApprovals = [
            {
              id: 'task-001',
              agentId: 'agent-1',
              agentName: 'Credit Scorer',
              agentJobTitle: 'Credit Risk Analyst',
              workflowId: 'workflow-1',
              workflowName: 'Loan Application Processing',
              taskName: 'Credit Score Analysis',
              description: 'Analyze credit history and calculate score',
              submittedBy: 'system',
              submittedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
              dueBy: new Date(Date.now() + 22 * 60 * 60 * 1000).toISOString(), // 22 hours from now
              priority: 'high',
              status: 'pending',
              aiDecision: {
                action: 'approve',
                confidence: 0.94,
                reasoning: 'Credit score of 720 meets approval criteria. No red flags in credit history.',
              },
              data: {
                applicantName: 'John Smith',
                creditScore: 720,
                riskLevel: 'Low',
                monthlyIncome: 7500,
                debtToIncome: 0.28,
                loanAmount: 250000,
              },
              rubricScore: 87,
              supportingDocuments: [
                { name: 'Credit Report.pdf', url: '#' },
                { name: 'Income Verification.pdf', url: '#' },
              ],
              supervisors: ['user-2', 'user-3'],
              department: 'Finance - Risk',
              escalationTime: 24, // hours
            },
            {
              id: 'task-002',
              agentId: 'agent-2',
              agentName: 'Document Verifier',
              agentJobTitle: 'KYC Analyst',
              workflowId: 'workflow-1',
              workflowName: 'Employee Onboarding',
              taskName: 'Background Check Review',
              description: 'Review background check results',
              submittedBy: 'system',
              submittedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
              dueBy: new Date(Date.now() + 19 * 60 * 60 * 1000).toISOString(),
              priority: 'urgent',
              status: 'pending',
              aiDecision: {
                action: 'flag_for_review',
                confidence: 0.76,
                reasoning: 'Minor discrepancy found in employment dates. Requires human verification.',
              },
              data: {
                candidateName: 'Sarah Johnson',
                backgroundCheckStatus: 'Completed',
                criminalRecord: 'Clear',
                employmentVerification: 'Discrepancy',
                educationVerification: 'Verified',
              },
              rubricScore: 68,
              supportingDocuments: [
                { name: 'Background Check Report.pdf', url: '#' },
              ],
              supervisors: ['user-2'],
              department: 'HR',
              escalationTime: 12,
            },
          ];

          set({
            pendingApprovals: mockApprovals,
            isLoading: false,
          });
        } catch (error) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },

      // Set current task for review
      setCurrentTask: (task) => {
        set({ currentTask: task });
      },

      // Approve task
      approveTask: async (taskId, comments = '', modifications = null) => {
        set({ isLoading: true });

        try {
          const task = get().pendingApprovals.find((t) => t.id === taskId);

          if (!task) {
            throw new Error('Task not found');
          }

          // In production, call API
          // await hitlService.approve(taskId, { comments, modifications });

          const approval = {
            id: `approval-${Date.now()}`,
            taskId,
            action: 'approved',
            approvedBy: 'current-user-id', // Would come from auth
            approvedAt: new Date().toISOString(),
            comments,
            modifications,
            task,
          };

          set((state) => ({
            pendingApprovals: state.pendingApprovals.filter((t) => t.id !== taskId),
            approvalHistory: [approval, ...state.approvalHistory],
            currentTask: null,
            isLoading: false,
          }));

          return approval;
        } catch (error) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },

      // Reject task
      rejectTask: async (taskId, reason, comments = '') => {
        set({ isLoading: true });

        try {
          const task = get().pendingApprovals.find((t) => t.id === taskId);

          if (!task) {
            throw new Error('Task not found');
          }

          if (!reason) {
            throw new Error('Rejection reason is required');
          }

          // In production, call API
          // await hitlService.reject(taskId, { reason, comments });

          const rejection = {
            id: `rejection-${Date.now()}`,
            taskId,
            action: 'rejected',
            rejectedBy: 'current-user-id',
            rejectedAt: new Date().toISOString(),
            reason,
            comments,
            task,
          };

          set((state) => ({
            pendingApprovals: state.pendingApprovals.filter((t) => t.id !== taskId),
            approvalHistory: [rejection, ...state.approvalHistory],
            currentTask: null,
            isLoading: false,
          }));

          return rejection;
        } catch (error) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },

      // Escalate task
      escalateTask: async (taskId, escalateTo, reason) => {
        set({ isLoading: true });

        try {
          const task = get().pendingApprovals.find((t) => t.id === taskId);

          if (!task) {
            throw new Error('Task not found');
          }

          // In production, call API
          // await hitlService.escalate(taskId, { escalateTo, reason });

          const updatedTask = {
            ...task,
            status: 'escalated',
            escalatedBy: 'current-user-id',
            escalatedAt: new Date().toISOString(),
            escalatedTo,
            escalationReason: reason,
          };

          set((state) => ({
            pendingApprovals: state.pendingApprovals.map((t) =>
              t.id === taskId ? updatedTask : t
            ),
            isLoading: false,
          }));

          return updatedTask;
        } catch (error) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },

      // Modify AI decision
      modifyDecision: async (taskId, newDecision, reasoning) => {
        set({ isLoading: true });

        try {
          const task = get().pendingApprovals.find((t) => t.id === taskId);

          if (!task) {
            throw new Error('Task not found');
          }

          // In production, call API
          // await hitlService.modify(taskId, { newDecision, reasoning });

          const modification = {
            id: `modification-${Date.now()}`,
            taskId,
            action: 'modified',
            modifiedBy: 'current-user-id',
            modifiedAt: new Date().toISOString(),
            originalDecision: task.aiDecision,
            newDecision: {
              action: newDecision,
              reasoning,
              confidence: 1.0, // Human decision
            },
            task,
          };

          set((state) => ({
            pendingApprovals: state.pendingApprovals.filter((t) => t.id !== taskId),
            approvalHistory: [modification, ...state.approvalHistory],
            currentTask: null,
            isLoading: false,
          }));

          return modification;
        } catch (error) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },

      // Fetch approval history
      fetchApprovalHistory: async (userId = null, filters = {}) => {
        set({ isLoading: true });

        try {
          // In production, call API
          // const history = await hitlService.getHistory(userId, filters);

          // Mock data already in state
          set({ isLoading: false });
        } catch (error) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },

      // Update filters
      updateFilters: (filters) => {
        set((state) => ({
          filters: { ...state.filters, ...filters },
        }));
      },

      // Get filtered approvals
      getFilteredApprovals: () => {
        const { pendingApprovals, filters } = get();

        let filtered = [...pendingApprovals];

        if (filters.status !== 'all') {
          filtered = filtered.filter((t) => t.status === filters.status);
        }

        if (filters.urgency !== 'all') {
          filtered = filtered.filter((t) => {
            if (filters.urgency === 'urgent') {
              return t.priority === 'urgent' || t.priority === 'high';
            }
            return t.priority === 'normal' || t.priority === 'low';
          });
        }

        if (filters.agent) {
          filtered = filtered.filter((t) => t.agentId === filters.agent);
        }

        if (filters.department) {
          filtered = filtered.filter((t) => t.department === filters.department);
        }

        return filtered;
      },

      // Get statistics
      getStatistics: () => {
        const { pendingApprovals, approvalHistory } = get();

        const total = pendingApprovals.length;
        const urgent = pendingApprovals.filter(
          (t) => t.priority === 'urgent' || t.priority === 'high'
        ).length;
        const overdue = pendingApprovals.filter(
          (t) => new Date(t.dueBy) < new Date()
        ).length;

        const approved = approvalHistory.filter((h) => h.action === 'approved').length;
        const rejected = approvalHistory.filter((h) => h.action === 'rejected').length;
        const modified = approvalHistory.filter((h) => h.action === 'modified').length;

        return {
          pending: {
            total,
            urgent,
            overdue,
          },
          history: {
            approved,
            rejected,
            modified,
            total: approvalHistory.length,
          },
        };
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
      name: 'aasim-hitl-approval-storage',
      partialize: (state) => ({
        approvalHistory: state.approvalHistory,
      }),
    }
  )
);
