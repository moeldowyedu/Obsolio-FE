import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useLayoutStore = create(
    persist(
        (set) => ({
            isCollapsed: false,
            expandedSections: {
                organization: false,
                agentx: false,
                jobFlows: false,
                orchestration: false,
                scheduling: false,
                hitl: false,
                engines: false,
                integrations: false,
                teamUsers: false,
                billing: false,
                settings: false
            },
            toggleSidebar: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
            setCollapsed: (value) => set({ isCollapsed: value }),
            toggleSection: (section) => set((state) => {
                const isExpanding = !state.expandedSections[section];
                // Reset all sections to false
                const newExpandedSections = Object.keys(state.expandedSections).reduce((acc, key) => {
                    acc[key] = false;
                    return acc;
                }, {});

                // If expanding, set only the target section to true
                if (isExpanding) {
                    newExpandedSections[section] = true;
                }

                return { expandedSections: newExpandedSections };
            }),
            setSectionExpanded: (section, value) => set((state) => {
                if (value) {
                    // When expanding a section, collapse all others
                    const newExpandedSections = Object.keys(state.expandedSections).reduce((acc, key) => {
                        acc[key] = false;
                        return acc;
                    }, {});
                    newExpandedSections[section] = true;
                    return { expandedSections: newExpandedSections };
                }

                // When collapsing, just update the specific section
                return {
                    expandedSections: {
                        ...state.expandedSections,
                        [section]: false
                    }
                };
            }),
        }),
        {
            name: 'layout-storage', // unique name for localStorage key
        }
    )
);
