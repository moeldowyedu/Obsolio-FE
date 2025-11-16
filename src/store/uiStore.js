import { create } from 'zustand';

export const useUIStore = create((set) => ({
  // Sidebar state
  isSidebarOpen: true,
  isSidebarCollapsed: false,

  // Modals
  activeModal: null,
  modalData: null,

  // Notifications
  notifications: [],

  // Loading states
  globalLoading: false,

  // Theme
  theme: 'light',

  // Sidebar actions
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  collapseSidebar: () => set({ isSidebarCollapsed: true }),
  expandSidebar: () => set({ isSidebarCollapsed: false }),

  // Modal actions
  openModal: (modalName, data = null) =>
    set({ activeModal: modalName, modalData: data }),
  closeModal: () => set({ activeModal: null, modalData: null }),

  // Notification actions
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        { id: Date.now(), ...notification },
      ],
    })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
  clearNotifications: () => set({ notifications: [] }),

  // Loading actions
  setGlobalLoading: (loading) => set({ globalLoading: loading }),

  // Theme actions
  setTheme: (theme) => set({ theme }),
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === 'light' ? 'dark' : 'light',
    })),
}));
