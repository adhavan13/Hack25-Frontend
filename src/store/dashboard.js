import { create } from "zustand";

const useDashboardStore = create((set, get) => ({
  // Location and language state
  location: "",
  language: "eng",

  // Dashboard data state
  dashboardData: null,
  loading: false,
  error: null,

  // Actions
  setLocation: (location) => set({ location }),
  setLanguage: (language) => set({ language }),

  // API function to fetch dashboard data
  fetchDashboardData: async () => {
    const { location, language } = get();

    set({ loading: true, error: null });

    try {
      // Remove CORS proxy, use direct API call
      const apiUrl = "https://hack25-backend-x7el.vercel.app/api/projects/getSummary";

      const response = await fetch(
        apiUrl,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            location,
            language,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      set({ dashboardData: data, loading: false });
      return data;
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      set({
        error: error.message,
        loading: false,
        dashboardData: null,
      });

      return null;
    }
  },

  // Clear error
  clearError: () => set({ error: null }),
}));

export default useDashboardStore;
  // Clear error




