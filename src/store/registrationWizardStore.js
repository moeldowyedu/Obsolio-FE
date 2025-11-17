import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useRegistrationWizardStore = create(
  persist(
    (set, get) => ({
      // Current step in the registration flow
      currentStep: 1,
      totalSteps: 2, // Will be 9 for organization type (2 + 7 org steps)

      // Tenant type selection
      tenantType: null, // 'personal' | 'organization'

      // Step 1: Account Creation Data
      accountData: {
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        phone: '',
        emailVerified: false,
      },

      // Organization Setup Data (only for organization type)
      organizationData: {
        // Step 1: Organization Profile
        profile: {
          organizationName: '',
          industry: '',
          companySize: '',
          country: '',
          timezone: '',
          logo: null,
          description: '',
        },

        // Step 2: Branches
        branches: [],

        // Step 3: Departments
        departments: [],
        departmentTemplate: null,

        // Step 4: Projects
        projects: [],

        // Step 5: Teams
        teams: [],

        // Step 6: Roles & Permissions
        roles: [],
        customRoles: [],

        // Step 7: Plan Selection
        selectedPlan: null,
        billingDetails: null,
      },

      // Personal Setup Data (only for personal type)
      personalData: {
        selectedPlan: null,
        billingDetails: null,
      },

      // Wizard state
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

      setTenantType: (type) => {
        const totalSteps = type === 'organization' ? 9 : 3; // 2 initial + 7 org steps or 2 initial + 1 plan selection
        set({
          tenantType: type,
          totalSteps,
        });
      },

      // Update account data
      updateAccountData: (data) => {
        set((state) => ({
          accountData: { ...state.accountData, ...data },
        }));
      },

      // Update organization profile
      updateOrganizationProfile: (data) => {
        set((state) => ({
          organizationData: {
            ...state.organizationData,
            profile: { ...state.organizationData.profile, ...data },
          },
        }));
      },

      // Branches management
      addBranch: (branch) => {
        set((state) => ({
          organizationData: {
            ...state.organizationData,
            branches: [...state.organizationData.branches, { ...branch, id: Date.now() }],
          },
        }));
      },

      updateBranch: (id, data) => {
        set((state) => ({
          organizationData: {
            ...state.organizationData,
            branches: state.organizationData.branches.map((b) =>
              b.id === id ? { ...b, ...data } : b
            ),
          },
        }));
      },

      removeBranch: (id) => {
        set((state) => ({
          organizationData: {
            ...state.organizationData,
            branches: state.organizationData.branches.filter((b) => b.id !== id),
          },
        }));
      },

      // Departments management
      setDepartmentTemplate: (template) => {
        set((state) => ({
          organizationData: {
            ...state.organizationData,
            departmentTemplate: template,
          },
        }));
      },

      addDepartment: (department) => {
        set((state) => ({
          organizationData: {
            ...state.organizationData,
            departments: [...state.organizationData.departments, { ...department, id: Date.now() }],
          },
        }));
      },

      updateDepartment: (id, data) => {
        set((state) => ({
          organizationData: {
            ...state.organizationData,
            departments: state.organizationData.departments.map((d) =>
              d.id === id ? { ...d, ...data } : d
            ),
          },
        }));
      },

      removeDepartment: (id) => {
        set((state) => ({
          organizationData: {
            ...state.organizationData,
            departments: state.organizationData.departments.filter((d) => d.id !== id),
          },
        }));
      },

      loadDepartmentTemplate: (templateName) => {
        const templates = {
          corporate: [
            { name: 'Human Resources', description: 'Employee management and benefits' },
            { name: 'Finance', description: 'Financial planning and accounting' },
            { name: 'Legal', description: 'Legal compliance and contracts' },
            { name: 'IT', description: 'Technology and infrastructure' },
            { name: 'Operations', description: 'Daily operations management' },
          ],
          healthcare: [
            { name: 'Administration', description: 'Healthcare administration' },
            { name: 'Nursing', description: 'Patient care services' },
            { name: 'Radiology', description: 'Diagnostic imaging' },
            { name: 'Pharmacy', description: 'Medication management' },
          ],
          legal: [
            { name: 'Litigation', description: 'Court cases and disputes' },
            { name: 'Corporate Law', description: 'Business transactions' },
            { name: 'Intellectual Property', description: 'IP protection' },
            { name: 'Compliance', description: 'Regulatory compliance' },
          ],
          manufacturing: [
            { name: 'Production', description: 'Manufacturing operations' },
            { name: 'Quality Control', description: 'Quality assurance' },
            { name: 'Supply Chain', description: 'Logistics and procurement' },
            { name: 'R&D', description: 'Research and development' },
          ],
        };

        const departments = templates[templateName] || [];
        set((state) => ({
          organizationData: {
            ...state.organizationData,
            departments: departments.map((d, idx) => ({ ...d, id: Date.now() + idx })),
            departmentTemplate: templateName,
          },
        }));
      },

      // Projects management
      addProject: (project) => {
        set((state) => ({
          organizationData: {
            ...state.organizationData,
            projects: [...state.organizationData.projects, { ...project, id: Date.now() }],
          },
        }));
      },

      updateProject: (id, data) => {
        set((state) => ({
          organizationData: {
            ...state.organizationData,
            projects: state.organizationData.projects.map((p) =>
              p.id === id ? { ...p, ...data } : p
            ),
          },
        }));
      },

      removeProject: (id) => {
        set((state) => ({
          organizationData: {
            ...state.organizationData,
            projects: state.organizationData.projects.filter((p) => p.id !== id),
          },
        }));
      },

      // Teams management
      addTeam: (team) => {
        set((state) => ({
          organizationData: {
            ...state.organizationData,
            teams: [...state.organizationData.teams, { ...team, id: Date.now() }],
          },
        }));
      },

      updateTeam: (id, data) => {
        set((state) => ({
          organizationData: {
            ...state.organizationData,
            teams: state.organizationData.teams.map((t) =>
              t.id === id ? { ...t, ...data } : t
            ),
          },
        }));
      },

      removeTeam: (id) => {
        set((state) => ({
          organizationData: {
            ...state.organizationData,
            teams: state.organizationData.teams.filter((t) => t.id !== id),
          },
        }));
      },

      // Roles management
      addCustomRole: (role) => {
        set((state) => ({
          organizationData: {
            ...state.organizationData,
            customRoles: [...state.organizationData.customRoles, { ...role, id: Date.now() }],
          },
        }));
      },

      updateCustomRole: (id, data) => {
        set((state) => ({
          organizationData: {
            ...state.organizationData,
            customRoles: state.organizationData.customRoles.map((r) =>
              r.id === id ? { ...r, ...data } : r
            ),
          },
        }));
      },

      removeCustomRole: (id) => {
        set((state) => ({
          organizationData: {
            ...state.organizationData,
            customRoles: state.organizationData.customRoles.filter((r) => r.id !== id),
          },
        }));
      },

      setRolePermissions: (roleName, permissions) => {
        set((state) => ({
          organizationData: {
            ...state.organizationData,
            roles: {
              ...state.organizationData.roles,
              [roleName]: permissions,
            },
          },
        }));
      },

      // Plan selection
      setSelectedPlan: (plan, billingDetails = null) => {
        const { tenantType } = get();
        if (tenantType === 'organization') {
          set((state) => ({
            organizationData: {
              ...state.organizationData,
              selectedPlan: plan,
              billingDetails,
            },
          }));
        } else {
          set({
            personalData: {
              selectedPlan: plan,
              billingDetails,
            },
          });
        }
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

      // Complete registration
      completeRegistration: () => {
        set({ isComplete: true });
      },

      // Reset wizard (for starting over or after completion)
      resetWizard: () => {
        set({
          currentStep: 1,
          totalSteps: 2,
          tenantType: null,
          accountData: {
            email: '',
            password: '',
            confirmPassword: '',
            firstName: '',
            lastName: '',
            phone: '',
            emailVerified: false,
          },
          organizationData: {
            profile: {
              organizationName: '',
              industry: '',
              companySize: '',
              country: '',
              timezone: '',
              logo: null,
              description: '',
            },
            branches: [],
            departments: [],
            departmentTemplate: null,
            projects: [],
            teams: [],
            roles: [],
            customRoles: [],
            selectedPlan: null,
            billingDetails: null,
          },
          personalData: {
            selectedPlan: null,
            billingDetails: null,
          },
          isLoading: false,
          error: null,
          isComplete: false,
        });
      },
    }),
    {
      name: 'aasim-registration-wizard-storage',
      partialize: (state) => ({
        currentStep: state.currentStep,
        totalSteps: state.totalSteps,
        tenantType: state.tenantType,
        accountData: state.accountData,
        organizationData: state.organizationData,
        personalData: state.personalData,
      }),
    }
  )
);
