import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserManagementStore = create(
  persist(
    (set, get) => ({
      // Users list
      users: [],
      invitations: [],
      currentUser: null,

      // Invitation form state
      invitationForm: {
        email: '',
        role: 'operator', // 'admin' | 'manager' | 'operator' | 'reviewer' | 'viewer'
        branchId: null,
        departmentId: null,
        projectIds: [],
        teamIds: [],
        permissions: {
          canViewAllAgents: false,
          canCreateAgents: false,
          canDeployAgents: false,
          canApproveHITL: false,
          canInviteUsers: false,
          canModifyOrgStructure: false,
          canManageBilling: false,
          canConfigureIntegrations: false,
        },
        accessScope: 'department', // 'private' | 'department' | 'project' | 'branch' | 'organization'
        message: '',
      },

      // User roles with default permissions
      roles: {
        admin: {
          name: 'Admin',
          description: 'Full access to all features and settings',
          defaultPermissions: {
            canViewAllAgents: true,
            canCreateAgents: true,
            canDeployAgents: true,
            canApproveHITL: true,
            canInviteUsers: true,
            canModifyOrgStructure: true,
            canManageBilling: true,
            canConfigureIntegrations: true,
          },
        },
        manager: {
          name: 'Manager',
          description: 'Department or branch-level management',
          defaultPermissions: {
            canViewAllAgents: false,
            canCreateAgents: true,
            canDeployAgents: true,
            canApproveHITL: true,
            canInviteUsers: true,
            canModifyOrgStructure: false,
            canManageBilling: false,
            canConfigureIntegrations: false,
          },
        },
        operator: {
          name: 'Agent Operator',
          description: 'Can run agents and view results',
          defaultPermissions: {
            canViewAllAgents: false,
            canCreateAgents: false,
            canDeployAgents: false,
            canApproveHITL: false,
            canInviteUsers: false,
            canModifyOrgStructure: false,
            canManageBilling: false,
            canConfigureIntegrations: false,
          },
        },
        reviewer: {
          name: 'Reviewer',
          description: 'HITL approver with review permissions',
          defaultPermissions: {
            canViewAllAgents: false,
            canCreateAgents: false,
            canDeployAgents: false,
            canApproveHITL: true,
            canInviteUsers: false,
            canModifyOrgStructure: false,
            canManageBilling: false,
            canConfigureIntegrations: false,
          },
        },
        viewer: {
          name: 'Viewer',
          description: 'Read-only access to assigned resources',
          defaultPermissions: {
            canViewAllAgents: false,
            canCreateAgents: false,
            canDeployAgents: false,
            canApproveHITL: false,
            canInviteUsers: false,
            canModifyOrgStructure: false,
            canManageBilling: false,
            canConfigureIntegrations: false,
          },
        },
      },

      // Loading and error states
      isLoading: false,
      error: null,

      // Actions
      updateInvitationForm: (updates) => {
        set((state) => ({
          invitationForm: { ...state.invitationForm, ...updates },
        }));
      },

      setRole: (role) => {
        const roleConfig = get().roles[role];
        if (roleConfig) {
          set((state) => ({
            invitationForm: {
              ...state.invitationForm,
              role,
              permissions: { ...roleConfig.defaultPermissions },
            },
          }));
        }
      },

      setPermission: (permission, value) => {
        set((state) => ({
          invitationForm: {
            ...state.invitationForm,
            permissions: {
              ...state.invitationForm.permissions,
              [permission]: value,
            },
          },
        }));
      },

      addProject: (projectId) => {
        set((state) => ({
          invitationForm: {
            ...state.invitationForm,
            projectIds: [...state.invitationForm.projectIds, projectId],
          },
        }));
      },

      removeProject: (projectId) => {
        set((state) => ({
          invitationForm: {
            ...state.invitationForm,
            projectIds: state.invitationForm.projectIds.filter((id) => id !== projectId),
          },
        }));
      },

      addTeam: (teamId) => {
        set((state) => ({
          invitationForm: {
            ...state.invitationForm,
            teamIds: [...state.invitationForm.teamIds, teamId],
          },
        }));
      },

      removeTeam: (teamId) => {
        set((state) => ({
          invitationForm: {
            ...state.invitationForm,
            teamIds: state.invitationForm.teamIds.filter((id) => id !== teamId),
          },
        }));
      },

      // Send invitation
      sendInvitation: async () => {
        const { invitationForm } = get();
        set({ isLoading: true, error: null });

        try {
          // Validate form
          if (!invitationForm.email) {
            throw new Error('Email is required');
          }
          if (!invitationForm.departmentId) {
            throw new Error('Department is required');
          }

          // In production, this would call the API
          // const response = await userService.invite(invitationForm);

          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000));

          const invitation = {
            id: `inv-${Date.now()}`,
            ...invitationForm,
            status: 'pending',
            sentAt: new Date().toISOString(),
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
          };

          set((state) => ({
            invitations: [...state.invitations, invitation],
            isLoading: false,
          }));

          // Reset form
          get().resetInvitationForm();

          return invitation;
        } catch (error) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },

      // Resend invitation
      resendInvitation: async (invitationId) => {
        set({ isLoading: true });

        try {
          // In production, this would call the API
          // await userService.resendInvitation(invitationId);

          await new Promise((resolve) => setTimeout(resolve, 500));

          set((state) => ({
            invitations: state.invitations.map((inv) =>
              inv.id === invitationId
                ? { ...inv, sentAt: new Date().toISOString() }
                : inv
            ),
            isLoading: false,
          }));
        } catch (error) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },

      // Cancel invitation
      cancelInvitation: async (invitationId) => {
        set({ isLoading: true });

        try {
          // In production, this would call the API
          // await userService.cancelInvitation(invitationId);

          set((state) => ({
            invitations: state.invitations.map((inv) =>
              inv.id === invitationId ? { ...inv, status: 'cancelled' } : inv
            ),
            isLoading: false,
          }));
        } catch (error) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },

      // User management
      updateUser: async (userId, updates) => {
        set({ isLoading: true });

        try {
          // In production, this would call the API
          // await userService.update(userId, updates);

          set((state) => ({
            users: state.users.map((user) =>
              user.id === userId ? { ...user, ...updates } : user
            ),
            isLoading: false,
          }));
        } catch (error) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },

      deactivateUser: async (userId) => {
        set({ isLoading: true });

        try {
          // In production, this would call the API
          // await userService.deactivate(userId);

          set((state) => ({
            users: state.users.map((user) =>
              user.id === userId ? { ...user, status: 'inactive' } : user
            ),
            isLoading: false,
          }));
        } catch (error) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },

      reactivateUser: async (userId) => {
        set({ isLoading: true });

        try {
          // In production, this would call the API
          // await userService.reactivate(userId);

          set((state) => ({
            users: state.users.map((user) =>
              user.id === userId ? { ...user, status: 'active' } : user
            ),
            isLoading: false,
          }));
        } catch (error) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },

      // Access scope helpers
      getUserAccessibleAgents: (user) => {
        // This would filter agents based on user's access scope
        // Implementation depends on agents store
        return [];
      },

      getUserAccessibleWorkflows: (user) => {
        // This would filter workflows based on user's access scope
        // Implementation depends on workflow store
        return [];
      },

      canUserAccessResource: (user, resourceType, resourceId) => {
        // Check if user has access to a specific resource
        // Based on their role, scope, and assignments
        return true; // Simplified for now
      },

      // Reset form
      resetInvitationForm: () => {
        set({
          invitationForm: {
            email: '',
            role: 'operator',
            branchId: null,
            departmentId: null,
            projectIds: [],
            teamIds: [],
            permissions: {
              canViewAllAgents: false,
              canCreateAgents: false,
              canDeployAgents: false,
              canApproveHITL: false,
              canInviteUsers: false,
              canModifyOrgStructure: false,
              canManageBilling: false,
              canConfigureIntegrations: false,
            },
            accessScope: 'department',
            message: '',
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

      setLoading: (isLoading) => {
        set({ isLoading });
      },
    }),
    {
      name: 'aasim-user-management-storage',
      partialize: (state) => ({
        users: state.users,
        invitations: state.invitations,
      }),
    }
  )
);
